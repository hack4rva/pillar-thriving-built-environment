#!/usr/bin/env python3
"""
Walk a repository, prepend a methodology attribution blurb to each .md file,
and ensure a methodology markdown file exists with the required hack line.

Skips the methodology file itself. Idempotent: skips files that already have the blurb.
"""
from __future__ import annotations

import argparse
import os
from pathlib import Path
from typing import Iterable

SKIP_DIR_PARTS = frozenset(
    {".git", "node_modules", ".venv", "venv", "__pycache__", ".cursor"}
)

DEFAULT_METHODOLOGY_CONTENT = """# Research Methodology

Hi! Here for the hack? Hell yeah!

## How This Research Was Generated

This repository's research content was generated using a multi-stage process combining human expertise with AI assistance.

### Process

1. **Committee Formation** — Per-pillar committees were formed of non-profit and City of Richmond subject-matter experts.

2. **Problem Statement Development** — Each committee produced 4–5 pages of problem statements based on their domain expertise.

3. **Gap Question Generation** — These problem statements were fed into Claude Opus 4 Thinking to generate "gap questions" — areas where additional research was needed.

4. **Deep Research** — Gap questions were "bridged" using [Parallel.ai](https://parallel.ai/) deep-research jobs, which perform multi-step web research with source verification.

5. **Human Review** — Results were reviewed by City experts for ground-truth validation.

## Transparency Note

LLMs were involved at multiple stages of this research pipeline:
- [Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) for gap question generation
- Parallel.ai (which uses LLMs internally) for deep research synthesis

The human-in-the-loop review by City experts provides ground-truth validation, though the depth of that review may vary by section.

## Using This Research

This research is intended as a starting point for hackathon teams. Always:
- Verify claims against primary sources when possible
- Check `evidence_log.md` for verified factual claims with official URLs
- Treat synthesized content as directional, not authoritative
"""

REQUIRED_HACK_LINE = "Hi! Here for the hack? Hell yeah!"


def iter_markdown_files(repo_root: Path) -> Iterable[Path]:
    for path in repo_root.rglob("*.md"):
        if any(part in SKIP_DIR_PARTS for part in path.parts):
            continue
        if path.is_file():
            yield path


def ensure_methodology_file(methodology_path: Path) -> None:
    if not methodology_path.exists():
        methodology_path.parent.mkdir(parents=True, exist_ok=True)
        methodology_path.write_text(DEFAULT_METHODOLOGY_CONTENT, encoding="utf-8")
        return

    content = methodology_path.read_text(encoding="utf-8")

    if REQUIRED_HACK_LINE not in content:
        if content.startswith("# "):
            lines = content.splitlines()
            if len(lines) >= 1:
                lines.insert(1, "")
                lines.insert(2, REQUIRED_HACK_LINE)
                updated = "\n".join(lines).rstrip() + "\n"
            else:
                updated = content.rstrip() + f"\n\n{REQUIRED_HACK_LINE}\n"
        else:
            updated = content.rstrip() + f"\n\n{REQUIRED_HACK_LINE}\n"

        methodology_path.write_text(updated, encoding="utf-8")


def build_blurb(link_path: str) -> str:
    return (
        "> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) "
        f"with human expert review. See [methodology]({link_path}) for details.\n\n"
    )


def has_existing_blurb(content: str) -> bool:
    return (
        ("Methodology note" in content and "generated using a specific methodology" in content)
        or ("generated using AI assistance" in content and "methodology" in content.lower())
    )


def relative_link_to_methodology(md_path: Path, methodology_path: Path) -> str:
    """POSIX relative path from md_path's directory to methodology_path."""
    return Path(
        os.path.relpath(methodology_path, start=md_path.parent)
    ).as_posix()


def add_blurb_to_markdown_file(
    md_path: Path, methodology_path: Path, *, dry_run: bool = False
) -> bool:
    if md_path.resolve() == methodology_path.resolve():
        return False

    content = md_path.read_text(encoding="utf-8")

    if has_existing_blurb(content):
        return False

    if dry_run:
        return True

    relative_link = relative_link_to_methodology(md_path, methodology_path)
    blurb = build_blurb(relative_link)

    # Keep frontmatter intact if present (opening --- ... ---).
    if content.startswith("---\n"):
        parts = content.split("\n---\n", 1)
        if len(parts) == 2:
            frontmatter, rest = parts
            updated = f"{frontmatter}\n---\n\n{blurb}{rest.lstrip()}"
        else:
            updated = blurb + content
    else:
        updated = blurb + content

    md_path.write_text(updated, encoding="utf-8")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Add a methodology blurb to every markdown file in a repository."
    )
    parser.add_argument(
        "repo_root",
        nargs="?",
        default=".",
        help="Path to the repository root. Defaults to current directory.",
    )
    parser.add_argument(
        "--methodology-file",
        default="docs/methodology.md",
        help="Path to the methodology markdown file, relative to repo root.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show which files would be updated without writing changes.",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    methodology_path = (repo_root / args.methodology_file).resolve()

    if not repo_root.exists() or not repo_root.is_dir():
        raise SystemExit(
            f"Repository root does not exist or is not a directory: {repo_root}"
        )

    if not args.dry_run:
        ensure_methodology_file(methodology_path)

    updated_count = 0
    scanned_count = 0

    for md_file in sorted(iter_markdown_files(repo_root)):
        scanned_count += 1
        if add_blurb_to_markdown_file(md_file, methodology_path, dry_run=args.dry_run):
            updated_count += 1
            prefix = "[dry-run] Would update" if args.dry_run else "Updated"
            print(f"{prefix}: {md_file.relative_to(repo_root)}")

    print()
    if args.dry_run:
        print("[dry-run] No files were modified.")
    print(f"Scanned markdown files: {scanned_count}")
    print(f"{'Would update' if args.dry_run else 'Updated'} markdown files: {updated_count}")
    print(f"Methodology file: {args.methodology_file}")


if __name__ == "__main__":
    main()
