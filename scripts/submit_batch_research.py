#!/usr/bin/env python3
"""Submit all new J-Q section research prompts via Parallel.ai and poll for results.

Submits all prompts concurrently (non-blocking), then polls until complete.
Skips prompts that already have output in research/.

Usage:
    export PARALLEL_API_KEY="$PARALLEL_AI_KEY"
    python scripts/submit_batch_research.py
    python scripts/submit_batch_research.py --processor pro --sections J K L M N O P Q
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

BASE_URL = "https://api.parallel.ai/v1/tasks/runs"
REPO_ROOT = Path(__file__).resolve().parent.parent
PROMPTS_DIR = REPO_ROOT / "05_prompts" / "research"
OUTPUT_DIR = REPO_ROOT / "research"


def api_request(api_key: str, method: str, path: str = "", data=None, timeout: int = 120) -> dict:
    url = BASE_URL + path
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = Request(url, data=body, method=method)
    req.add_header("x-api-key", api_key)
    req.add_header("Content-Type", "application/json")
    with urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def submit_prompt(api_key: str, prompt_text: str, processor: str) -> str:
    resp = api_request(api_key, "POST", "", {
        "input": prompt_text,
        "processor": processor,
        "task_spec": {"output_schema": {"type": "text"}},
    })
    return resp["run_id"]


def poll_status(api_key: str, run_id: str) -> str:
    resp = api_request(api_key, "GET", f"/{run_id}")
    return resp.get("status", "unknown")


def fetch_result(api_key: str, run_id: str) -> str:
    raw = api_request(api_key, "GET", f"/{run_id}/result")
    output = raw.get("output", {})
    content = output.get("content", "")
    return content if isinstance(content, str) else json.dumps(content, indent=2)


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch submit research prompts to Parallel.ai")
    parser.add_argument("--processor", default="pro-fast",
                        help="Processor tier (default: pro-fast)")
    parser.add_argument("--sections", nargs="*", default=["J", "K", "L", "M", "N", "O", "P", "Q"],
                        help="Section prefixes to submit (default: J K L M N O P Q)")
    parser.add_argument("--overwrite", action="store_true",
                        help="Re-run prompts even if output exists")
    parser.add_argument("--poll-interval", type=int, default=15,
                        help="Seconds between poll checks (default: 15)")
    parser.add_argument("--timeout", type=int, default=1800,
                        help="Max seconds to wait for all jobs (default: 1800)")
    args = parser.parse_args()

    api_key = os.getenv("PARALLEL_API_KEY")
    if not api_key:
        print("PARALLEL_API_KEY not set.", file=sys.stderr)
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    prompts = sorted(
        p for p in PROMPTS_DIR.iterdir()
        if p.suffix == ".txt" and any(p.name.startswith(s) for s in args.sections)
    )

    if not args.overwrite:
        prompts = [p for p in prompts if not (OUTPUT_DIR / f"{p.stem}.md").exists()]

    if not prompts:
        print("All prompts already have outputs. Use --overwrite to re-run.")
        return 0

    print(f"Submitting {len(prompts)} prompts [processor={args.processor}]\n")

    jobs: list[dict] = []
    for p in prompts:
        content = p.read_text(encoding="utf-8").strip()
        try:
            run_id = submit_prompt(api_key, content, args.processor)
            print(f"  Submitted: {p.name} -> {run_id}")
            jobs.append({"name": p.name, "stem": p.stem, "run_id": run_id, "status": "submitted"})
        except Exception as e:
            print(f"  FAILED: {p.name} -> {e}")
            jobs.append({"name": p.name, "stem": p.stem, "run_id": None, "status": "error"})

    submitted = [j for j in jobs if j["run_id"]]
    print(f"\n{len(submitted)} jobs submitted. Polling for results...\n")

    # Save run_ids for recovery
    tracker_path = REPO_ROOT / "scripts" / "batch_run_ids.json"
    with open(tracker_path, "w") as f:
        json.dump(jobs, f, indent=2)
    print(f"Run IDs saved to {tracker_path}\n")

    deadline = time.time() + args.timeout
    pending = {j["run_id"]: j for j in submitted}
    completed = 0
    errors = 0

    while pending and time.time() < deadline:
        for run_id, job in list(pending.items()):
            try:
                status = poll_status(api_key, run_id)
            except Exception:
                continue

            if status == "completed":
                try:
                    content = fetch_result(api_key, run_id)
                    out_path = OUTPUT_DIR / f"{job['stem']}.md"
                    out_path.write_text(content, encoding="utf-8")
                    print(f"  Done: {job['name']} -> {out_path.name} ({len(content)} chars)")
                    job["status"] = "completed"
                    completed += 1
                except Exception as e:
                    print(f"  Result fetch failed: {job['name']} -> {e}")
                    job["status"] = "fetch_error"
                    errors += 1
                del pending[run_id]

            elif status == "failed":
                print(f"  FAILED: {job['name']} (run_id={run_id})")
                job["status"] = "failed"
                errors += 1
                del pending[run_id]

        if pending:
            remaining = [p["name"] for p in pending.values()]
            print(f"  ... waiting on {len(remaining)} jobs ({args.poll_interval}s) ...")
            time.sleep(args.poll_interval)

    if pending:
        print(f"\nTIMEOUT: {len(pending)} jobs still running after {args.timeout}s")
        for job in pending.values():
            job["status"] = "timeout"

    # Update tracker
    with open(tracker_path, "w") as f:
        json.dump(jobs, f, indent=2)

    print(f"\n{'='*60}")
    print(f"Results: {completed} completed, {errors} errors, {len(pending)} timed out")
    print(f"Outputs in: {OUTPUT_DIR}/")
    print(f"Tracker: {tracker_path}")
    return 0 if errors == 0 and not pending else 1


if __name__ == "__main__":
    raise SystemExit(main())
