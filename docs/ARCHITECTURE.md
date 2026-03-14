# AxiomForge Architecture

## Core Components
1. **Agent Orchestrator** (agent/)
   - Task discovery
   - Planning & execution
   - Tooling (git, tests, CI)

2. **Receipt Engine** (contracts/ + packages/receipt/)
   - ERC‑8004 identity
   - Signed receipts (task hash, commit hash, artifacts)

3. **Verifier** (packages/receipt/)
   - Re‑runs tests
   - Validates commit + artifacts
   - Verifies receipt signature

4. **Dashboard** (apps/web/)
   - Shows runs + receipts + verification status

## MVP: Proof‑of‑Execution
- Input: GitHub issue or task spec
- Output: PR + receipt + verification report

## Chain
- Base Sepolia (default)

