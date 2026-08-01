> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Knowledge Graph and 3D Funding Explorer

An evidence-backed knowledge graph of the Richmond Built Environment pillar research corpus,
with an interactive 3D explorer for tracing problems, stakeholders, and funding flows.

See `docs/` for architecture, ontology, methodology, and research gaps. Full usage
documentation is in [docs/architecture.md](docs/architecture.md).

## Quick start

```bash
cd knowledge-graph
make install     # npm install
make extract     # regenerate data/ from the repository corpus
make validate    # JSON Schema + referential integrity validation
make test        # vitest suites
make dev         # dev server at http://localhost:5173
make build       # production build (runs extract first)
make preview     # serve the production build
make screenshots # Chrome validation + screenshots into docs/screenshots/
```
