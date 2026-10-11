import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Command,
  Fingerprint,
  Globe2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apraxus Browser — A More Intelligent Way to Browse',
  description:
    'Discover Apraxus Browser: a desktop browsing experience being built around intelligent search, user control, and the Apraxus ecosystem.',
  openGraph: {
    title: 'Apraxus Browser',
    description:
      'A more considered browsing experience. Intelligent by design, with user control at its core.',
    type: 'website',
  },
};

const features = [
  {
    number: '01',
    icon: Globe2,
    title: 'Browsing, without the noise',
    description:
      'A familiar desktop browsing experience designed around the essentials: navigation, tabs, search, and a focused workspace.',
    status: 'CORE EXPERIENCE',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI, where it belongs',
    description:
      'An evolving AI-assisted search experience designed to help you explore information without getting in the way of the web.',
    status: 'IN DEVELOPMENT',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Control comes first',
    description:
      'A security-conscious product direction that prioritises transparent controls and careful handling of browsing activity.',
    status: 'EVOLVING',
  },
  {
    number: '04',
    icon: Wallet,
    title: 'Connected to Apraxus',
    description:
      'Wallet, payments, and agent-driven workflows are part of the broader vision—not features being presented as production-ready today.',
    status: 'PLANNED',
  },
];

const principles = [
  {
    icon: Fingerprint,
    title: 'User-directed',
    text: 'Browsing should follow your intent, not take control away from you.',
  },
  {
    icon: LockKeyhole,
    title: 'Security-conscious',
    text: 'Sensitive actions deserve clear boundaries and deliberate consent.',
  },
  {
    icon: Bot,
    title: 'Agent-ready vision',
    text: 'A foundation for exploring how people, software, and the web can work together.',
  },
];

