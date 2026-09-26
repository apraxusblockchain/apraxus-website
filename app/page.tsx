'use client';

import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  FileText,
  Fingerprint,
  Globe2,
  Layers3,
  LockKeyhole,
  Network,
  ReceiptText,
  ScanLine,
  Server,
  ShieldCheck,
  Terminal,
  Wallet,
  Waves,
  Zap,
} from 'lucide-react';

import { WebGLScene } from '@/components/canvas/WebGLScene';
import { LiveNetworkStats } from '@/components/ui/LiveNetworkStats';

const architecture = [
  {
    number: '01',
    title: 'Intent',
    short: 'Define',
    text: 'A human or system establishes the objective and desired outcome.',
    icon: Fingerprint,
  },
  {
    number: '02',
    title: 'Agent',
    short: 'Plan',
    text: 'Software determines the actions required to pursue that objective.',
    icon: Bot,
  },
  {
    number: '03',
    title: 'Policy',
    short: 'Authorize',
    text: 'Explicit rules constrain what the agent is permitted to do.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Wallet',
    short: 'Control',
    text: 'Value and signing authority are exposed through defined boundaries.',
    icon: Wallet,
  },
  {
    number: '05',
    title: 'Execution',
    short: 'Act',
    text: 'Authorized actions move through execution systems and external networks.',
    icon: Zap,
  },
  {
    number: '06',
    title: 'Receipt',
    short: 'Verify',
    text: 'The resulting action and outcome become traceable and inspectable.',
    icon: ReceiptText,
  },
] as const;

const current = [
  'APXS testnet deployment',
  'Arbitrum Sepolia execution environment',
  'APXS / WETH test liquidity and swaps',
  'Developer API v1',
  'TypeScript SDK foundation',
  'Simulation sandbox',
  'Developer dashboard and metrics',
  'Technical documentation and whitepaper',
];

const building = [
  'Protocol-level agent identity',
  'Policy-aware execution primitives',
  'Native network architecture',
  'Native state and consensus research',
  'Machine-to-machine economic primitives',
  'Broader cross-network execution',
];

