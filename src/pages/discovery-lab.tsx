import type { CSSProperties } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const alliance = [
  {
    name: "Ceto Interactive",
    role: "Environmental Intelligence",
    description:
      "Environmental consulting, GIS, and field technology — turning site data into assessments that hold up under review.",
  },
  {
    name: "Lithic Earth",
    role: "Geospatial + Geophysics",
    description:
      "Multi-source geospatial intelligence, LiDAR, archaeology, geology, GPR, and subsurface investigation.",
  },
  {
    name: "Astarte Works",
    role: "Technology + Innovation",
    description:
      "Systems integration, instrumentation, and the research tooling that keeps field data usable after the field.",
  },
];

// Logos live here and nowhere else on the page.
const railPartners = [
  { name: "Ceto Interactive", logo: "/images/partners/ceto-interactive.png" },
  { name: "Astarte Works", logo: "/images/partners/astarte-works.png" },
  { name: "Lithic Earth", logo: null },
];

const capabilities = [
  {
    title: "Environmental Intelligence",
    description:
      "Field observations, spatial data, and remote sensing, reconciled into one picture of a site.",
    tags: ["GIS", "Spatial analysis", "Decision support"],
  },
  {
    title: "Aerial Systems",
    description:
      "Uncrewed aircraft and calibrated sensors documenting terrain, canopy, and water at centimeter scale.",
    tags: ["UAS", "LiDAR", "Thermal", "Multispectral"],
  },
  {
    title: "Surface + Subsurface",
    description:
      "Reading what sits below ground without digging it up — utilities, features, stratigraphy, voids.",
    tags: ["GPR", "Geophysics", "Archaeology"],
  },
  {
    title: "Long-Term Monitoring",
    description:
      "Repeatable survey methods that measure change in water, habitat, and wildlife across seasons.",
    tags: ["Water", "Wetlands", "Wildlife", "Sensors"],
  },
];

const instrumentGroups = [
  {
    domain: "Airborne",
    note: "Collected from above the canopy",
    items: ["UAS", "LiDAR", "Thermal", "Multispectral"],
  },
  {
    domain: "Subsurface",
    note: "Collected without excavation",
    items: ["GPR", "Magnetometry", "Environmental sensors"],
  },
  {
    domain: "Position + Analysis",
    note: "Where it is, and what it means",
    items: ["GNSS", "Photogrammetry", "3D modeling", "GIS", "Remote sensing"],
  },
];

