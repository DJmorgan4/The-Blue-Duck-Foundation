import Link from "next/link";
import { useRouter } from "next/router";
const TIERS: Record<string, string> = { playa: "Playa", marsh: "Marsh", flyway: "Flyway", sentinel: "Sentinel" };
export default function MembershipSuccess() {
  const { query } = useRouter();
  const tier = TIERS[query.tier as string] || "Member";
  return (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: 600, margin: "80px auto", padding: "0 24px" }}>
      <div style={{ borderLeft: "3px solid #3b82f6", paddingLeft: 16, marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 4 }}>Membership confirmed</div>
        <h1 style={{ fontSize: 40, fontWeight: 300, color: "#0f172a", margin: 0 }}>Welcome, {tier} Member.</h1>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", marginBottom: 16 }}>Your membership is active. A confirmation and tax receipt has been sent to your email. Fully deductible under IRC Section 170.</p>
      <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 32 }}>EIN 41-4361489 · The Blue Duck Foundation · 501(c)(3)</p>
      <Link href="/" style={{ background: "#0f172a", color: "#fff", textDecoration: "none", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 28px" }}>Return home</Link>
    </div>
  );
}
