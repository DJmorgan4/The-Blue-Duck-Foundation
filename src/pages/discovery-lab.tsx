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
// Add a partner by adding a row. `logo: null` renders the name as a wordmark.
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
      "Repeatable survey methods that measure change in water, habitat, and wildlife across seasons and years.",
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
    { cx: 980, cy: 250, rings: 17, base: 26, gap: 27, seed: 0.8 },
    { cx: 210, cy: 690, rings: 12, base: 22, gap: 30, seed: 2.9 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1280 820"
      preserveAspectRatio="xMidYMid slice"
      className="dl-contours absolute inset-0 h-full w-full"
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
              opacity={(1 - i / (d.rings + 3)) * (index ? 0.5 : 0.28)}
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
            "--paper": "#F1EEE5",
            "--sand": "#DCD7C9",
            "--brass": "#C4A05A",
            "--brass-hi": "#E3CB93",
            "--brass-ink": "#7A6027",
            "--stone": "#5B6462",
            "--font-display":
              '"Instrument Serif", "Newsreader", "Cormorant Garamond", Georgia, serif',
            "--font-mono": '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
          } as React.CSSProperties
        }
      >
        <Header />

        <main className="bg-[var(--abyss)] text-[var(--bone)]">
          {/* ---------------------------------------------------------- */}
          {/* Hero                                                        */}
          {/* ---------------------------------------------------------- */}
          <section className="relative isolate overflow-hidden border-b border-[var(--bone)]/10">
            <ContourField />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_10%,rgba(18,48,58,0.55),transparent_60%)]"
            />

            <div className="relative mx-auto flex min-h-[92vh] max-w-[86rem] flex-col px-6 pb-14 pt-36 lg:px-10 lg:pb-16 lg:pt-48">
              <p className="dl-label flex items-center gap-4 text-[var(--brass)]">
                <span className="h-px w-10 bg-[var(--brass)]/70" />
                Blue Duck Discovery Lab
              </p>

              <h1 className="dl-display mt-10 max-w-[18ch] text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.88]">
                Ground truth,
                <span className="block text-[var(--brass-hi)]">
                  at landscape scale.
                </span>
              </h1>

              <div className="mt-14 grid gap-10 border-t border-[var(--bone)]/15 pt-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                <p className="dl-label text-[var(--bone)]/45">
                  Research · Technology · Conservation
                </p>

                <div>
                  <p className="max-w-2xl text-lg leading-relaxed text-[var(--bone)]/80 sm:text-xl">
                    A nonprofit environmental field laboratory. We fly, scan, and
                    survey working land and wetlands, then turn what the
                    instruments record into decisions conservation partners can
                    act on.
                  </p>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact" className="dl-btn dl-btn-solid">
                      Partner with the lab
                    </Link>
                    <a href="#capabilities" className="dl-btn dl-btn-ghost">
                      See what we measure
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-[var(--bone)]/10 pt-6 lg:pt-8">
                {["501(c)(3) nonprofit", "McKinney, Texas", "Central Flyway"].map(
                  (item) => (
                    <p key={item} className="dl-mono text-[var(--bone)]/35">
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
            className="dl-rail-wrap overflow-hidden border-b border-[var(--bone)]/10 bg-[var(--depth)] py-8"
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
                  <span className="mx-12 h-[3px] w-[3px] rounded-full bg-[var(--brass)]/70 lg:mx-16" />
                  <p className="dl-label whitespace-nowrap text-[var(--bone)]/35">
                    Discovery Alliance
                  </p>
                  <span className="mx-12 h-[3px] w-[3px] rounded-full bg-[var(--brass)]/70 lg:mx-16" />
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Philosophy                                                  */}
          {/* ---------------------------------------------------------- */}
          <section className="border-b border-[var(--bone)]/10 bg-[var(--abyss)]">
            <div className="mx-auto max-w-[86rem] px-6 py-24 lg:px-10 lg:py-36">
              <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
                <p className="dl-label text-[var(--brass)]">Research posture</p>

                <div>
                  <h2 className="dl-display max-w-[16ch] text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.98]">
                    Better decisions begin with better data.
                  </h2>

                  <div className="mt-12 grid gap-10 border-t border-[var(--bone)]/15 pt-10 text-[var(--bone)]/70 md:grid-cols-2">
                    <p className="leading-relaxed">
                      No single sensor tells the whole story. We combine
                      environmental science, geophysics, and airborne survey so
                      the patterns that only appear across datasets have
                      somewhere to show up.
                    </p>
                    <p className="leading-relaxed">
                      Every method we publish has been run in real landscapes,
                      under real conditions, against a real conservation
                      question — not on a demo plot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Alliance — names, not logos                                 */}
          {/* ---------------------------------------------------------- */}
          <section className="bg-[var(--bone)] text-[var(--abyss)]">
            <div className="mx-auto max-w-[86rem] px-6 py-24 lg:px-10 lg:py-36">
              <div className="grid gap-12 border-b border-[var(--abyss)]/15 pb-16 lg:grid-cols-[1fr_2.2fr] lg:gap-20 lg:pb-20">
                <p className="dl-label text-[var(--brass-ink)]">
                  Discovery Alliance
                </p>

                <div>
                  <h2 className="dl-display max-w-[15ch] text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.98]">
                    Built through collaboration. Proven in the field.
                  </h2>
                  <p className="mt-8 max-w-2xl leading-relaxed text-[var(--stone)]">
                    Three organizations, one shared field program. Each brings a
                    discipline the others depend on.
                  </p>
                </div>
              </div>

              <div>
                {alliance.map((member) => (
                  <article
                    key={member.name}
                    className="dl-member group grid gap-6 border-b border-[var(--abyss)]/12 py-12 lg:grid-cols-[1.1fr_0.7fr_1.2fr] lg:items-baseline lg:gap-12 lg:py-16"
                  >
                    <h3 className="dl-display dl-member-name text-[clamp(2.2rem,4.4vw,3.9rem)] leading-none">
                      {member.name}
                    </h3>

                    <p className="dl-label text-[var(--brass-ink)]">
                      {member.role}
                    </p>

                    <p className="max-w-lg leading-relaxed text-[var(--stone)]">
                      {member.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Capabilities                                                */}
          {/* ---------------------------------------------------------- */}
          <section
            id="capabilities"
            className="scroll-mt-24 bg-[var(--paper)] text-[var(--abyss)]"
          >
            <div className="mx-auto max-w-[86rem] px-6 py-24 lg:px-10 lg:py-36">
              <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-end">
                <div>
                  <p className="dl-label mb-6 text-[var(--brass-ink)]">
                    Core capabilities
                  </p>
                  <h2 className="dl-display text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.95]">
                    From observation to understanding.
                  </h2>
                </div>

                <p className="max-w-xl leading-relaxed text-[var(--stone)] lg:justify-self-end">
                  Four practices that overlap on most sites. We rarely run one
                  without the others.
                </p>
              </div>

              <div className="border-t border-[var(--abyss)]/15">
                {capabilities.map((capability) => (
                  <article
                    key={capability.title}
                    className="dl-cap group grid gap-6 border-b border-[var(--abyss)]/15 py-11 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-14"
                  >
                    <h3 className="dl-display dl-cap-title text-[clamp(1.9rem,3.2vw,2.9rem)] leading-tight">
                      {capability.title}
                    </h3>

                    <div>
                      <p className="max-w-xl leading-relaxed text-[var(--stone)]">
                        {capability.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                        {capability.tags.map((tag) => (
                          <span
                            key={tag}
                            className="dl-mono text-[var(--brass-ink)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Instruments                                                 */}
          {/* ---------------------------------------------------------- */}
          <section className="bg-[var(--abyss)]">
            <div className="mx-auto max-w-[86rem] px-6 py-24 lg:px-10 lg:py-36">
              <div className="grid gap-14 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
                <div>
                  <p className="dl-label mb-6 text-[var(--brass)]">Instruments</p>
                  <h2 className="dl-display max-w-[12ch] text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.95]">
                    One landscape, read three ways.
                  </h2>
                </div>

                <div className="border-t border-[var(--bone)]/15">
                  {instrumentGroups.map((group) => (
                    <div
                      key={group.domain}
                      className="grid gap-6 border-b border-[var(--bone)]/15 py-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12 lg:py-12"
                    >
                      <div>
                        <h3 className="dl-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight">
                          {group.domain}
                        </h3>
                        <p className="dl-mono mt-3 text-[var(--bone)]/35">
                          {group.note}
                        </p>
                      </div>

                      <ul className="flex flex-wrap content-start gap-x-8 gap-y-3">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="text-[var(--bone)]/80 transition-colors hover:text-[var(--brass-hi)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* Method                                                      */}
          {/* ---------------------------------------------------------- */}
          <section className="border-t border-[var(--bone)]/10 bg-[var(--depth)]">
            <div className="mx-auto max-w-[86rem] px-6 py-24 lg:px-10 lg:py-36">
              <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
                <p className="dl-label text-[var(--brass)]">How a project runs</p>

                <div>
                  <h2 className="dl-display max-w-[14ch] text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.98]">
                    Research designed for real-world deployment.
                  </h2>

                  <ol className="mt-14 grid gap-px bg-[var(--bone)]/15 sm:grid-cols-3">
                    {method.map((step) => (
                      <li key={step.step} className="bg-[var(--depth)] p-8">
                        <p className="dl-mono text-[var(--brass)]">{step.step}</p>
                        <h3 className="dl-display mt-14 text-[clamp(1.7rem,2.4vw,2.2rem)]">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[var(--bone)]/65">
                          {step.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          {/* CTA                                                         */}
          {/* ---------------------------------------------------------- */}
          <section className="bg-[var(--sand)] text-[var(--abyss)]">
            <div className="mx-auto max-w-[86rem] px-6 py-24 lg:px-10 lg:py-32">
              <p className="dl-label mb-10 text-[var(--brass-ink)]">Collaborate</p>

              <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-end lg:gap-20">
                <h2 className="dl-display max-w-[16ch] text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.92]">
                  Bring the next environmental question into the field.
                </h2>

                <div>
                  <p className="mb-8 max-w-md leading-relaxed text-[var(--stone)]">
                    We work with conservation organizations, agencies,
                    landowners, researchers, and technology developers. Tell us
                    the site and the question.
                  </p>

                  <Link href="/contact" className="dl-btn dl-btn-dark">
                    Start a conversation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx global>{`
        /* ---- type roles ---- */
        .dl-root .dl-display {
          font-family: var(--font-display);
          font-weight: 400;
          letter-spacing: -0.022em;
        }

        .dl-root .dl-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.26em;
        }

        .dl-root .dl-mono {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        /* ---- buttons ---- */
        .dl-root .dl-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.05rem 2.25rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
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
          transform: translateX(0.6rem);
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
    <div className="dl-rail-item mx-12 flex min-w-[200px] items-center justify-center lg:mx-16">
      {logo ? (
        <div className="dl-logo relative h-10 w-40">
          <Image
            src={logo}
            alt={name}
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
      ) : (
        <p
          className="dl-display whitespace-nowrap text-3xl text-[var(--bone)]/55"
          aria-label={name}
        >
          {name}
        </p>
      )}
    </div>
  );
}