export default function BrowserPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#050507] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(123,92,250,0.19), transparent 57%), linear-gradient(180deg, rgba(15,13,25,0.4), transparent 75%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'linear-gradient(to bottom, black, transparent 72%)',
        }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.06] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-violet-200 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
            Introducing Apraxus Browser
          </div>

          <h1 className="text-balance text-5xl font-medium leading-[1.04] tracking-[-0.065em] sm:text-7xl lg:text-[92px]">
            The web, with
            <br />
            <span className="bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
              more intention.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-400 sm:mt-9 sm:text-lg sm:leading-9">
            A desktop browser built around a simple idea: browsing should feel
            effortless, intelligence should be useful, and you should remain
            in control.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#availability"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-violet-100"
            >
              Explore the browser
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/technology"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Explore Apraxus
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:mt-20 sm:gap-x-10">
            <span className="inline-flex items-center gap-2">
              <Command className="h-3.5 w-3.5" />
              Desktop-first
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              AI-assisted vision
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              User control
            </span>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-24">
          <div className="overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#0b0b10] shadow-[0_40px_120px_rgba(0,0,0,0.55),0_0_80px_rgba(123,92,250,0.08)] sm:rounded-[30px]">
            <div className="flex h-12 items-center gap-2 border-b border-white/[0.07] bg-white/[0.025] px-4 sm:h-14 sm:px-6">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6259]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffc04d]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#38c979]/80" />
              <div className="ml-3 flex h-7 min-w-0 flex-1 items-center justify-center rounded-lg border border-white/[0.07] bg-black/30 px-3 text-[10px] text-zinc-500 sm:mx-auto sm:max-w-md sm:text-xs">
                <LockKeyhole className="mr-2 h-3 w-3 shrink-0 text-zinc-600" />
                <span className="truncate">Your browsing workspace</span>
              </div>
              <span className="hidden text-[10px] text-zinc-600 sm:block">
                APRAXUS
              </span>
            </div>

            <div className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden px-5 py-14 sm:min-h-[390px] sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.12] blur-[90px] sm:h-96 sm:w-96"
              />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/[0.08] shadow-[0_0_50px_rgba(123,92,250,0.12)] sm:h-16 sm:w-16">
                <Globe2 className="h-7 w-7 text-violet-200 sm:h-8 sm:w-8" />
              </div>

              <p className="relative mt-6 text-xs font-medium uppercase tracking-[0.28em] text-violet-200/70">
                Apraxus Browser
              </p>

              <p className="relative mt-3 text-center text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
                Make room for what matters.
              </p>

              <div className="relative mt-7 flex w-full max-w-lg items-center gap-3 rounded-2xl border border-white/[0.11] bg-white/[0.035] px-4 py-3.5 shadow-xl sm:px-5 sm:py-4">
                <Sparkles className="h-4 w-4 shrink-0 text-violet-300" />
                <span className="min-w-0 flex-1 truncate text-sm text-zinc-500">
                  Search the web or enter an address
                </span>
                <span className="hidden rounded-md border border-white/10 px-2 py-1 text-[10px] text-zinc-600 sm:block">
                  ENTER
                </span>
              </div>

              <div className="relative mt-6 flex flex-wrap justify-center gap-2">
                {['Focused browsing', 'Intelligent tools', 'Your workflow'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 text-[10px] text-zinc-500"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>

              <p className="relative mt-8 text-center text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                Product direction preview · Not a live browser window
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="availability"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"
      >
        <div className="grid gap-5 border-t border-white/[0.09] pt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.018] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/20 hover:bg-violet-300/[0.025] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-600">
                    {feature.number}
                  </span>
                  <Icon className="h-5 w-5 text-violet-300/80 transition group-hover:text-violet-200" />
                </div>

                <h2 className="mt-9 text-xl font-medium tracking-[-0.035em] text-zinc-100">
                  {feature.title}
                </h2>

                <p className="mt-3 min-h-[96px] text-sm leading-7 text-zinc-500">
                  {feature.description}
                </p>

                <div className="mt-6 border-t border-white/[0.07] pt-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-zinc-600">
                    {feature.status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12 lg:py-28">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-violet-300">
              The principles
            </p>

            <h2 className="mt-5 max-w-lg text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-5xl">
              Useful technology.
              <br />
              <span className="text-zinc-500">Human direction.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-8 text-zinc-500 sm:text-base">
              Apraxus Browser is being developed as a standalone desktop
              experience, with a longer-term ambition to connect browsing,
              intelligence, and the autonomous economy.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="flex gap-5 py-6 first:pt-0 last:pb-0 sm:gap-6 sm:py-8"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025]">
                    <Icon className="h-5 w-5 text-violet-300" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-medium text-zinc-100 sm:text-lg">
                        {principle.title}
                      </h3>
                      <span className="font-mono text-[9px] text-zinc-700">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-sm leading-7 text-zinc-500">
                      {principle.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="relative overflow-hidden rounded-[28px] border border-violet-300/15 bg-[#0b0a11] px-6 py-12 sm:rounded-[32px] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/[0.12] blur-[90px]"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                <Zap className="h-3 w-3 text-violet-300" />
                Development update
              </div>

              <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl">
                Built deliberately.
                <br />
                <span className="text-zinc-500">Released responsibly.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-zinc-500 sm:text-base">
                Apraxus Browser v1.0.0 is available for Macs powered by Apple
                Silicon. This initial release establishes the core desktop
                browsing experience while the wider Apraxus vision continues
                to evolve.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-3 lg:min-w-[230px]">
              <a
                href="https://github.com/apraxusblockchain/apraxus-browser/releases/download/v1.0.0/Apraxus%20Browser-1.0.0-arm64.dmg"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-violet-100"
              >
                <ArrowDownToLine className="h-4 w-4" />
                Download for macOS
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className="text-center text-xs text-zinc-500">
                Version 1.0.0 · Apple Silicon (arm64) · DMG
              </span>

              <p className="text-center text-[11px] leading-5 text-zinc-600">
                This build is not signed or notarized with an Apple Developer
                ID. macOS may show a security warning when opening it.
              </p>

              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] px-5 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                Follow the roadmap
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Apraxus Browser · An evolving desktop product</span>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 transition hover:text-zinc-300"
          >
            Learn about Apraxus
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
