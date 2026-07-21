import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";

const capabilities = [
  {
    number: "01",
    title: "Environmental Intelligence",
    description:
      "Transforming field observations, spatial data, and remote sensing into clear environmental insight.",
    technologies: ["GIS", "Spatial analysis", "Decision support"],
  },
  {
    number: "02",
    title: "Aerial Systems",
    description:
      "Deploying uncrewed aircraft and advanced sensors to document landscapes with exceptional detail.",
    technologies: ["UAS", "LiDAR", "Thermal", "Multispectral"],
  },
  {
    number: "03",
    title: "Surface + Subsurface",
    description:
      "Investigating what exists above and below the surface without unnecessary disturbance.",
    technologies: ["GPR", "Geophysics", "Archaeology"],
  },
  {
    number: "04",
    title: "Environmental Monitoring",
    description:
      "Building repeatable systems to understand changes in water, habitat, wildlife, and ecological conditions.",
    technologies: ["Water", "Wetlands", "Wildlife", "Sensors"],
  },
];

const technologies = [
  "LiDAR",
  "GIS",
  "GNSS",
  "UAS",
  "Thermal",
  "GPR",
  "Magnetometry",
  "Multispectral",
  "Photogrammetry",
  "Remote Sensing",
  "3D Modeling",
  "Environmental Sensors",
];

