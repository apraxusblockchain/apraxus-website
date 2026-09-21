"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Command,
  Menu,
  Moon,
  Settings,
  Sun,
  X,
} from "lucide-react";

const groups = [
  {
    label: "Protocol",
    items: [
      ["Overview", "/"],
      ["Architecture", "/technology"],
      ["Network", "/network"],
      ["Security", "/security"],
    ],
  },
  {
    label: "Autonomous Economy",
    items: [
      ["Agents", "/agents"],
      ["Payments", "/payments"],
      ["Execution Model", "/technology#execution"],
    ],
  },
  {
    label: "APXS",
    items: [
      ["Token", "/apxs"],
      ["Liquidity", "/liquidity"],
      ["Testnet", "/network"],
    ],
  },
  {
    label: "Developers",
    items: [
      ["Developer Hub", "/developers"],
      ["Documentation", "/developers/docs"],
      ["API Keys", "/developers/keys"],
      ["Sandbox", "/developers/sandbox"],
      ["Metrics", "/developers/metrics"],
      ["Dashboard", "/developers/dashboard"],
    ],
  },
  {
    label: "Research",
    items: [
      ["Whitepaper", "/whitepaper"],
      ["Roadmap", "/roadmap"],
      ["About", "/about"],
      ["FAQ", "/faq"],
    ],
  },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("apraxus-theme") as
      | "dark"
      | "light"
      | null;

    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("apraxus-theme", next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <button
      className="apx-theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="apx-nav">
        <div className="apx-nav-inner">
          <Link href="/" className="apx-brand" onClick={() => setOpen(false)}>
            <span className="apx-brand-mark">
              <span />
              <span />
              <span />
            </span>

            <span className="apx-brand-copy">
              <strong>APRAXUS</strong>
              <small>PROTOCOL INFRASTRUCTURE</small>
            </span>
          </Link>

          <nav className="apx-desktop-nav" aria-label="Primary navigation">
            {groups.slice(0, 4).map((group) => (
              <div
                className="apx-nav-group"
                key={group.label}
                onMouseEnter={() => setActive(group.label)}
                onMouseLeave={() => setActive(null)}
              >
                <button className="apx-nav-trigger">
                  {group.label}
                  <ChevronDown size={13} />
                </button>

                {active === group.label && (
                  <div className="apx-mega">
                    <div className="apx-mega-head">
                      <span>{group.label}</span>
                      <span className="apx-mono">NAV / 0{groups.indexOf(group) + 1}</span>
                    </div>

                    <div className="apx-mega-grid">
                      {group.items.map(([label, href]) => (
                        <Link href={href} key={href} onClick={() => setActive(null)}>
                          <span>{label}</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/whitepaper" className="apx-nav-link">
              Whitepaper
            </Link>
          </nav>

          <div className="apx-nav-actions">
            <span className="apx-network-chip">
              <i />
              ARB SEPOLIA
            </span>

            <ThemeToggle />

            <Link href="/settings" className="apx-settings-link" title="Settings">
              <Settings size={16} />
            </Link>

            <Link href="/developers" className="apx-nav-cta">
              <Command size={14} />
              BUILD
            </Link>

            <button
              className="apx-mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Open navigation"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="apx-mobile-menu">
          <div className="apx-mobile-top">
            <span className="apx-eyebrow">APRAXUS / NAVIGATION</span>
            <span className="apx-mono">SYSTEM READY</span>
          </div>

          <div className="apx-mobile-grid">
            {groups.map((group, index) => (
              <section key={group.label}>
                <div className="apx-mobile-section-title">
                  <span>0{index + 1}</span>
                  {group.label}
                </div>

                {group.items.map(([label, href]) => (
                  <Link
                    href={href}
                    key={href}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </section>
            ))}
          </div>

          <div className="apx-mobile-bottom">
            <Link href="/settings" onClick={() => setOpen(false)}>
              <Settings size={15} />
              Interface Settings
            </Link>
            <Link href="/developers" onClick={() => setOpen(false)}>
              Enter Developer Environment
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}


export default Navbar;
