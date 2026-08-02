#!/usr/bin/env bash
#
# Copy this knowledge-graph app into another pillar repo.
#
#   ./scripts/port-to-pillar.sh <target-repo-dir> <shortName> <pillarName>
#
# The app code is identical in every pillar; only pillar.config.json and the
# generated data/ differ. Curated records are pillar-specific research work, so
# the target starts with empty ones and builds its graph from the deterministic
# parsers (evidence log + source inventory) alone.
set -euo pipefail

TARGET_REPO="${1:?usage: port-to-pillar.sh <target-repo-dir> <shortName> <pillarName>}"
SHORT_NAME="${2:?missing shortName}"
PILLAR_NAME="${3:?missing pillarName}"

SRC="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$TARGET_REPO/knowledge-graph"
REPO_ID="$(basename "$TARGET_REPO")"

[ -d "$TARGET_REPO" ] || { echo "no such repo: $TARGET_REPO" >&2; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST"

# Source only. Generated data, dependencies, and screenshots stay behind.
rsync -a \
  --exclude 'node_modules/' \
  --exclude 'dist/' \
  --exclude 'data/' \
  --exclude 'public/data/' \
  --exclude 'docs/screenshots/' \
  --exclude '.tmp*' \
  "$SRC/" "$DEST/"

# data/ is generated output, except the JSON Schema, which is source.
mkdir -p "$DEST/data"
cp -R "$SRC/data/schema" "$DEST/data/schema"

# Curated records are hand-authored per pillar; never inherit another's.
cat > "$DEST/extraction/records/entities.json" <<'EOF'
[]
EOF
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/relationships.json"
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/flows.json"
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/questions.json"
cp "$DEST/extraction/records/entities.json" "$DEST/extraction/records/review.json"
cat > "$DEST/extraction/records/external.json" <<'EOF'
{ "evidence": [], "entities": [], "relationships": [], "flows": [], "nodeUpdates": [], "answers": [] }
EOF
cat > "$DEST/extraction/aliases.json" <<'EOF'
{ "_comment": "Alias resolution: maps abbreviations and informal names to canonical node IDs. Populate as this pillar's graph is curated." }
EOF

# No projectsCsv: only the Built Environment corpus ships a capital-projects
# export, so other pillars have no cost, phase, or funding-flow data.
cat > "$DEST/pillar.config.json" <<EOF
{
  "repoId": "$REPO_ID",
  "pillarName": "$PILLAR_NAME",
  "shortName": "$SHORT_NAME",
  "description": "Evidence and source graph for the $PILLAR_NAME pillar, built from the repository's evidence log and source inventory. This corpus contains no financial dataset, so there is no funding layer.",
  "sources": {
    "evidenceLog": "admin/evidence_log.md",
    "sourceInventory": "data/source_inventory.csv",
    "projectsCsv": null
  },
  "derive": true
}
EOF

node -e "
const fs = require('fs');
const p = '$DEST/package.json';
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
pkg.name = '$REPO_ID'.replace(/^pillar-/, '') + '-knowledge-graph';
fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
"

echo "ported -> $DEST  (repoId=$REPO_ID)"
