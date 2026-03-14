# AxiomForge

**Genesis Agent Network (GAN)** — an autonomous agent that executes real work and publishes **verifiable receipts** onchain (ERC‑8004).  
**Chain:** Base Sepolia.  
**MVP Mode:** Proof‑of‑Execution.

---

## What it does (MVP)
1. **Finds** a real issue (GitHub issue / broken API / task).
2. **Plans** a fix.
3. **Executes** a patch (code + tests).
4. **Verifies** results.
5. **Publishes receipts** (ERC‑8004 identity + signed proof of execution).

---

## Repo Layout
```
/agent            # autonomous agent orchestration
/contracts        # ERC‑8004 identity + receipts
/apps/web         # dashboard UI
/packages/receipt # receipt schema + verifier
/scripts          # dev scripts
/docs             # specs & notes
```

---

## Roadmap Modes
- **Grant Allocator** — autonomous micro‑grants with audit trail
- **Data Licensing** — automated licensing + onchain receipts

---

## Quick Start (WIP)
- Agent: `cd agent`
- Contracts: `cd contracts`
- Web: `cd apps/web`

---

## Milestones
- [ ] ERC‑8004 identity + receipt schema
- [ ] Agent execution loop
- [ ] Verifier + dashboard
- [ ] Demo run + video

---

## License
TBD
