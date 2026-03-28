#!/usr/bin/env python3
"""
Normalize pillar CHALLENGE.md: remove internal score lines, strip blue-sky score suffixes,
rename 'Why this scored well', remove Pillar Award weight/scoring section, replace em dashes.
"""
from __future__ import annotations

import re
from pathlib import Path

REPOS = Path("/Users/williamprior/Development/GitHub/hackathon/pillar-repos")

PILLARS = [
    "pillar-thriving-city-hall",
    "pillar-thriving-neighborhoods",
    "pillar-thriving-families",
    "pillar-thriving-economy",
    "pillar-thriving-inclusive-communities",
    "pillar-thriving-built-environment",
    "pillar-city-storytelling",
]

JUDGES_FOOTER = """---

## Judges and the rubric

Hackathon judges evaluate prototypes using the shared categories described in [`RUBRIC.md`](../../RUBRIC.md) at the hackathon repository root. That document lists the category names and what judges are asked to consider.

The **Participant guide** sections under each problem above are optional ways to prepare your pitch. They are not official instructions to judges.
"""

# Blue sky: ### Title — 24/27 — Exceptional ★ -> ### Title
BLUE_SKY_HEADING = re.compile(
    r"^(### [^\n]+?) — \d+/\d+[^\n]*$", re.MULTILINE
)

# Remove standalone score lines
SCORE_LINE = re.compile(r"^\*\*Score:.*\*\*\s*\n", re.MULTILINE)

# Pillar Award section through end of file
PILLAR_AWARD_BLOCK = re.compile(
    r"\n## Pillar Award: official scoring mechanics\n.*\Z",
    re.DOTALL,
)


def fix_critical_data_gaps(text: str) -> str:
    # Families P1
    text = text.replace(
        "**⚠ Critical data gap: D3=1 — lowest data readiness score across all 12 targeted statements in this hackathon. No datasets are currently linked. Teams must curate content manually or scope to guidance without live data.**",
        "**⚠ Critical data gap:** No datasets are currently linked in this repository. Teams must curate content manually or scope to guidance without live data.",
    )
    # Inclusive P2
    text = text.replace(
        "**⚠ Critical data gap: D3=1 — no cross-agency dataset exists. Teams must work with public information only and accept that the demo will be conceptual for cross-agency elements.**",
        "**⚠ Critical data gap:** No cross-agency dataset exists. Teams must work with public information only and accept that the demo will be conceptual for cross-agency elements.",
    )
    return text


def replace_em_dashes(text: str) -> str:
    return text.replace("\u2014", " - ").replace("\u2013", "-")


def scrub_scoring_language(text: str) -> str:
    text = text.replace(
        "they may interpret categories differently during scoring",
        "they may interpret categories in context",
    )
    text = text.replace("judges score from [`RUBRIC.md`]", "judges refer to [`RUBRIC.md`]")
    text = text.replace("A judge can follow a flow", "Someone can follow a flow")
    text = text.replace(
        "not a substitute for [`RUBRIC.md`](../../RUBRIC.md), which judges use for category definitions and scoring.",
        "not a substitute for [`RUBRIC.md`](../../RUBRIC.md), which judges use for category definitions.",
    )
    text = text.replace(
        "Read **`RUBRIC.md`** for full category definitions, scoring anchors, and judge-facing guidance.",
        "",
    )
    text = text.replace("**Why this scored well:**", "**Why this fits a weekend build:**")
    text = text.replace(
        "**Why this scored highest across all seven pillars:**",
        "**Why this fits a weekend build:**",
    )
    return text


def fix_collapsed_dash_artifacts(text: str) -> str:
    """After replacing em dashes with ' - ', collapse '  -  ' into clearer punctuation."""
    text = re.sub(r"  -  but ", ", but ", text)
    text = re.sub(r"  -  never ", "; never ", text)
    text = re.sub(r"  -  ", ": ", text)
    return text


def fix_main_title(text: str) -> str:
    return re.sub(
        r"^# (.+?)  -  Hackathon Challenge$",
        r"# \1: Hackathon Challenge",
        text,
        flags=re.MULTILINE,
    )


def fix_statement_commas(path: Path, text: str) -> str:
    """Repair a few HMW sentences where colons should be commas (pillar-specific)."""
    name = path.parent.name
    if name == "pillar-thriving-families":
        text = text.replace(
            "opportunities: including summer jobs, internships, and job-shadowing experiences: so",
            "opportunities, including summer jobs, internships, and job-shadowing experiences, so",
        )
        text = text.replace(
            "prepared teen candidates: so that",
            "prepared teen candidates, so that",
        )
    if name == "pillar-thriving-economy":
        text = text.replace(
            "Small or first-time contractors: including minority-owned businesses: struggle",
            "Small or first-time contractors, including minority-owned businesses, struggle",
        )
    if name == "pillar-thriving-city-hall":
        text = text.replace(
            "City services: whether finding information or submitting a request: so",
            "City services, whether finding information or submitting a request, so",
        )
    if name == "pillar-thriving-neighborhoods":
        text = text.replace(
            "grant agreements - so that",
            "grant agreements, so that",
        )
        text = text.replace(
            "grant agreements: so that",
            "grant agreements, so that",
        )
        text = text.replace(
            "neighborhoods are changing: so that",
            "neighborhoods are changing, so that",
        )
    return text


def process(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    text = text.replace(
        "## The Blue Sky Vision (Highest-Rated Across All 7 Pillars)",
        "## The Blue Sky Vision",
    )
    text = SCORE_LINE.sub("", text)
    text = BLUE_SKY_HEADING.sub(r"\1", text)
    text = fix_critical_data_gaps(text)
    if m := PILLAR_AWARD_BLOCK.search(text):
        text = text[: m.start()] + "\n" + JUDGES_FOOTER.strip() + "\n"
    text = scrub_scoring_language(text)
    text = replace_em_dashes(text)
    text = fix_collapsed_dash_artifacts(text)
    text = fix_main_title(text)
    text = fix_statement_commas(path, text)
    text = re.sub(r"\n---\n\n---\n", "\n---\n", text)
    path.write_text(text, encoding="utf-8", newline="\n")


def main() -> None:
    for name in PILLARS:
        p = REPOS / name / "CHALLENGE.md"
        if not p.is_file():
            raise SystemExit(f"Missing {p}")
        process(p)
        print(f"Updated {p}")


if __name__ == "__main__":
    main()
