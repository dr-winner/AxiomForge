# Agent Orchestrator

Production-ready agent execution engine for AxiomForge.

## Responsibilities

- **Discover tasks**: Fetch open GitHub issues from configured repo
- **Plan → execute → verify**: Generate patches, run tests, validate results
- **Emit signed receipts**: Mint ERC-8004 compliant receipts with cryptographic hashes

## Execution Flow

1. **Fetch Issue**: Query GitHub API for issue details (title, body, metadata)
2. **Generate Patch**: Execute agent logic to produce code fixes
3. **Run Tests**: Execute test suite, capture pass/fail status
4. **Build Receipt**: Construct ERC-8004 receipt with:
   - `taskHash`: keccak256(owner/repo#issue@commit)
   - `commitHash`: Git SHA of the fix
   - `testReportHash`: keccak256 of test output
   - `artifactURI`: IPFS/Arweave URI for artifacts
   - `agentId`: Agent identity identifier
   - `timestamp`: Unix timestamp
   - `chainId`: Chain where receipt was minted (Base Sepolia: 84532)
5. **Mint Receipt**: Compute deterministic hash, write to `.axiomforge-receipt.json`
6. **Verify**: Validate receipt integrity using `@axiomforge/receipt` package

## Usage

```bash
# Run agent (requires GITHUB_TOKEN in .env)
npm run dev

# Build for production
npm run build
```

## Environment Variables

- `GITHUB_TOKEN`: GitHub personal access token (required)
- `GITHUB_OWNER`: Repository owner (default: dr-winner)
- `GITHUB_REPO`: Repository name (default: AxiomForge)
- `GITHUB_ISSUE`: Specific issue number (optional, auto-selects latest if unset)
- `CHAIN_ID`: Chain ID for receipts (default: 84532 for Base Sepolia)

## Output

Receipts are written to `.axiomforge-receipt.json` in the workspace root:

```json
{
  "receipt": {
    "taskHash": "0x...",
    "commitHash": "main",
    "testReportHash": "0x...",
    "artifactURI": "ipfs://...",
    "agentId": "erc8004:axiomforge",
    "timestamp": 1234567890,
    "chainId": 84532
  },
  "receiptHash": "0x...",
  "testOutput": "tests:passed",
  "patchOutput": "...",
  "testStatus": "passed"
}
```
