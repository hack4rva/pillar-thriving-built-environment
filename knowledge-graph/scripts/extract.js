#!/usr/bin/env node
/**
 * Extraction pipeline: rebuilds data/ from the research repository.
 *
 * Steps: run deterministic parsers (CIP CSV, evidence log, source inventory),
 * load curated extraction records, verify every excerpt against the actual
 * source files, resolve aliases, drop broken references into the review queue,
 * compute data-quality metrics, and write the normalized dataset.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCipCsv } from '../extraction/parsers/cip_csv.js';
import { parseEvidenceLog } from '../extraction/parsers/evidence_log.js';
import { parseSourceInventory } from '../extraction/parsers/source_inventory.js';
import { makeNode, makeEdge, verifyProvenance, REPO_ID, slug } from '../extraction/lib.js';
import { computeMetrics } from '../extraction/metrics.js';

const ROOT = resolve(import.meta.dirname, '..');
const DATA_DIR = resolve(ROOT, 'data');
const PUBLIC_DATA_DIR = resolve(ROOT, 'public', 'data');

const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

const RUN_TS = new Date().toISOString();

function main() {
  const warnings = [];
  const reviewQueue = readJson('extraction/records/review.json');

  // 1. Deterministic parsers ------------------------------------------------
  const cip = parseCipCsv();
  const ev = parseEvidenceLog();
  const inv = parseSourceInventory();

  // 2. Curated records ------------------------------------------------------
  const entityRecords = readJson('extraction/records/entities.json');
  const relationshipRecords = readJson('extraction/records/relationships.json');
  const curatedFlows = readJson('extraction/records/flows.json');
  const curatedQuestions = readJson('extraction/records/questions.json');

  const verification = { exact: 0, moved: 0, unchecked: 0, missing: 0 };
  const verifyAll = (record, kind, label) => {
    let ok = true;
    for (const prov of record.provenance ?? []) {
      const result = verifyProvenance(prov);
      verification[result.level] = (verification[result.level] ?? 0) + 1;
      if (result.level === 'moved') warnings.push(`[moved] ${kind} ${label}: ${result.message}`);
      if (!result.ok) {
        ok = false;
        reviewQueue.push({
          id: `r:provenance-${slug(label)}`,
          itemType: kind,
          proposed: label,
          sourceExcerpt: prov.excerpt ?? '',
          sourceLocation: `${prov.sourceDoc} ${prov.sourceLocation}`,
          rationale: `Provenance verification failed: ${result.message}. Record excluded from the graph until re-verified.`,
          confidence: 'low',
          alternatives: ['Fix the excerpt/location in extraction/records', 'Drop the record'],
          decisionRequested: 'Re-verify this record against the source document.',
        });
      }
    }
    return ok;
  };

  const curatedNodes = [];
  for (const rec of entityRecords) {
    if (verifyAll(rec, 'node', rec.id)) curatedNodes.push(makeNode(rec));
  }

  const curatedEdges = [];
  for (const rec of relationshipRecords) {
    if (verifyAll(rec, 'edge', `${rec.source} ${rec.type} ${rec.target}`)) {
      curatedEdges.push(makeEdge(rec));
    }
  }

  // Research questions -> nodes (+ optional links to related nodes).
  const questions = [...ev.questions];
  for (const q of curatedQuestions) {
    if (!verifyAll(q, 'node', q.id)) continue;
    const qNodeId = `n:question:${q.id.slice(2)}`;
    curatedNodes.push(makeNode({
      id: qNodeId,
      type: 'ResearchQuestion',
      label: q.question.length > 90 ? q.question.slice(0, 87) + '…' : q.question,
      description: q.question,
      evidenceStatus: 'documented',
      provenance: q.provenance,
      attrs: { category: q.category },
    }));
    for (const rel of q.relatedNodeIds ?? []) {
      curatedEdges.push(makeEdge({
        source: qNodeId,
        target: rel,
        type: 'ASSOCIATED_WITH',
        description: `Open question related to this entity: ${q.question}`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: q.provenance,
      }));
    }
    questions.push({
      id: q.id, question: q.question, category: q.category,
      repo: REPO_ID, relatedNodeIds: [qNodeId, ...(q.relatedNodeIds ?? [])],
      provenance: q.provenance,
    });
  }

  // 3. Merge ---------------------------------------------------------------
  let nodes = [...cip.nodes, ...ev.nodes, ...inv.nodes, ...curatedNodes];
  let edges = [...cip.edges, ...inv.edges, ...curatedEdges];
  const flows = [...cip.flows, ...curatedFlows];

  // Duplicate node IDs: merge provenance, keep first definition.
  const byId = new Map();
  for (const n of nodes) {
    if (byId.has(n.id)) {
      const kept = byId.get(n.id);
      kept.provenance = [...kept.provenance, ...n.provenance];
      warnings.push(`[merge] duplicate node id ${n.id}: provenance merged`);
    } else {
      byId.set(n.id, n);
    }
  }
  nodes = [...byId.values()];

  // Duplicate-candidate detection: same normalized label, different IDs.
  const labelIndex = new Map();
  for (const n of nodes) {
    const key = n.label.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (labelIndex.has(key) && labelIndex.get(key) !== n.id) {
      reviewQueue.push({
        id: `r:dup-${slug(key)}`,
        itemType: 'node',
        proposed: `${labelIndex.get(key)} vs ${n.id}`,
        sourceExcerpt: n.label,
        sourceLocation: 'label comparison across extraction sources',
        rationale: 'Two nodes share the same normalized label; they may be the same entity and need alias resolution.',
        confidence: 'medium',
        alternatives: ['Merge via extraction/aliases.json', 'Keep separate'],
        decisionRequested: 'Decide whether these are the same entity.',
      });
    } else {
      labelIndex.set(key, n.id);
    }
  }

  // Broken references: edges whose endpoints do not exist.
  const brokenEdges = [];
  edges = edges.filter((e) => {
    const ok = byId.has(e.source) && byId.has(e.target);
    if (!ok) {
      brokenEdges.push(e);
      reviewQueue.push({
        id: `r:broken-${e.id.slice(2)}`,
        itemType: 'edge',
        proposed: `${e.source} ${e.type} ${e.target}`,
        sourceExcerpt: e.description,
        sourceLocation: e.provenance?.[0] ? `${e.provenance[0].sourceDoc} ${e.provenance[0].sourceLocation}` : 'unknown',
        rationale: 'Edge references a node that does not exist in this extraction run.',
        confidence: 'low',
        alternatives: ['Fix the node id in extraction records', 'Add the missing entity'],
        decisionRequested: 'Repair the reference.',
      });
    }
    return ok;
  });

  // Flow stage references must also resolve.
  for (const f of flows) {
    for (const s of f.stages) {
      for (const end of [s.from, s.to]) {
        if (!byId.has(end)) {
          warnings.push(`[broken-flow] ${f.id} references missing node ${end}`);
        }
      }
    }
  }

  // Stamp extraction time (IDs stay deterministic; only timestamps vary).
  for (const n of nodes) n.extractedAt = RUN_TS;
  for (const e of edges) e.extractedAt = RUN_TS;
  for (const f of flows) f.extractedAt = RUN_TS;

  // Deterministic ordering.
  nodes.sort((a, b) => a.id.localeCompare(b.id));
  edges.sort((a, b) => a.id.localeCompare(b.id));
  flows.sort((a, b) => a.id.localeCompare(b.id));

  // 4. Metrics ---------------------------------------------------------------
  const metrics = computeMetrics(nodes, edges, flows, ev.evidenceRecords, reviewQueue, brokenEdges, verification);

  // 5. Outputs ---------------------------------------------------------------
  const meta = {
    schemaVersion: '1.0.0',
    generatedAt: RUN_TS,
    repos: [REPO_ID],
    counts: { nodes: nodes.length, edges: edges.length, financialFlows: flows.length },
  };
  const graph = { meta, nodes, edges, financialFlows: flows };

  mkdirSync(DATA_DIR, { recursive: true });
  const write = (name, value) =>
    writeFileSync(resolve(DATA_DIR, name), JSON.stringify(value, null, 1) + '\n');

  write('graph.json', graph);
  write('nodes.json', nodes);
  write('edges.json', edges);
  write('financial_flows.json', flows);
  write('evidence.json', ev.evidenceRecords);
  write('unanswered_questions.json', questions);
  write('review_queue.json', reviewQueue);
  write('extraction_report.json', {
    generatedAt: RUN_TS,
    repo: REPO_ID,
    filesExamined: collectFilesExamined(cip, ev, inv, entityRecords, relationshipRecords, curatedFlows, curatedQuestions),
    provenanceVerification: verification,
    warnings,
    metrics,
  });

  // Copies served by Vite (public/ is copied verbatim into the build).
  mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  for (const name of ['graph.json', 'evidence.json', 'unanswered_questions.json', 'review_queue.json', 'extraction_report.json']) {
    cpSync(resolve(DATA_DIR, name), resolve(PUBLIC_DATA_DIR, name));
  }

  console.log(`nodes=${nodes.length} edges=${edges.length} flows=${flows.length} questions=${questions.length} review=${reviewQueue.length}`);
  console.log(`verification: ${JSON.stringify(verification)}`);
  if (warnings.length) {
    console.log(`warnings (${warnings.length}):`);
    for (const w of warnings) console.log('  ' + w);
  }
}

function collectFilesExamined(cip, ev, inv, ...recordSets) {
  const files = new Set([...cip.filesExamined, ...ev.filesExamined, ...inv.filesExamined]);
  for (const records of recordSets) {
    for (const rec of records) {
      for (const p of rec.provenance ?? []) {
        if (!/^https?:/.test(p.sourceDoc)) files.add(p.sourceDoc);
      }
    }
  }
  return [...files].sort();
}


main();
