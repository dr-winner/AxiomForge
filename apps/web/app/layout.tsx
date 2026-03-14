export const metadata = {
  title: 'AxiomForge',
  description: 'Genesis Agent Network — Proof-of-Execution'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