const surfaces = [
  {
    href: '/network',
    label: 'NETWORK',
    title: 'Inspect the execution layer',
    text: 'Explore the current testnet environment, network telemetry and on-chain activity.',
    icon: Network,
  },
  {
    href: '/developers',
    label: 'DEVELOPERS',
    title: 'Build against the protocol',
    text: 'API, SDK, sandbox, keys, metrics and technical documentation.',
    icon: Code2,
  },
  {
    href: '/agents',
    label: 'AGENTS',
    title: 'Understand agent execution',
    text: 'Explore the model connecting intent, policy, authority, execution and receipts.',
    icon: Bot,
  },
  {
    href: '/payments',
    label: 'PAYMENTS',
    title: 'Coordinate machine value',
    text: 'Explore the primitives required for software-driven payment flows.',
    icon: Wallet,
  },
];

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="apx-section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="apx-arrow-link">
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="apx-home">
      <div className="apx-home-noise" />

      {/* PROTOCOL ENTRY */}
      <section className="apx-hero">
        <div className="apx-hero-scene">
          <WebGLScene />
        </div>

        <div className="apx-hero-grid" />
        <div className="apx-hero-vignette" />

        <div className="apx-hero-inner apx-container">
          <div className="apx-bootline">
            <span className="apx-live-dot" />
            <span>APRAXUS PROTOCOL</span>
            <span className="apx-boot-separator">/</span>
            <span>NETWORK INITIALIZED</span>
          </div>

          <div className="apx-hero-copy">
            <div className="apx-kicker">INFRASTRUCTURE FOR AUTONOMOUS SOFTWARE</div>

            <h1 className="apx-hero-title">
              <span>Infrastructure for the</span>
              <span className="apx-hero-title-accent">Autonomous Economy.</span>
            </h1>

            <p className="apx-hero-description">
              Apraxus is building infrastructure for autonomous software to
              coordinate identity, policy, wallets, payments and execution
              through defined and verifiable interfaces.
            </p>

            <div className="apx-hero-actions">
              <Link href="/developers" className="apx-button-primary apx-button-large">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/network" className="apx-button-secondary apx-button-large">
                Explore Testnet
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="apx-hero-meta">
              <span><i /> DEVELOPMENT</span>
              <span>ARBITRUM SEPOLIA</span>
              <span>CHAIN 421614</span>
              <span>APXS TESTNET</span>
            </div>
          </div>

          <div className="apx-hero-terminal">
            <div className="apx-terminal-top">
              <span>PROTOCOL STATUS</span>
              <span className="apx-terminal-live">LIVE</span>
            </div>
            <div className="apx-terminal-body">
              <div><span>NETWORK</span><strong>ARBITRUM_SEPOLIA</strong></div>
              <div><span>PROTOCOL</span><strong>DEVELOPMENT</strong></div>
              <div><span>ASSET</span><strong>APXS / TESTNET</strong></div>
              <div><span>INTERFACE</span><strong>API_V1</strong></div>
            </div>
            <div className="apx-terminal-scan" />
          </div>

          <div className="apx-scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </section>

      <LiveNetworkStats />

      {/* THESIS */}
      <section className="apx-section apx-thesis">
        <div className="apx-container">
          <div className="apx-thesis-grid">
            <div>
              <SectionLabel index="01">THE THESIS</SectionLabel>
              <h2 className="apx-display-heading">
                Autonomous software
                <span>needs an execution layer.</span>
              </h2>
            </div>

            <div className="apx-thesis-copy">
              <p className="apx-lead">
                Software can already reason, generate, plan and call APIs.
                The harder problem begins when software must act within
                boundaries and coordinate real resources.
              </p>

              <div className="apx-thesis-points">
                <div>
                  <Fingerprint />
                  <div>
                    <strong>Identity</strong>
                    <span>Who is acting?</span>
                  </div>
                </div>
                <div>
                  <ShieldCheck />
                  <div>
                    <strong>Authority</strong>
                    <span>What is it allowed to do?</span>
                  </div>
                </div>
                <div>
                  <Wallet />
                  <div>
                    <strong>Value</strong>
                    <span>What resources can it control?</span>
                  </div>
                </div>
                <div>
                  <ReceiptText />
                  <div>
                    <strong>Proof</strong>
                    <span>What actually happened?</span>
                  </div>
                </div>
              </div>

              <div className="apx-rule" />

              <p className="apx-mono-note">
                INFRASTRUCTURE FIRST. AUTONOMY FOLLOWS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="apx-section apx-architecture">
        <div className="apx-container">
          <div className="apx-section-head">
            <div>
              <SectionLabel index="02">EXECUTION MODEL</SectionLabel>
              <h2 className="apx-display-heading">
                From intent to
                <span>verifiable execution.</span>
              </h2>
            </div>
            <p>
              A conceptual execution model for connecting autonomous software
              with explicit authority, controlled value and inspectable outcomes.
            </p>
          </div>

          <div className="apx-flow">
            {architecture.map(({ number, title, short, text, icon: Icon }, index) => (
              <div className="apx-flow-node" key={number}>
                <div className="apx-flow-index">{number}</div>

                <div className="apx-flow-icon">
                  <Icon />
                </div>

                <div className="apx-flow-content">
                  <span>{short}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                {index < architecture.length - 1 && (
                  <div className="apx-flow-connector">
                    <ArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="apx-architecture-foot">
            <div>
              <ScanLine />
              <span>DEFINED BOUNDARIES</span>
            </div>
            <div>
              <LockKeyhole />
              <span>EXPLICIT AUTHORITY</span>
            </div>
            <div>
              <ReceiptText />
              <span>TRACEABLE OUTCOMES</span>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT / BUILDING */}
      <section className="apx-section apx-state">
        <div className="apx-container">
          <div className="apx-state-header">
            <SectionLabel index="03">BUILD STATUS</SectionLabel>
            <p>
              Apraxus separates deployed functionality from active development
              and longer-term research. This distinction is intentional.
            </p>
          </div>

          <div className="apx-state-grid">
            <div className="apx-state-panel apx-state-current">
              <div className="apx-state-top">
                <span className="apx-state-marker current" />
                <span>CURRENT / VERIFIED</span>
              </div>

              <h3>What exists today.</h3>

              <p>
                The current platform is focused on development infrastructure
                and APXS testnet experimentation.
              </p>

              <div className="apx-check-list">
                {current.map((item) => (
                  <div key={item}>
                    <Check />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="apx-state-panel apx-state-building">
              <div className="apx-state-top">
                <span className="apx-state-marker building" />
                <span>IN DEVELOPMENT / RESEARCH</span>
              </div>

              <h3>What is being developed.</h3>

              <p>
                These directions describe protocol work beyond the currently
                deployed testnet surface and should not be interpreted as live
                production capabilities.
              </p>

              <div className="apx-build-list">
                {building.map((item, index) => (
                  <div key={item}>
                    <span>0{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTNET PROOF */}
      <section className="apx-section apx-proof">
        <div className="apx-container">
          <div className="apx-proof-shell">
            <div className="apx-proof-background">
              <div className="apx-proof-orbit orbit-a" />
              <div className="apx-proof-orbit orbit-b" />
              <div className="apx-proof-core">
                <div />
                <span>APXS</span>
                <small>TESTNET</small>
              </div>
            </div>

            <div className="apx-proof-content">
              <SectionLabel index="04">LIVE TESTNET</SectionLabel>

              <h2 className="apx-display-heading">
                A protocol should
                <span>be inspectable.</span>
              </h2>

              <p>
                The current APXS environment provides a real development surface
                for testing the project's infrastructure direction before
                broader protocol deployment.
              </p>

              <div className="apx-proof-data">
                <div>
                  <span>NETWORK</span>
                  <strong>ARBITRUM SEPOLIA</strong>
                </div>
                <div>
                  <span>CHAIN ID</span>
                  <strong>421614</strong>
                </div>
                <div>
                  <span>ASSET</span>
                  <strong>APXS</strong>
                </div>
                <div>
                  <span>STATUS</span>
                  <strong>TESTNET</strong>
                </div>
              </div>

              <Link href="/network" className="apx-button-primary">
                Inspect Network
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SURFACES */}
      <section className="apx-section apx-surfaces">
        <div className="apx-container">
          <div className="apx-section-head">
            <div>
              <SectionLabel index="05">PROTOCOL SURFACES</SectionLabel>
              <h2 className="apx-display-heading">
                One system.
                <span>Multiple interfaces.</span>
              </h2>
            </div>
            <p>
              Explore Apraxus from the network, developer, agent and payment
              layers without losing the relationship between them.
            </p>
          </div>

          <div className="apx-surface-grid">
            {surfaces.map(({ href, label, title, text, icon: Icon }, index) => (
              <Link href={href} className="apx-surface-card" key={href}>
                <div className="apx-surface-card-top">
                  <span>0{index + 1}</span>
                  <Icon />
                </div>

                <div className="apx-surface-card-body">
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                <div className="apx-surface-card-bottom">
                  <span>EXPLORE</span>
                  <ArrowUpRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="apx-section apx-security">
        <div className="apx-container">
          <div className="apx-security-grid">
            <div className="apx-security-visual">
              <div className="apx-security-ring ring-one" />
              <div className="apx-security-ring ring-two" />
              <div className="apx-security-ring ring-three" />

              <div className="apx-security-lock">
                <LockKeyhole />
              </div>

              <div className="apx-security-signal signal-a"><span>POLICY</span></div>
              <div className="apx-security-signal signal-b"><span>AUTHORITY</span></div>
              <div className="apx-security-signal signal-c"><span>RECEIPT</span></div>
            </div>

            <div>
              <SectionLabel index="07">SECURITY MODEL</SectionLabel>

              <h2 className="apx-display-heading">
                Autonomy without
                <span>unbounded authority.</span>
              </h2>

              <p className="apx-large-copy">
                Autonomous execution requires boundaries. The protocol direction
                separates intent from authority and authority from execution,
                creating explicit points where actions can be constrained,
                inspected and recorded.
              </p>

              <div className="apx-security-list">
                <div>
                  <ShieldCheck />
                  <div>
                    <strong>Policy boundaries</strong>
                    <span>Define what an agent is permitted to do.</span>
                  </div>
                </div>
                <div>
                  <Wallet />
                  <div>
                    <strong>Controlled authority</strong>
                    <span>Separate value access from autonomous decision-making.</span>
                  </div>
                </div>
                <div>
                  <ReceiptText />
                  <div>
                    <strong>Execution receipts</strong>
                    <span>Preserve a traceable representation of outcomes.</span>
                  </div>
                </div>
              </div>

              <ArrowLink href="/security">Explore security architecture</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK STACK */}
      <section className="apx-section apx-stack">
        <div className="apx-container">
          <SectionLabel index="08">SYSTEM LAYERS</SectionLabel>

          <div className="apx-stack-heading">
            <h2 className="apx-display-heading">
              A layered approach to
              <span>autonomous execution.</span>
            </h2>
            <p>
              The long-term architecture is being developed as a set of
              coordinated layers rather than a single application surface.
            </p>
          </div>

          <div className="apx-stack-map">
            <div className="apx-stack-layer layer-top">
              <div><Bot /><span>AGENT APPLICATIONS</span></div>
              <small>Intent · Planning · Automation</small>
            </div>

            <div className="apx-stack-connector"><Waves /></div>

            <div className="apx-stack-layer layer-mid">
              <div><ShieldCheck /><span>AUTHORIZATION &amp; POLICY</span></div>
              <small>Identity · Rules · Authority</small>
            </div>

            <div className="apx-stack-connector"><Waves /></div>

            <div className="apx-stack-layer layer-core">
              <div><Server /><span>EXECUTION INFRASTRUCTURE</span></div>
              <small>State · Execution · Settlement</small>
            </div>

            <div className="apx-stack-connector"><Waves /></div>

            <div className="apx-stack-layer layer-base">
              <div><Network /><span>NETWORKS &amp; EXTERNAL SYSTEMS</span></div>
              <small>On-chain · Off-chain · Cross-network</small>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH / ROADMAP */}
      <section className="apx-section apx-roadmap">
        <div className="apx-container">
          <div className="apx-roadmap-grid">
            <div>
              <SectionLabel index="09">ROADMAP</SectionLabel>
              <h2 className="apx-display-heading">
                Build deliberately.
                <span>Expand when ready.</span>
              </h2>

              <p className="apx-large-copy">
                Apraxus is being developed in stages. Testnet infrastructure
                provides the foundation for validating interfaces before deeper
                protocol and network components are introduced.
              </p>

              <ArrowLink href="/roadmap">View development roadmap</ArrowLink>
            </div>

            <div className="apx-roadmap-track">
              <div className="apx-roadmap-item active">
                <span>01</span>
                <div>
                  <small>NOW</small>
                  <h3>Development infrastructure</h3>
                  <p>Testnet, API, SDK, sandbox and observability.</p>
                </div>
              </div>

              <div className="apx-roadmap-item">
                <span>02</span>
                <div>
                  <small>BUILDING</small>
                  <h3>Protocol primitives</h3>
                  <p>Identity, policy-aware execution and economic primitives.</p>
                </div>
              </div>

              <div className="apx-roadmap-item">
                <span>03</span>
                <div>
                  <small>RESEARCH</small>
                  <h3>Native network architecture</h3>
                  <p>State, consensus and network-level execution research.</p>
                </div>
              </div>

              <div className="apx-roadmap-item">
                <span>04</span>
                <div>
                  <small>FUTURE</small>
                  <h3>Autonomous economy</h3>
                  <p>Broader machine-to-machine coordination and execution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHITEPAPER */}
      <section className="apx-section apx-whitepaper">
        <div className="apx-container">
          <div className="apx-whitepaper-card">
            <div className="apx-whitepaper-mark">
              <FileText />
            </div>

            <div>
              <SectionLabel index="10">TECHNICAL REFERENCE</SectionLabel>
              <h2>Read the protocol.</h2>
              <p>
                Architecture, execution model, economics, security, network
                direction and future development are documented in the canonical
                Apraxus whitepaper.
              </p>
            </div>

            <Link href="/whitepaper" className="apx-button-secondary">
              Read Whitepaper
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="apx-final">
        <div className="apx-final-grid" />

        <div className="apx-container apx-final-inner">
          <div className="apx-final-mark">
            <span />
            <span />
            <span />
          </div>

          <div className="apx-kicker">APRAXUS / PROTOCOL INFRASTRUCTURE</div>

          <h2 className="apx-final-title">
            The next generation of software
            <span>will not only think.</span>
          </h2>

          <p>
            It will act. The infrastructure beneath that transition is being
            built one verifiable layer at a time.
          </p>

          <div className="apx-hero-actions">
            <Link href="/developers" className="apx-button-primary apx-button-large">
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link href="/whitepaper" className="apx-button-secondary apx-button-large">
              Read the Protocol
              <FileText className="h-4 w-4" />
            </Link>
          </div>

          <div className="apx-final-status">
            <span><i /> PROTOCOL DEVELOPMENT</span>
            <span>APXS / TESTNET</span>
            <span>ARBITRUM SEPOLIA</span>
          </div>
        </div>
      </section>
    </main>
  );
}
