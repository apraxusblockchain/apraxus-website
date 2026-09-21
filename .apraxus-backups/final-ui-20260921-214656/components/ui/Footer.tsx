import Link from "next/link";
import {
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const columns = [
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
    title: "Autonomous Economy",
    links: [
      ["Agents", "/agents"],
      ["Payments", "/payments"],
      ["Execution", "/technology#execution"],
      ["Ecosystem", "/ecosystem"],
    ],
  },
  {
    title: "Developers",
    links: [
      ["Developer Hub", "/developers"],
      ["Docs", "/developers/docs"],
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
    <footer className="apx-footer">
      <div className="apx-footer-signal">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="apx-footer-main">
        <div className="apx-footer-brand">
          <div className="apx-footer-logo">
            <span className="apx-brand-mark">
              <span />
              <span />
              <span />
            </span>
            <strong>APRAXUS</strong>
          </div>

          <p>
            Protocol infrastructure for programmable agents, machine-to-machine
            payments, constrained execution, and verifiable on-chain settlement.
          </p>

          <div className="apx-footer-status">
            <i />
            <span>TESTNET OPERATIONAL</span>
            <small>ARB / 421614</small>
          </div>
        </div>

        <div className="apx-footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <span className="apx-footer-heading">{column.title}</span>
              {column.links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                  <ArrowUpRight size={12} />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="apx-footer-utility">
        <div>
          <span className="apx-mono">APXS / PROTOCOL STATUS</span>
          <span className="apx-footer-live">
            <i />
            SYSTEMS NOMINAL
          </span>
        </div>

        <div className="apx-footer-actions">
          <Link href="/developers">
            <Terminal size={14} />
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
            GITHUB
          </a>
        </div>
      </div>

      <div className="apx-footer-bottom">
        <span>© {new Date().getFullYear()} APRAXUS PROTOCOL</span>
        <span>DECENTRALIZED INFRASTRUCTURE / TESTNET</span>
        <Link href="/settings">INTERFACE SETTINGS</Link>
      </div>
    </footer>
  );
}


export default Footer;
