#!/usr/bin/env bash
# Regenerate ~/Desktop/Pillar*_JudgeRubric.docx from each pillar CHALLENGE.md (pandoc).
# Run from any directory; paths are absolute.

set -euo pipefail
REPOS="/Users/williamprior/Development/GitHub/hackathon/pillar-repos"
DESKTOP="/Users/williamprior/Desktop"
TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

prepend_notice() {
  cat << 'NOTICE'
**Participant handout — not a judge script.** Official scoring uses the six categories and 1–5 scale in **RUBRIC.md** at the hackathon repository root (same folder level as `pillar-repos/`). Judges apply that document; they may interpret categories during scoring. Everything after this page mirrors **`CHALLENGE.md`** in your pillar repository, including optional *Participant guide: connecting to the rubric* sections **per problem statement** and the official Pillar Award weight table. Those guides are **examples to help teams prepare**; they do not replace or override **RUBRIC.md**.

---

NOTICE
}

build_one() {
  local out_name="$1"
  local repo_dir="$2"
  local md="${REPOS}/${repo_dir}/CHALLENGE.md"
  local out="${DESKTOP}/${out_name}"
  if [[ ! -f "$md" ]]; then
    echo "Missing: $md" >&2
    return 1
  fi
  {
    prepend_notice
    cat "$md"
  } > "${TMPDIR}/handout.md"

  pandoc "${TMPDIR}/handout.md" -f markdown -t docx -o "$out"
  echo "Wrote $out"
}

build_one "Pillar1_CityHall_JudgeRubric.docx" "pillar-thriving-city-hall"
build_one "Pillar2_Neighborhoods_JudgeRubric.docx" "pillar-thriving-neighborhoods"
build_one "Pillar3_Families_JudgeRubric.docx" "pillar-thriving-families"
build_one "Pillar4_Economy_JudgeRubric.docx" "pillar-thriving-economy"
build_one "Pillar5_Communities_JudgeRubric.docx" "pillar-thriving-inclusive-communities"
build_one "Pillar6_BuiltEnvironment_JudgeRubric.docx" "pillar-thriving-built-environment"
build_one "Pillar7_Stories_JudgeRubric.docx" "pillar-city-storytelling"

echo "Done."