export default function DiscoveryLab() {
  return (
    <>
      <Head>
        <title>Discovery Lab | The Blue Duck Foundation</title>
        <meta
          name="description"
          content="The Blue Duck Discovery Lab is an environmental technology field laboratory advancing conservation through geospatial intelligence, research, and real-world deployment."
        />
      </Head>

      <div className="min-h-screen bg-[#07111c] text-white">
        <Header />

        <main>
          {/* Hero */}
          <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-white/10">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(14,165,233,0.12),transparent_30%)]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />

            <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-6 pb-12 pt-24 lg:px-8 lg:pb-16 lg:pt-36">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px w-12 bg-emerald-300" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-emerald-200">
                    Blue Duck Discovery Lab
                  </p>
                </div>

                <h1 className="max-w-6xl font-['Cormorant_Garamond'] text-6xl font-light leading-[0.92] tracking-[-0.035em] sm:text-7xl lg:text-[7.5rem]">
                  Field intelligence
                  <span className="block italic text-emerald-200">
                    for complex landscapes.
                  </span>
                </h1>

                <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-[1fr_2fr]">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                    Research · Technology · Conservation
                  </p>

                  <div>
                    <p className="max-w-3xl text-lg font-light leading-relaxed text-slate-300 sm:text-xl">
                      A nonprofit environmental technology field laboratory
                      advancing conservation through geospatial intelligence,
                      real-world research, and collaborative deployment.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-white px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-emerald-100"
                      >
                        Partner with the Lab
                      </Link>

                      <a
                        href="#capabilities"
                        className="inline-flex items-center justify-center border border-white/25 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-white hover:bg-white/5"
                      >
                        Explore Capabilities
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 flex items-end justify-between border-t border-white/10 pt-5">
                <p className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                  Environmental intelligence in the field
                </p>
                <p className="text-[9px] uppercase tracking-[0.24em] text-slate-500">
                  Scroll to explore
                </p>
              </div>
            </div>
          </section>

          {/* Discovery Alliance marquee */}
          <section className="overflow-hidden border-b border-white/10 bg-[#091624] py-6">
            <div className="alliance-track flex w-max items-center">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  aria-hidden={group === 1}
                  className="flex shrink-0 items-center"
                >
                  <AllianceRailItem
                    logo="/images/partners/ceto-interactive.png"
                    name="Ceto Interactive"
                  />
                  <AllianceRailItem
                    logo="/images/partners/astarte-works.png"
                    name="Astarte Works"
                  />
                  <TextRailItem name="Lithic Earth" />
                  <span className="mx-10 h-1 w-1 rounded-full bg-emerald-300/70 lg:mx-16" />
                  <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-slate-500">
                    Discovery Alliance
                  </p>
                  <span className="mx-10 h-1 w-1 rounded-full bg-emerald-300/70 lg:mx-16" />
                </div>
              ))}
            </div>
          </section>

          {/* Alliance */}
          <section className="bg-[#f2f1eb] text-slate-950">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
              <div className="grid gap-12 border-b border-slate-300 pb-16 lg:grid-cols-[0.7fr_1.3fr] lg:pb-24">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-800">
                    Discovery Alliance
                  </p>
                </div>

                <div>
                  <h2 className="max-w-4xl font-['Cormorant_Garamond'] text-5xl font-light leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                    Built through collaboration.
                    <span className="block italic text-slate-500">
                      Proven in the field.
                    </span>
                  </h2>

                  <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-slate-600">
                    The Discovery Alliance connects environmental experts,
                    researchers, technologists, manufacturers, and conservation
                    organizations around meaningful field applications.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-300">
                <AllianceMember
                  logo="/images/partners/ceto-interactive.png"
                  name="Ceto Interactive"
                  role="Environmental Intelligence"
                  description="Environmental consulting, GIS, field technology, and applied environmental intelligence."
                  index="01"
                />

                <AllianceMember
                  name="Lithic Earth"
                  role="Geospatial + Geophysics"
                  description="Multi-source geospatial intelligence, LiDAR, archaeology, geology, GPR, and subsurface investigation."
                  index="02"
                />

                <AllianceMember
                  logo="/images/partners/astarte-works.png"
                  name="Astarte Works"
                  role="Technology + Innovation"
                  description="Advanced technology systems, integration, innovation, and research support."
                  index="03"
                />
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="border-b border-white/10 bg-[#07111c]">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
              <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-emerald-300">
                  Research Philosophy
                </p>

                <div>
                  <h2 className="max-w-5xl font-['Cormorant_Garamond'] text-5xl font-light leading-[1.04] sm:text-6xl lg:text-7xl">
                    Better decisions begin with
                    <span className="italic text-emerald-200"> better data.</span>
                  </h2>

                  <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 text-base font-light leading-relaxed text-slate-300 md:grid-cols-2">
                    <p>
                      We combine environmental science, geospatial technology,
                      engineering, and field operations to reveal patterns that
                      are difficult to see from any single source.
                    </p>
                    <p>
                      Our work emphasizes practical research: technologies are
                      evaluated in real landscapes, under real conditions, for
                      real conservation challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities */}
          <section
            id="capabilities"
            className="scroll-mt-20 bg-white text-slate-950"
          >
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
              <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
                <div>
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-800">
                    Core Capabilities
                  </p>
                  <h2 className="font-['Cormorant_Garamond'] text-5xl font-light leading-none sm:text-6xl">
                    From observation
                    <span className="block italic text-slate-500">
                      to understanding.
                    </span>
                  </h2>
                </div>

                <p className="max-w-xl text-base font-light leading-relaxed text-slate-600 lg:justify-self-end">
                  Integrated technologies allow us to examine landscapes from
                  multiple perspectives and build a more complete picture of
                  environmental conditions.
                </p>
              </div>

              <div className="border-t border-slate-300">
                {capabilities.map((capability) => (
                  <article
                    key={capability.number}
                    className="group grid gap-6 border-b border-slate-300 py-10 transition-colors hover:bg-slate-50 lg:grid-cols-[0.2fr_0.8fr_1fr] lg:px-5 lg:py-14"
                  >
                    <p className="text-[10px] tracking-[0.24em] text-slate-400">
                      {capability.number}
                    </p>

                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light leading-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {capability.title}
                    </h3>

                    <div>
                      <p className="max-w-xl font-light leading-relaxed text-slate-600">
                        {capability.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        {capability.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-800"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Technology */}
          <section className="bg-[#0b1724]">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
              <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                  <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-emerald-300">
                    Technology
                  </p>
                  <h2 className="font-['Cormorant_Garamond'] text-5xl font-light leading-none sm:text-6xl">
                    One landscape.
                    <span className="block italic text-emerald-200">
                      Multiple layers.
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3">
                  {technologies.map((technology, index) => (
                    <div
                      key={technology}
                      className="flex min-h-32 items-end border-b border-r border-white/10 p-5 transition-colors hover:bg-white/5 lg:min-h-40"
                    >
                      <div>
                        <p className="mb-3 text-[9px] tracking-[0.2em] text-slate-600">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="text-sm font-light tracking-wide text-slate-200">
                          {technology}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Operating model */}
          <section className="bg-[#f2f1eb] text-slate-950">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
              <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-800">
                  How We Work
                </p>

                <div>
                  <h2 className="max-w-4xl font-['Cormorant_Garamond'] text-5xl font-light leading-[1.02] sm:text-6xl">
                    Research designed for
                    <span className="block italic text-slate-500">
                      real-world deployment.
                    </span>
                  </h2>

                  <div className="mt-14 grid gap-px bg-slate-300 sm:grid-cols-3">
                    {[
                      {
                        number: "01",
                        title: "Investigate",
                        text: "Define the environmental question and assemble the right technologies.",
                      },
                      {
                        number: "02",
                        title: "Deploy",
                        text: "Test systems and methods in real field conditions.",
                      },
                      {
                        number: "03",
                        title: "Translate",
                        text: "Turn complex data into insight that supports action.",
                      },
                    ].map((step) => (
                      <div key={step.number} className="bg-[#f2f1eb] p-8">
                        <p className="text-[9px] tracking-[0.22em] text-emerald-800">
                          {step.number}
                        </p>
                        <h3 className="mt-12 font-['Cormorant_Garamond'] text-3xl font-light">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-sm font-light leading-relaxed text-slate-600">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden bg-emerald-200 text-slate-950">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-slate-950/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 h-64 w-64 rounded-full border border-slate-950/10"
            />

            <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
              <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-950">
                Collaborate
              </p>

              <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                <h2 className="max-w-5xl font-['Cormorant_Garamond'] text-5xl font-light leading-[0.98] sm:text-6xl lg:text-7xl">
                  Bring the next environmental challenge
                  <span className="block italic">into the field.</span>
                </h2>

                <div>
                  <p className="mb-7 max-w-md font-light leading-relaxed text-slate-700">
                    We welcome collaboration with conservation organizations,
                    researchers, government agencies, communities, and
                    technology developers.
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-slate-950 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                  >
                    Start a Conversation
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .alliance-track {
          animation: alliance-marquee 30s linear infinite;
        }

        .alliance-track:hover {
          animation-play-state: paused;
        }

        @keyframes alliance-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .alliance-track {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

function AllianceRailItem({
  logo,
  name,
}: {
  logo: string;
  name: string;
}) {
  return (
    <div className="mx-10 flex min-w-[220px] items-center justify-center lg:mx-16">
      <div className="relative h-11 w-44 opacity-60 grayscale invert transition duration-300 hover:opacity-100">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="176px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function TextRailItem({ name }: { name: string }) {
  return (
    <div className="mx-10 flex min-w-[220px] items-center justify-center lg:mx-16">
      <p className="font-['Cormorant_Garamond'] text-3xl font-light tracking-wide text-white/60">
        {name}
      </p>
    </div>
  );
}

function AllianceMember({
  logo,
  name,
  role,
  description,
  index,
}: {
  logo?: string;
  name: string;
  role: string;
  description: string;
  index: string;
}) {
  return (
    <article className="group grid gap-8 py-10 lg:grid-cols-[0.15fr_0.65fr_0.8fr_1fr] lg:items-center lg:py-14">
      <p className="text-[9px] tracking-[0.22em] text-slate-400">{index}</p>

      <div className="relative flex min-h-20 items-center">
        {logo ? (
          <div className="relative h-16 w-48 grayscale transition duration-500 group-hover:grayscale-0">
            <Image
              src={logo}
              alt={name}
              fill
              sizes="192px"
              className="object-contain object-left"
            />
          </div>
        ) : (
          <p className="font-['Cormorant_Garamond'] text-3xl font-light tracking-wide">
            {name}
          </p>
        )}
      </div>

      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-800">
        {role}
      </h3>

      <p className="max-w-md font-light leading-relaxed text-slate-600">
        {description}
      </p>
    </article>
  );
}
