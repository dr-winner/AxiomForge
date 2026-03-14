export default function Page() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>AxiomForge</h1>
      <p>Genesis Agent Network — Proof‑of‑Execution</p>

      <section style={{ marginTop: 24 }}>
        <h2>Latest Runs (placeholder)</h2>
        <ul>
          <li>run_001 — receipt pending</li>
          <li>run_002 — verified ✅</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Receipts (placeholder)</h2>
        <p>Will show receipt hash, artifact URI, and verification status.</p>
      </section>
    </main>
  );
}
