#!/usr/bin/env python3
"""
Edit only the README header + ## The Challenge slice: no internal scores, no weight table,
no em dashes in that slice. Then strip (Score X/Y) tails file-wide.
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

CH = "## The Challenge"
SECTION_END_MARKERS = ("## Table of Contents", "## Journey", "## Quick Start")

RUBRIC_REPLACEMENT = """### Rubric reference

Hackathon judges use the category framework in [`../RUBRIC.md`](../RUBRIC.md). Optional prompts in [`CHALLENGE.md`](CHALLENGE.md) help teams prepare their story; they are not instructions to judges.

A single-file Markdown handout (same content as `CHALLENGE.md` plus a short cover note) is at [`docs/PARTICIPANT_HANDOUT.md`](docs/PARTICIPANT_HANDOUT.md).

"""

OPENING_RE = re.compile(
    r"\*\*→ Full detail in \[`CHALLENGE\.md`\]\(CHALLENGE\.md\)\.\*\* Read it before anything else — it defines the two problems, the top blue sky vision, data constraints, how Pillar Award weights use the shared rubric, and optional per-problem prompts to help your team think about the categories \(not a second judge rubric\)\.",
)

OPENING_NEW = (
    "**→ Full detail in [`CHALLENGE.md`](CHALLENGE.md).** Read it before anything else. "
    "It covers the two problems, the top blue sky vision, data constraints, and optional per-problem prompts "
    "that relate to [`RUBRIC.md`](../RUBRIC.md) for teams preparing their pitch (those prompts are not judge instructions)."
)


def fix_challenge_slice(slice_: str) -> str:
    s = OPENING_RE.sub(OPENING_NEW, slice_)
    s = re.sub(r"(### Problem \d+:[^\n]+) — \d+/\d+[^\n]*", r"\1", s)
    s = re.sub(r"(### Top Blue Sky:[^\n]+) — \d+/\d+[^\n]*", r"\1", s)
    s = re.sub(
        r"### Pillar Award Rubric\n\n(?:.*\n)*?Official rubric[^\n]+\n\n",
        RUBRIC_REPLACEMENT,
        s,
        flags=re.DOTALL,
    )
    s = s.replace(
        "🚨 **D3=1 — lowest data readiness score across all 12 targeted statements.**",
        "**Critical data gap:**",
    )
    s = s.replace(
        "🚨 **D3=1 — no cross-agency dataset exists.**",
        "**Critical data gap:** No cross-agency dataset exists.",
    )
    s = s.replace("\u2014", " - ")
    s = s.replace("\u2013", "-")
    s = s.replace("guidance ,  not formal", "guidance, not formal")
    return s


def fix_preamble(pre: str) -> str:
    pre = pre.replace(" — Decision Funnel", ": Decision Funnel")
    pre = pre.replace("\u2014", " - ")
    pre = pre.replace("\u2013", "-")
    pre = pre.replace("MVP ,  and avoid", "MVP and avoid")
    return pre


def strip_score_parentheticals(text: str) -> str:
    return re.sub(r" \(Score \d+/\d+[^)]*\)", "", text)


def scrub_scoring_notes(text: str) -> str:
    text = re.sub(
        r"\nNote: Both statements score \d+/\d+ per rubric document\.[^\n]*\n",
        "\n",
        text,
    )
    text = re.sub(
        r"\n- \"Exploring Richmond Through Its Stories\" scored \d+/\d+[^\n]*\n",
        "\n",
        text,
    )
    text = re.sub(
        r"\n- Recommended: Making Neighborhood Change Easier to Understand \([^)]+\)\n",
        "\n- Recommended: Making Neighborhood Change Easier to Understand\n",
        text,
    )
    text = re.sub(
        r"Quick[‑-]kill flags:.*D3=1.*\n",
        "Quick-kill flags: Check data readiness in `CHALLENGE.md` before locking a problem.\n",
        text,
    )
    return text


def remove_rubric_summary_tables(text: str) -> str:
    """Remove compact score tables inside Phase 2 details (neighborhoods-style)."""
    return re.sub(
        r"\*\*Rubric summary:\*\*\n\| Statement \| Score \| Band \| Quick-kill flags \|\n(?:\|[^\n]+\n)+",
        "**Comparison (no numeric ranks):** Use `CHALLENGE.md` and `01_problem_space/` to compare problems on data readiness and demo risk. See [`RUBRIC.md`](../RUBRIC.md) for how judges think about quality.\n\n",
        text,
    )


def remove_score_tables_loose(text: str) -> str:
    """Economy appendix-style two-column score rows."""
    text = re.sub(
        r"\| [^|\n]+ \| \d+/\d+ \| [^|\n]+ \|\n",
        "",
        text,
    )
    return text


def main() -> None:
    for name in PILLARS:
        p = REPOS / name / "README.md"
        raw = p.read_text(encoding="utf-8")
        if CH not in raw:
            print("skip (no challenge):", p)
            continue
        j = None
        for marker in SECTION_END_MARKERS:
            if marker in raw:
                ji = raw.index(marker)
                if ji > raw.index(CH):
                    j = ji
                    break
        if j is None:
            print("skip (no end marker):", p)
            continue
        i = raw.index(CH)
        pre = raw[: i + len(CH) + 1]
        challenge_body = raw[i + len(CH) + 1 : j]
        post = raw[j:]
        pre = fix_preamble(pre)
        challenge_body = fix_challenge_slice(challenge_body)
        out = pre + challenge_body + post
        out = strip_score_parentheticals(out)
        out = scrub_scoring_notes(out)
        out = remove_rubric_summary_tables(out)
        out = remove_score_tables_loose(out)
        out = out.replace("\u2014", " - ").replace("\u2013", "-")
        out = out.replace(
            "1) Read: `CHALLENGE.md` — the two problems, top blue sky, Pillar Award weights, and optional per-problem rubric prompts",
            "1) Read: `CHALLENGE.md` for the two problems, top blue sky, and optional per-problem rubric prompts",
        )
        out = out.replace(
            "| 1 | Read `CHALLENGE.md` — the two problems, top blue sky, Pillar Award weights, and optional per-problem rubric prompts",
            "| 1 | Read `CHALLENGE.md` for the two problems, top blue sky, and optional per-problem rubric prompts",
        )
        if "docs/PARTICIPANT_HANDOUT.md" not in out:
            out = out.replace(
                "they are not instructions to judges.\n\n---",
                "they are not instructions to judges.\n\nA single-file Markdown handout (same content as `CHALLENGE.md` plus a short cover note) is at [`docs/PARTICIPANT_HANDOUT.md`](docs/PARTICIPANT_HANDOUT.md).\n\n---",
                1,
            )
        p.write_text(out, encoding="utf-8", newline="\n")
        print("ok", p)


if __name__ == "__main__":
    main()
