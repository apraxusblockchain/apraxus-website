import Link from "next/link";
import { ArrowUpRight, Code2, GitBranch, ShieldCheck } from "lucide-react";

const groups = [
  {
    title: "Protocol",
    links: [
      ["Overview", "/"],
      ["Technology", "/technology"],
      ["Network", "/network"],
      ["Security", "/security"],
      ["Roadmap", "/roadmap"],
    ],
  },
  {
    title: "Autonomous",
    links: [
      ["Agents", "/agents"],
      ["Payments", "/payments"],
      ["Ecosystem", "/ecosystem"],
    ],
  },
  {
    title: "Developers",
    links: [
      ["Developer Hub", "/developers"],
      ["Documentation", "/developers/docs"],
      ["API Keys", "/developers/keys"],
      ["Sandbox", "/developers/sandbox"],
      ["Metrics", "/developers/metrics"],
    ],
  },
  {
    title: "Research",
    links: [
      ["Whitepaper", "/whitepaper"],
      ["APXS", "/apxs"],
      ["Liquidity", "/liquidity"],
      ["About", "/about"],
      ["FAQ", "/faq"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="apx-shell-footer">
      <div className="apx-footer-gridline" />

      <div className="apx-footer-main">
        <div className="apx-footer-brand">
          <div className="apx-footer-logo">
            <span className="apx-footer-symbol">
              <span />
              <span />
              <span />
            </span>
            <strong>APRAXUS</strong>
          </div>

          <p>
            Infrastructure for programmable agents, machine-to-machine
            payments, constrained execution and verifiable settlement.
          </p>

          <div className="apx-footer-state">
            <i />
            <span>ARBITRUM SEPOLIA</span>
            <b>421614</b>
          </div>
        </div>

        <div className="apx-footer-links">
          {groups.map((group) => (
            <div key={group.title}>
              <span>{group.title}</span>

              {group.links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                  <ArrowUpRight size={11} />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="apx-footer-system">
        <div>
          <span className="apx-footer-system-label">PROTOCOL STATUS</span>
          <span className="apx-footer-live">
            <i />
            TESTNET OPERATIONAL
          </span>
        </div>

        <div className="apx-footer-actions">
          <Link href="/developers">
            <Code2 size={14} />
            DEVELOP
          </Link>

          <Link href="/security">
            <ShieldCheck size={14} />
            SECURITY
          </Link>

          <a
            href="https://github.com/apraxusblockchain/apraxus-website"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={14} />
            SOURCE
          </a>
        </div>
      </div>

      <div className="apx-footer-bottom">
        <span>© {new Date().getFullYear()} APRAXUS PROTOCOL</span>
        <span>DECENTRALIZED INFRASTRUCTURE / TESTNET</span>
        <Link href="/settings">INTERFACE</Link>
      </div>
    </footer>
  );
}

export default Footer;
