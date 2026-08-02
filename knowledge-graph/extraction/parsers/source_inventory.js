import { parse } from 'csv-parse/sync';
import { readRepoFile, makeNode, makeEdge, nodeId, slug } from '../lib.js';

const CSV_PATH = 'data/source_inventory.csv';

/** Map inventory owner strings to canonical publisher node IDs (aliases.json holds the rest). */
const OWNER_TO_NODE = {
  'City of Richmond GIS': 'n:agency:richmond-dpw',
  'City of Richmond': 'n:agency:city-of-richmond',
  'City of Richmond DPW': 'n:agency:richmond-dpw',
  'Virginia DOT': 'n:agency:vdot',
  'GRTC Transit': 'n:org:grtc',
  'Federal agencies': 'n:agency:us-federal-government',
};

const PROBLEM_TO_NODE = {
  'Transportation Project Visibility': 'n:problem:transportation-project-visibility',
  'Fleet Operations': 'n:problem:fleet-operations-visibility',
};

function statusToEvidence(status) {
  const s = (status || '').toLowerCase();
  if (s.startsWith('verified')) return 'documented';
  if (s.includes('not ready') || s.includes('not available')) return 'documented';
  if (s.includes('unknown')) return 'unknown';
  return 'reported_but_unverified';
}

/** Parse data/source_inventory.csv into Dataset nodes + PUBLISHES/ASSOCIATED_WITH edges. */
export function parseSourceInventory() {
  const rows = parse(readRepoFile(CSV_PATH), { columns: true, skip_empty_lines: true, bom: true });
  const nodes = [];
  const edges = [];

  for (const row of rows) {
    const id = nodeId('dataset', row.name);
    const rowLoc = `row id=${row.id}`;
    const prov = [{ sourceDoc: CSV_PATH, sourceLocation: rowLoc, excerpt: row.name }];
    const url = /^https?:/.test(row.url || '') ? row.url : null;

    nodes.push(makeNode({
      id,
      type: 'Dataset',
      label: row.name,
      description: row.notes || '',
      evidenceStatus: statusToEvidence(row.status),
      provenance: prov,
      attrs: {
        inventoryId: row.id,
        owner: row.owner,
        url,
        urlRaw: row.url,
        accessMode: row.access_mode,
        verificationStatus: row.status,
        keyFields: row.key_fields,
        available: !/not (publicly )?available|unknown/i.test(row.url || ''),
      },
    }));

    const ownerNode = OWNER_TO_NODE[row.owner];
    if (ownerNode) {
      edges.push(makeEdge({
        source: ownerNode,
        target: id,
        type: 'PUBLISHES',
        description: `${row.owner} owns/publishes "${row.name}" (${row.access_mode})`,
        evidenceStatus: statusToEvidence(row.status),
        confidence: /^verified/i.test(row.status || '') ? 'high' : 'medium',
        provenance: prov,
      }));
    }

    const problemNode = PROBLEM_TO_NODE[(row.relevant_to || '').trim()];
    if (problemNode) {
      edges.push(makeEdge({
        source: id,
        target: problemNode,
        type: 'ASSOCIATED_WITH',
        description: `Inventoried as relevant to: ${row.relevant_to}`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: prov,
      }));
    }
  }

  return { nodes, edges, filesExamined: [CSV_PATH], rowCount: rows.length };
}

export const sourceInventoryDatasetId = (name) => `n:dataset:${slug(name)}`;
