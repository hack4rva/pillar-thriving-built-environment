#!/usr/bin/env bash
# Write docs/PARTICIPANT_HANDOUT.md in each pillar repo (Markdown only; no Word).
set -euo pipefail
REPOS="/Users/williamprior/Development/GitHub/hackathon/pillar-repos"

notice() {
  cat << 'NOTICE'
# Participant handout

This file is a copy of [`CHALLENGE.md`](../CHALLENGE.md) plus this cover note so you can share one Markdown document. Official judge categories are described in `RUBRIC.md` at the hackathon repository root (the directory that contains `pillar-repos`). The body below mirrors `CHALLENGE.md` in this repository.

---

NOTICE
}

build_one() {
  local repo="$1"
  local root="${REPOS}/${repo}"
  local md="${root}/CHALLENGE.md"
  local out="${root}/docs/PARTICIPANT_HANDOUT.md"
  if [[ ! -f "$md" ]]; then
    echo "Missing $md" >&2
    return 1
  fi
  mkdir -p "${root}/docs"
  { notice; cat "$md"; } > "$out"
  echo "Wrote $out"
}

build_one "pillar-thriving-city-hall"
build_one "pillar-thriving-neighborhoods"
build_one "pillar-thriving-families"
build_one "pillar-thriving-economy"
build_one "pillar-thriving-inclusive-communities"
build_one "pillar-thriving-built-environment"
build_one "pillar-city-storytelling"
echo "Done."
