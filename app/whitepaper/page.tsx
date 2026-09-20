import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-static";

export const metadata = {
  title: "Whitepaper — Apraxus",
  description:
    "Canonical protocol specification for Apraxus — Infrastructure for the Autonomous Economy.",
};

type Heading = {
  id: string;
  title: string;
  level: 2 | 3;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanHeading(value: string) {
  return value
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

function extractHeadings(markdown: string): Heading[] {
  const result: Heading[] = [];
  const used = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const title = cleanHeading(match[2]);

    const baseId = slugify(title);
    const count = used.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    used.set(baseId, count + 1);
    result.push({ id, title, level });
  }

  return result;
}

function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "live" | "development" | "future" | "neutral";
}) {
  const styles = {
    live: "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-300",
    development:
      "border-amber-400/15 bg-amber-400/[0.05] text-amber-300",
    future: "border-purple-400/15 bg-purple-400/[0.06] text-purple-300",
    neutral: "border-white/10 bg-white/[0.025] text-white/45",
  };

  const dot = {
    live: "bg-emerald-400",
    development: "bg-amber-400",
    future: "bg-purple-400",
    neutral: "bg-white/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] ${styles[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[tone]}`} />
      {children}
    </span>
  );
}

export default function WhitepaperPage() {
  const filePath = path.join(process.cwd(), "content", "whitepaper.md");
  const source = fs.readFileSync(filePath, "utf8");

  const content = source
    .replace(/^# APRAXUS\s*\n+/i, "")
    .replace(/^## Infrastructure for the Autonomous Economy\.\s*\n+/i, "");

  const headings = extractHeadings(content);

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[-260px] h-[560px] w-[560px] rounded-full bg-purple-600/[0.07] blur-[150px]" />
          <div className="absolute right-[-160px] top-[80px] h-[420px] w-[420px] rounded-full bg-blue-500/[0.035] blur-[140px]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 pb-16 pt-28 sm:px-10 lg:px-14">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge tone="neutral">Canonical Protocol Document</StatusBadge>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/20">/</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
              Version 1.0
            </span>
          </div>

          <div className="mt-8 grid gap-14 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/30">
                APRAXUS / WHITEPAPER
              </div>

              <h1 className="mt-5 max-w-5xl text-[46px] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[62px] lg:text-[76px]">
                Infrastructure for the
                <span className="block text-white/35">Autonomous Economy.</span>
              </h1>

              <p className="mt-8 max-w-3xl text-[15px] leading-8 text-white/50 sm:text-[17px]">
                The canonical technical document describing the Apraxus protocol
                model, autonomous software infrastructure, economic execution
                primitives, current testnet implementation, security architecture,
                and future network design.
              </p>
            </div>

            <div className="border-l border-white/[0.09] pl-7">
              <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">
                Document information
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="text-xs text-white/25">Status</div>
                  <div className="mt-1 text-sm text-emerald-300/80">
                    Development / Testnet
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/25">Current network</div>
                  <div className="mt-1 text-sm text-white/75">Arbitrum Sepolia</div>
                </div>
                <div>
                  <div className="text-xs text-white/25">Protocol API</div>
                  <div className="mt-1 text-sm font-mono text-white/65">v1</div>
                </div>
                <div>
                  <div className="text-xs text-white/25">Publication</div>
                  <div className="mt-1 text-sm text-white/75">September 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATUS STRIP */}
      <section className="border-b border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 sm:px-10 lg:px-14">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live / verified
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Development
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            Future / research
          </div>
          <div className="ml-auto hidden text-[10px] font-mono uppercase tracking-[0.16em] text-white/20 md:block">
            Canonical technical reference
          </div>
        </div>
      </section>

      {/* READING GUIDE */}
      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-10 lg:px-14">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-400/[0.10] bg-emerald-400/[0.025] p-5">
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-300/65">
                01 / Verified
              </div>
              <p className="mt-3 text-xs leading-6 text-white/45">
                Functionality currently deployed or directly verifiable in the
                public development and testnet environment.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/[0.10] bg-amber-400/[0.02] p-5">
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-amber-300/65">
                02 / Development
              </div>
              <p className="mt-3 text-xs leading-6 text-white/45">
                Prototype or engineering work that is not yet a production
                protocol guarantee.
              </p>
            </div>
            <div className="rounded-2xl border border-purple-400/[0.10] bg-purple-400/[0.025] p-5">
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-purple-300/65">
                03 / Future
              </div>
              <p className="mt-3 text-xs leading-6 text-white/45">
                Proposed architecture, research direction, or future
                Apraxus-owned network capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT */}
      <section className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid lg:grid-cols-[270px_minmax(0,860px)] lg:gap-16">

          {/* DESKTOP CONTENTS */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 py-12">
              <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090b10]/90 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">
                      Document
                    </div>
                    <div className="mt-1 text-xs font-medium text-white/75">
                      Contents
                    </div>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  </div>
                </div>

                <nav className="max-h-[calc(100vh-190px)] overflow-y-auto overscroll-contain px-2 py-3">
                  {headings.map((heading, index) => (
                    <a
                      key={`${heading.id}-${index}`}
                      href={`#${heading.id}`}
                      className={[
                        "group flex items-start gap-3 rounded-lg px-3 py-2 transition-all",
                        "hover:bg-white/[0.045]",
                        heading.level === 2
                          ? "text-[11px] text-white/55 hover:text-white"
                          : "ml-3 text-[10px] text-white/25 hover:text-white/60",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-0.5 shrink-0 font-mono text-[9px]",
                          heading.level === 2
                            ? "text-white/25 group-hover:text-purple-300"
                            : "text-white/10",
                        ].join(" ")}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-5">{heading.title}</span>
                    </a>
                  ))}
                </nav>

                <div className="border-t border-white/[0.07] px-5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase tracking-[0.16em] text-white/20">
                      Protocol Whitepaper
                    </span>
                    <span className="text-[9px] font-mono text-white/20">v1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MOBILE CONTENTS */}
          <div className="lg:hidden">
            <div className="py-6">
              <details className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.018]">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                    Table of contents
                  </span>
                  <span className="text-white/30 transition group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-white/[0.07] px-5 py-4">
                  <nav className="grid gap-1">
                    {headings.map((heading, index) => (
                      <a
                        key={`${heading.id}-mobile-${index}`}
                        href={`#${heading.id}`}
                        className={`py-2 text-xs transition hover:text-white ${
                          heading.level === 2
                            ? "text-white/50"
                            : "pl-4 text-white/30"
                        }`}
                      >
                        <span className="mr-3 font-mono text-[9px] text-white/15">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {heading.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </details>
            </div>
          </div>

          {/* PAPER */}
          <article className="min-w-0 pb-24 pt-4 sm:pt-8 lg:pt-12">
            <div
              className="
                max-w-none
                [&_h1]:mb-10
                [&_h1]:text-4xl
                [&_h1]:font-semibold
                [&_h1]:tracking-[-0.04em]

                [&_h2]:mt-24
                [&_h2]:scroll-mt-28
                [&_h2]:border-t
                [&_h2]:border-white/[0.08]
                [&_h2]:pt-9
                [&_h2]:text-2xl
                [&_h2]:font-semibold
                [&_h2]:tracking-[-0.03em]
                [&_h2]:text-white
                sm:[&_h2]:text-3xl

                [&_h3]:mt-14
                [&_h3]:mb-5
                [&_h3]:scroll-mt-28
                [&_h3]:text-lg
                [&_h3]:font-semibold
                [&_h3]:tracking-[-0.015em]
                [&_h3]:text-white/90

                [&_h4]:mt-10
                [&_h4]:mb-4
                [&_h4]:text-sm
                [&_h4]:font-semibold
                [&_h4]:uppercase
                [&_h4]:tracking-[0.03em]
                [&_h4]:text-white/70

                [&_p]:mb-7
                [&_p]:text-[15px]
                [&_p]:leading-[1.95]
                [&_p]:text-white/55

                [&_strong]:font-semibold
                [&_strong]:text-white/85
                [&_em]:text-white/60

                [&_ul]:mb-8
                [&_ul]:ml-5
                [&_ul]:list-disc
                [&_ul]:space-y-2.5
                [&_ul]:text-[15px]
                [&_ul]:leading-7
                [&_ul]:text-white/55

                [&_ol]:mb-8
                [&_ol]:ml-5
                [&_ol]:list-decimal
                [&_ol]:space-y-2.5
                [&_ol]:text-[15px]
                [&_ol]:leading-7
                [&_ol]:text-white/55

                [&_li]:pl-1

                [&_blockquote]:my-10
                [&_blockquote]:rounded-r-2xl
                [&_blockquote]:border-l-2
                [&_blockquote]:border-purple-400/40
                [&_blockquote]:bg-white/[0.018]
                [&_blockquote]:px-6
                [&_blockquote]:py-5
                [&_blockquote]:text-[14px]
                [&_blockquote]:leading-7
                [&_blockquote]:text-white/45

                [&_hr]:my-16
                [&_hr]:border-white/[0.08]

                [&_table]:my-10
                [&_table]:w-full
                [&_table]:border-collapse
                [&_table]:border
                [&_table]:border-white/[0.08]
                [&_table]:text-left

                [&_thead]:bg-white/[0.025]

                [&_th]:border-b
                [&_th]:border-white/[0.09]
                [&_th]:px-4
                [&_th]:py-3
                [&_th]:text-[9px]
                [&_th]:font-mono
                [&_th]:uppercase
                [&_th]:tracking-[0.15em]
                [&_th]:text-white/40

                [&_td]:border-b
                [&_td]:border-white/[0.06]
                [&_td]:px-4
                [&_td]:py-4
                [&_td]:text-xs
                [&_td]:leading-6
                [&_td]:text-white/45

                [&_tr:last-child_td]:border-b-0

                [&_pre]:my-10
                [&_pre]:max-w-full
                [&_pre]:overflow-x-auto
                [&_pre]:rounded-2xl
                [&_pre]:border
                [&_pre]:border-white/[0.08]
                [&_pre]:bg-[#08090d]
                [&_pre]:p-6
                [&_pre]:font-mono
                [&_pre]:text-[12px]
                [&_pre]:leading-6
                [&_pre]:text-white/70

                [&_p>code]:rounded-md
                [&_p>code]:border
                [&_p>code]:border-white/[0.08]
                [&_p>code]:bg-white/[0.04]
                [&_p>code]:px-1.5
                [&_p>code]:py-0.5
                [&_p>code]:font-mono
                [&_p>code]:text-[12px]
                [&_p>code]:text-purple-200

                [&_a]:text-purple-300
                [&_a]:underline
                [&_a]:decoration-purple-300/20
                [&_a]:underline-offset-4
                [&_a]:transition
                [&_a:hover]:text-white
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    const id = slugify(String(children));
                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const id = slugify(String(children));
                    return (
                      <h3 id={id} {...props}>
                        {children}
                      </h3>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