const method = [
  {
    step: "01",
    title: "Investigate",
    text: "Define the environmental question, then assemble only the instruments that can answer it.",
  },
  {
    step: "02",
    title: "Deploy",
    text: "Run the survey in real conditions — heat, mud, wind, and access limits included.",
  },
  {
    step: "03",
    title: "Translate",
    text: "Reduce the data to findings a partner can act on, with the uncertainty stated plainly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Signature: deterministic topographic contour field                 */
/* ------------------------------------------------------------------ */

function contourRing(cx: number, cy: number, r: number, seed: number) {
  const steps = 96;
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const warp =
      Math.sin(a * 3 + seed) * 0.07 +
      Math.sin(a * 5 + seed * 1.7) * 0.035 +
      Math.sin(a * 2 + seed * 0.55) * 0.055;
    const rr = r * (1 + warp);
    pts.push(
      `${(cx + Math.cos(a) * rr * 1.42).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`
    );
  }
  return `M${pts.join("L")}Z`;
}

function ContourField() {
  const domes = [
    { cx: 1010, cy: 230, rings: 16, base: 24, gap: 26, seed: 0.8 },
    { cx: 170, cy: 700, rings: 11, base: 22, gap: 29, seed: 2.9 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1280 820"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {domes.map((d, di) =>
        Array.from({ length: d.rings }).map((_, i) => {
          const index = i % 5 === 4; // index contour, drawn heavier
          return (
            <path
              key={`${di}-${i}`}
              d={contourRing(d.cx, d.cy, d.base + i * d.gap, d.seed + i * 0.19)}
              fill="none"
              stroke="var(--brass)"
              strokeWidth={index ? 1.1 : 0.6}
              opacity={(1 - i / (d.rings + 3)) * (index ? 0.45 : 0.24)}
            />
          );
        })
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DiscoveryLab() {
  return (
    <>
      <Head>
        <title>Discovery Lab | The Blue Duck Foundation</title>
        <meta
          name="description"
          content="The Blue Duck Discovery Lab is a nonprofit environmental technology field laboratory advancing conservation through geospatial intelligence, research, and real-world deployment."
        />
      </Head>

      <div
        className="dl-root min-h-screen"
        style={
          {
            "--abyss": "#071417",
            "--depth": "#0B1D22",
            "--shoal": "#12303A",
            "--bone": "#E6E3D9",
            "--sand": "#D8D3C4",
            "--brass": "#C4A05A",
            "--brass-hi": "#E3CB93",
            "--brass-ink": "#7A6027",
            "--stone": "#5B6462",

            /* one type scale, used everywhere */
            "--t-hero": "clamp(2.6rem, 6.4vw, 5.5rem)",
            "--t-h2": "clamp(1.9rem, 3.3vw, 2.9rem)",
            "--t-name": "clamp(1.5rem, 2.4vw, 2.2rem)",
            "--t-h3": "clamp(1.25rem, 1.7vw, 1.55rem)",

            "--font-display":
              '"Instrument Serif", "Newsreader", "Cormorant Garamond", Georgia, serif',
            "--font-mono": '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
          } as CSSProperties
        }
      >
        <Header />

        <main className="bg-[var(--abyss)] text-[var(--bone)]">
          {/* ---------------------------------------------------------- */}
          {/* Hero                                                        */}
          {/* ---------------------------------------------------------- */}
          <section className="relative isolate overflow-hidden">
            <ContourField />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_5%,rgba(18,48,58,0.5),transparent_62%)]"
            />

            <div className="dl-wrap relative flex min-h-[86vh] flex-col pb-10 pt-28 lg:pb-12 lg:pt-32">
              <p className="dl-label flex items-center gap-4 text-[var(--brass)]">
                <span className="h-px w-10 bg-[var(--brass)]/70" />
                Blue Duck Discovery Lab
              </p>

              <h1 className="dl-display mt-7 max-w-[15ch] text-[length:var(--t-hero)] leading-[0.9]">
                Ground truth,
                <span className="block text-[var(--brass-hi)]">
                  at landscape scale.
                </span>
              </h1>

              <div className="mt-10 grid gap-8 border-t border-[var(--bone)]/15 pt-8 lg:grid-cols-[auto_minmax(0,42rem)] lg:gap-20">
                <p className="dl-label whitespace-nowrap text-[var(--bone)]/40">
                  Research · Technology · Conservation
                </p>

                <div>
                  <p className="text-[1.0625rem] leading-relaxed text-[var(--bone)]/80 sm:text-lg">
                    A nonprofit environmental field laboratory. We fly, scan, and
                    survey working land and wetlands, then turn what the
                    instruments record into decisions conservation partners can
                    act on.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="dl-btn dl-btn-solid">
                      Partner with the lab
                    </Link>
                    <a href="#capabilities" className="dl-btn dl-btn-ghost">
                      See what we measure
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-10 gap-y-2 pt-14">
                {["501(c)(3) nonprofit", "McKinney, Texas", "Central Flyway"].map(
                  (item) => (
                    <p key={item} className="dl-mono text-[var(--bone)]/30">
                      {item}
                    </p>
                  )
                )}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Partner rail — logos only                                   */}
          {/* ---------------------------------------------------------- */}
          <section
            aria-label="Discovery Alliance partners"
            className="dl-rail-wrap overflow-hidden border-y border-[var(--bone)]/10 bg-[var(--depth)] py-7"
          >
            <div className="dl-rail flex w-max items-center">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center"
                >
                  {railPartners.map((partner) => (
                    <RailItem key={partner.name} {...partner} />
                  ))}
                  <span className="mx-10 h-[3px] w-[3px] rounded-full bg-[var(--brass)]/70" />
                  <p className="dl-label whitespace-nowrap text-[var(--bone)]/30">
                    Discovery Alliance
                  </p>
                  <span className="mx-10 h-[3px] w-[3px] rounded-full bg-[var(--brass)]/70" />
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Philosophy — full-measure statement, no side gutter          */}
          {/* ---------------------------------------------------------- */}
          <section className="bg-[var(--abyss)]">
            <div className="dl-wrap py-20 lg:py-24">
              <p className="dl-label text-[var(--brass)]">Research posture</p>

              <h2 className="dl-display mt-6 max-w-[22ch] text-[length:var(--t-h2)] leading-[1.02]">
                Better decisions begin with better data.
              </h2>

              <div className="mt-10 grid max-w-5xl gap-8 border-t border-[var(--bone)]/15 pt-8 text-[var(--bone)]/70 md:grid-cols-2 md:gap-14">
                <p className="leading-relaxed">
                  No single sensor tells the whole story. We combine
                  environmental science, geophysics, and airborne survey so the
                  patterns that only appear across datasets have somewhere to
                  show up.
                </p>
                <p className="leading-relaxed">
                  Every method we publish has been run in real landscapes, under
                  real conditions, against a real conservation question — not on
                  a demo plot.
                </p>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* LIGHT CHAPTER — alliance + capabilities share one surface    */}
          {/* ---------------------------------------------------------- */}
          <div className="bg-[var(--bone)] text-[var(--abyss)]">
            {/* Alliance — index table, names not logos */}
            <section className="dl-wrap pb-16 pt-20 lg:pb-20 lg:pt-24">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="dl-label text-[var(--brass-ink)]">
                    Discovery Alliance
                  </p>
                  <h2 className="dl-display mt-6 max-w-[20ch] text-[length:var(--t-h2)] leading-[1.02]">
                    Built through collaboration. Proven in the field.
                  </h2>
                </div>
                <p className="max-w-sm text-[0.9375rem] leading-relaxed text-[var(--stone)]">
                  Three organizations, one shared field program. Each brings a
                  discipline the others depend on.
                </p>
              </div>

              <div className="mt-12 border-t border-[var(--abyss)]/15">
                {alliance.map((member) => (
                  <article
                    key={member.name}
                    className="dl-member group grid gap-3 border-b border-[var(--abyss)]/12 py-8 lg:grid-cols-[1fr_0.8fr_1.2fr] lg:items-start lg:gap-10 lg:py-9"
                  >
                    <h3 className="dl-display dl-member-name text-[length:var(--t-name)] leading-[1.1]">
                      {member.name}
                    </h3>

                    <p className="dl-label pt-1 text-[var(--brass-ink)] lg:pt-2">
                      {member.role}
                    </p>

                    <p className="max-w-lg text-[0.9375rem] leading-relaxed text-[var(--stone)]">
                      {member.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Capabilities — 2×2 grid, different rhythm from the rows above */}
            <section
              id="capabilities"
              className="dl-wrap scroll-mt-24 pb-20 pt-16 lg:pb-24 lg:pt-20"
            >
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="dl-label text-[var(--brass-ink)]">
                    Core capabilities
                  </p>
                  <h2 className="dl-display mt-6 max-w-[16ch] text-[length:var(--t-h2)] leading-[1.02]">
                    From observation to understanding.
                  </h2>
                </div>
                <p className="max-w-sm text-[0.9375rem] leading-relaxed text-[var(--stone)]">
                  Four practices that overlap on most sites. We rarely run one
                  without the others.
                </p>
              </div>

              <div className="mt-12 grid gap-px bg-[var(--abyss)]/15 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <article
                    key={capability.title}
                    className="dl-cap group bg-[var(--bone)] p-7 lg:p-9"
                  >
                    <h3 className="dl-display dl-cap-title text-[length:var(--t-h3)] leading-tight">
                      {capability.title}
                    </h3>

                    <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--stone)]">
                      {capability.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {capability.tags.map((tag) => (
                        <span key={tag} className="dl-mono text-[var(--brass-ink)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Instruments — spec sheet                                    */}
          {/* ---------------------------------------------------------- */}
          <section className="bg-[var(--abyss)]">
            <div className="dl-wrap py-20 lg:py-24">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="dl-label text-[var(--brass)]">Instruments</p>
                  <h2 className="dl-display mt-6 max-w-[14ch] text-[length:var(--t-h2)] leading-[1.02]">
                    One landscape, read three ways.
                  </h2>
                </div>
              </div>

              <div className="mt-12 border-t border-[var(--bone)]/15">
                {instrumentGroups.map((group) => (
                  <div
                    key={group.domain}
                    className="grid gap-3 border-b border-[var(--bone)]/15 py-7 lg:grid-cols-[0.9fr_1.6fr] lg:items-start lg:gap-10 lg:py-8"
                  >
                    <div>
                      <h3 className="dl-display text-[length:var(--t-h3)] leading-tight">
                        {group.domain}
                      </h3>
                      <p className="dl-mono mt-2 text-[var(--bone)]/30">
                        {group.note}
                      </p>
                    </div>

                    <ul className="flex flex-wrap content-start gap-x-7 gap-y-2 pt-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-[0.9375rem] text-[var(--bone)]/75 transition-colors hover:text-[var(--brass-hi)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Method                                                      */}
          {/* ---------------------------------------------------------- */}
          <section className="border-t border-[var(--bone)]/10 bg-[var(--depth)]">
            <div className="dl-wrap py-20 lg:py-24">
              <p className="dl-label text-[var(--brass)]">How a project runs</p>
              <h2 className="dl-display mt-6 max-w-[20ch] text-[length:var(--t-h2)] leading-[1.02]">
                Research designed for real-world deployment.
              </h2>

              <ol className="mt-12 grid gap-px bg-[var(--bone)]/15 sm:grid-cols-3">
                {method.map((step) => (
                  <li key={step.step} className="bg-[var(--depth)] p-7 lg:p-8">
                    <p className="dl-mono text-[var(--brass)]">{step.step}</p>
                    <h3 className="dl-display mt-8 text-[length:var(--t-h3)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--bone)]/65">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* CTA                                                         */}
          {/* ---------------------------------------------------------- */}
          <section className="bg-[var(--sand)] text-[var(--abyss)]">
            <div className="dl-wrap py-20 lg:py-24">
              <p className="dl-label text-[var(--brass-ink)]">Collaborate</p>

              <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-20">
                <h2 className="dl-display max-w-[18ch] text-[length:var(--t-h2)] leading-[1.02]">
                  Bring the next environmental question into the field.
                </h2>

                <div>
                  <p className="max-w-md text-[0.9375rem] leading-relaxed text-[var(--stone)]">
                    We work with conservation organizations, agencies,
                    landowners, researchers, and technology developers. Tell us
                    the site and the question.
                  </p>

                  <Link href="/contact" className="dl-btn dl-btn-dark mt-7">
                    Start a conversation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx global>{`
        /* ---- shared container: one source of truth for gutters ---- */
        .dl-root .dl-wrap {
          margin-inline: auto;
          max-width: 78rem;
          padding-inline: 1.5rem;
        }
        @media (min-width: 1024px) {
          .dl-root .dl-wrap {
            padding-inline: 2.5rem;
          }
        }

        /* ---- type roles ---- */
        .dl-root .dl-display {
          font-family: var(--font-display);
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .dl-root .dl-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          line-height: 1.4;
        }

        .dl-root .dl-mono {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          line-height: 1.4;
        }

        /* ---- buttons ---- */
        .dl-root .dl-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.95rem 2rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          transition: background-color 0.25s ease, color 0.25s ease,
            border-color 0.25s ease;
        }
        .dl-root .dl-btn:focus-visible {
          outline: 2px solid var(--brass);
          outline-offset: 3px;
        }
        .dl-root .dl-btn-solid {
          background: var(--brass);
          color: var(--abyss);
        }
        .dl-root .dl-btn-solid:hover {
          background: var(--brass-hi);
        }
        .dl-root .dl-btn-ghost {
          border: 1px solid rgba(230, 227, 217, 0.28);
          color: var(--bone);
        }
        .dl-root .dl-btn-ghost:hover {
          border-color: var(--brass);
          color: var(--brass-hi);
        }
        .dl-root .dl-btn-dark {
          background: var(--abyss);
          color: var(--bone);
        }
        .dl-root .dl-btn-dark:hover {
          background: var(--shoal);
        }

        /* ---- partner rail ---- */
        .dl-root .dl-rail-wrap {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 10%,
            #000 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 10%,
            #000 90%,
            transparent
          );
        }
        .dl-root .dl-rail {
          animation: dl-marquee 42s linear infinite;
        }
        .dl-root .dl-rail-wrap:hover .dl-rail {
          animation-play-state: paused;
        }
        @keyframes dl-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Knocks the white box out of logo PNGs on the dark rail:
           invert makes the artwork light on black, screen drops the black. */
        .dl-root .dl-logo {
          filter: grayscale(1) invert(1) brightness(1.15) contrast(1.05);
          mix-blend-mode: screen;
          opacity: 0.55;
          transition: opacity 0.3s ease;
        }
        .dl-root .dl-rail-item:hover .dl-logo {
          opacity: 1;
        }

        /* ---- hover micro-interactions ---- */
        .dl-root .dl-member-name,
        .dl-root .dl-cap-title {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            color 0.35s ease;
        }
        .dl-root .dl-member:hover .dl-member-name,
        .dl-root .dl-cap:hover .dl-cap-title {
          transform: translateX(0.4rem);
          color: var(--brass-ink);
        }

        @media (prefers-reduced-motion: reduce) {
          .dl-root .dl-rail {
            animation: none;
          }
          .dl-root .dl-member-name,
          .dl-root .dl-cap-title,
          .dl-root .dl-btn,
          .dl-root .dl-logo {
            transition: none;
          }
          .dl-root .dl-member:hover .dl-member-name,
          .dl-root .dl-cap:hover .dl-cap-title {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Rail item                                                          */
/* ------------------------------------------------------------------ */

function RailItem({ logo, name }: { logo: string | null; name: string }) {
  return (
    <div className="dl-rail-item mx-10 flex min-w-[180px] items-center justify-center lg:mx-14">
      {logo ? (
        <div className="dl-logo relative h-9 w-36">
          <Image
            src={logo}
            alt={name}
            fill
            sizes="144px"
            className="object-contain"
          />
        </div>
      ) : (
        <p
          className="dl-display whitespace-nowrap text-2xl text-[var(--bone)]/55"
          aria-label={name}
        >
          {name}
        </p>
      )}
    </div>
  );
}
