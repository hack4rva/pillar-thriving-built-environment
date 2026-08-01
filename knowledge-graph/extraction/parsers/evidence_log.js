import { readRepoFile, makeNode, REPO_ID } from '../lib.js';

const LOG_PATH = 'evidence_log.md';

const SECTION_STATUS = [
  [/^##\s+Confirmed/i, 'confirmed'],
  [/^##\s+Likely/i, 'likely'],
  [/^##\s+Unverified/i, 'unverified'],
  [/^##\s+Missing/i, 'missing'],
  [/^##\s+Useful Datasets/i, 'dataset'],
  [/^##\s+Risks/i, 'risk'],
];

const STATUS_TO_EVIDENCE = {
  confirmed: 'externally_verified',
  likely: 'reported_but_unverified',
  unverified: 'reported_but_unverified',
};

function splitRow(line) {
  return line.split('|').slice(1, -1).map((c) => c.trim());
}

/**
 * Parse evidence_log.md tables into evidence records plus graph nodes:
 * E-xxx entries -> Evidence nodes, Missing entries -> ResearchQuestion nodes,
 * R-xxx entries -> Risk nodes. D-xxx dataset rows become evidence records only
 * (datasets themselves come from 02_data/source_inventory.csv).
 */
export function parseEvidenceLog() {
  const lines = readRepoFile(LOG_PATH).split('\n');
  const evidenceRecords = [];
  const nodes = [];
  const questions = [];

  let status = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const section = SECTION_STATUS.find(([re]) => re.test(line));
    if (section) { status = section[1]; continue; }
    if (!status) continue;
    if (!/^\|\s*[A-Z]-\d+/.test(line)) continue;

    const cells = splitRow(line);
    const id = cells[0];
    const lineNo = i + 1;
    const prov = [{ sourceDoc: LOG_PATH, sourceLocation: `lines ${lineNo}-${lineNo}`, excerpt: cells[1] }];

    if (status === 'confirmed' || status === 'likely' || status === 'unverified') {
      const [, claim, source, urlOrVerify] = cells;
      const url = status === 'confirmed' && /^https?:/.test(urlOrVerify || '') ? urlOrVerify : null;
      evidenceRecords.push({
        id: `ev:${id}`, claim, status,
        source: source || null, url, repo: REPO_ID, provenance: prov,
      });
      nodes.push(makeNode({
        id: `n:evidence:${id.toLowerCase()}`,
        type: 'Evidence',
        label: `${id}: ${claim.length > 70 ? claim.slice(0, 67) + '…' : claim}`,
        description: claim,
        evidenceStatus: STATUS_TO_EVIDENCE[status],
        provenance: prov,
        attrs: { evidenceLogId: id, logStatus: status, url, source: source || null },
      }));
    } else if (status === 'missing') {
      const [, missing, impact, howToGet] = cells;
      evidenceRecords.push({
        id: `ev:${id}`, claim: `MISSING: ${missing}`, status: 'missing',
        source: null, url: null, repo: REPO_ID, provenance: prov,
        notes: `Impact: ${impact}. How to get it: ${howToGet}`,
      });
      const qid = `q:${id.toLowerCase()}`;
      questions.push({
        id: qid,
        question: missing,
        category: 'missing-data',
        repo: REPO_ID,
        relatedNodeIds: [`n:question:${id.toLowerCase()}`],
        provenance: prov,
      });
      nodes.push(makeNode({
        id: `n:question:${id.toLowerCase()}`,
        type: 'ResearchQuestion',
        label: `${id}: ${missing.length > 70 ? missing.slice(0, 67) + '…' : missing}`,
        description: `${missing} — Impact: ${impact}. How to get it: ${howToGet}`,
        evidenceStatus: 'documented',
        provenance: prov,
        attrs: { evidenceLogId: id, impact, howToGet },
      }));
    } else if (status === 'risk') {
      const [, risk, severity, mitigation] = cells;
      evidenceRecords.push({
        id: `ev:${id}`, claim: `RISK: ${risk}`, status: 'risk',
        source: null, url: null, repo: REPO_ID, provenance: prov,
        notes: `Severity: ${severity}. Mitigation: ${mitigation}`,
      });
      nodes.push(makeNode({
        id: `n:risk:${id.toLowerCase()}`,
        type: 'Risk',
        label: `${id}: ${risk.length > 70 ? risk.slice(0, 67) + '…' : risk}`,
        description: `${risk} — Severity: ${severity}. Mitigation: ${mitigation}`,
        evidenceStatus: 'documented',
        provenance: prov,
        attrs: { evidenceLogId: id, severity, mitigation },
      }));
    } else if (status === 'dataset') {
      const [, dataset, source, url, notes] = cells;
      evidenceRecords.push({
        id: `ev:${id}`, claim: `DATASET: ${dataset}`, status: 'dataset',
        source: source || null, url: /^https?:/.test(url || '') ? url : null,
        repo: REPO_ID, provenance: prov, notes: notes || '',
      });
    }
  }

  return { evidenceRecords, nodes, questions, filesExamined: [LOG_PATH] };
}
