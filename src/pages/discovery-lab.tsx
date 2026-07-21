import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const technologyAreas = [
  {
    number: "01",
    title: "Drones & Aerial Intelligence",
    description:
      "Enterprise drones, photogrammetry, multispectral imaging, autonomous flight systems, and aerial platforms that reveal environmental change from above.",
    technologies: ["RGB mapping", "Multispectral", "Autonomous flight", "Photogrammetry"],
  },
  {
    number: "02",
    title: "LiDAR & 3D Mapping",
    description:
      "Airborne and terrestrial laser-scanning systems that create precise three-dimensional records of terrain, vegetation, structures, and cultural landscapes.",
    technologies: ["UAV LiDAR", "Terrestrial scanning", "Digital twins", "Terrain modeling"],
  },
  {
    number: "03",
    title: "Ground-Penetrating Radar",
    description:
      "Non-invasive subsurface technologies used to investigate buried features, historic sites, geological conditions, infrastructure, and cultural resources.",
    technologies: ["GPR", "Subsurface imaging", "Geophysics", "Feature detection"],
  },
  {
    number: "04",
    title: "Thermal Intelligence",
    description:
      "Radiometric thermal systems that help identify heat, moisture, wildlife activity, water movement, energy loss, and environmental patterns invisible to the eye.",
    technologies: ["Thermal imaging", "Wildlife detection", "Moisture analysis", "Heat mapping"],
  },
  {
    number: "05",
    title: "Water & Environmental Sensors",
    description:
      "Connected field instruments that measure water quality, weather, soil, air, flow, temperature, contamination, and ecosystem health over time.",
    technologies: ["Water quality", "Weather stations", "Soil sensors", "Telemetry"],
  },
  {
    number: "06",
    title: "Wildlife Monitoring",
    description:
      "Camera traps, acoustic recorders, tracking systems, and artificial intelligence tools that support ethical, low-disturbance wildlife research.",
    technologies: ["Bioacoustics", "Camera traps", "AI identification", "Telemetry"],
  },
  {
    number: "07",
    title: "Survey & Positioning",
    description:
      "Survey-grade GNSS, robotic total stations, field computers, and positioning systems that create reliable control for research and mapping.",
    technologies: ["GNSS", "RTK", "Total stations", "Ground control"],
  },
  {
    number: "08",
    title: "GIS, Data & Artificial Intelligence",
    description:
      "Mapping platforms, analytical software, machine learning, historical imagery, and interactive tools that turn field observations into useful intelligence.",
    technologies: ["GIS", "Machine learning", "Historical imagery", "Interactive maps"],
  },
];

const discoveryMissions = [
  {
    number: "Mission 001",
    category: "Subsurface Discovery",
    title: "Finding Buried History",
    description:
      "Exploring how ground-penetrating radar, LiDAR, survey control, drone mapping, and historical imagery can document hidden cultural features without disturbing the ground.",
    status: "Partner development",
    tools: ["GPR", "LiDAR", "GNSS", "Historical imagery"],
  },
  {
    number: "Mission 002",
    category: "Environmental Intelligence",
    title: "Seeing Water Differently",
    description:
      "Evaluating sensors, thermal imagery, aerial mapping, and connected monitoring systems that can improve understanding of waterways, wetlands, springs, and watersheds.",
    status: "Research design",
    tools: ["Water sensors", "Thermal", "Drones", "GIS"],
  },
  {
    number: "Mission 003",
    category: "Wildlife Technology",
    title: "Listening to the Landscape",
    description:
      "Testing cameras, acoustic monitoring, automated identification, and remote sensing technologies that reveal wildlife activity with less disturbance.",
    status: "Technology review",
    tools: ["Bioacoustics", "Camera systems", "AI", "Remote sensing"],
  },
];

const researchProcess = [
  {
    step: "Discover",
    description:
      "We identify emerging products, platforms, and ideas with the potential to improve environmental research, conservation, field science, and public understanding.",
  },
  {
    step: "Connect",
    description:
      "We bring together manufacturers, researchers, landowners, environmental professionals, universities, agencies, and community organizations.",
  },
  {
    step: "Deploy",
    description:
      "Selected technologies are placed into real landscapes through carefully designed demonstrations, pilot projects, research missions, and community-benefit work.",
  },
  {
    step: "Evaluate",
    description:
      "We document field performance, usability, data quality, durability, practical applications, limitations, and opportunities for improvement.",
  },
  {
    step: "Share",
    description:
      "We publish field notes, project stories, maps, visualizations, partner profiles, technical observations, and educational resources.",
  },
];

const partnerOpportunities = [
  {
    title: "Technology Partners",
    description:
      "Manufacturers and developers can provide equipment, software, demonstration systems, prototypes, training, technical support, or data-processing resources.",
  },
  {
    title: "Research Partners",
    description:
      "Universities, scientists, consultants, agencies, and technical professionals can help design projects, interpret findings, and strengthen research quality.",
  },
  {
    title: "Field Partners",
    description:
      "Landowners, conservation groups, parks, communities, and public organizations can propose meaningful landscapes and environmental questions.",
  },
  {
    title: "Funding Partners",
    description:
      "Foundations, companies, and individual donors can support equipment acquisition, field deployments, education, reporting, and public access to findings.",
  },
];

const principles = [
  "Public benefit before promotion",
  "Responsible and ethical fieldwork",
  "Respect for landowners and sensitive locations",
  "Honest reporting of strengths and limitations",
  "Useful environmental data and documented outcomes",
  "Collaboration across science, industry, and community",
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12h15m-6-6 6 6-6 6"
      />
    </svg>
  );
}

function RadarMark() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[440px] lg:w-[440px]"
    >
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[12%] rounded-full border border-white/10" />
      <div className="absolute inset-[24%] rounded-full border border-white/10" />
      <div className="absolute inset-[36%] rounded-full border border-emerald-300/20" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />

      <div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 210deg, transparent 0deg, transparent 285deg, rgba(110,231,183,0.28) 330deg, rgba(110,231,183,0.04) 360deg)",
        }}
      />

      <div className="absolute left-[68%] top-[20%] h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.9)]" />
      <div className="absolute left-[28%] top-[62%] h-2 w-2 rounded-full bg-sky-300/80 shadow-[0_0_20px_rgba(125,211,252,0.8)]" />
      <div className="absolute left-[58%] top-[73%] h-1.5 w-1.5 rounded-full bg-white/70" />

      <div className="absolute inset-[41%] flex items-center justify-center rounded-full border border-emerald-300/30 bg-slate-950/70 backdrop-blur-sm">
        <div className="text-center">
          <div className="font-['Cormorant_Garamond'] text-4xl font-light text-white">
            BD
          </div>
          <div className="mt-1 text-[8px] uppercase tracking-[0.24em] text-emerald-200/70">
            Discovery
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscoveryLabPage() {
  return (
    <>
      <Head>
        <title>Blue Duck Discovery Lab | The Blue Duck Foundation</title>
        <meta
          name="description"
          content="The Blue Duck Discovery Lab discovers, deploys, and shares emerging technologies that improve environmental data, conservation research, field science, and public understanding."
        />
        <meta
          property="og:title"
          content="Blue Duck Discovery Lab | The Blue Duck Foundation"
        />
        <meta
          property="og:description"
          content="Where breakthrough environmental technologies meet real landscapes."
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-grow bg-white font-['Jost',sans-serif]">
          {/* Hero */}
          <section className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 78% 42%, rgba(5,150,105,0.26), transparent 31%), radial-gradient(circle at 20% 10%, rgba(30,64,175,0.22), transparent 32%), linear-gradient(145deg, #020617 0%, #0f172a 50%, #052e2b 100%)",
              }}
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
              <div className="max-w-4xl">
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-px w-12 bg-emerald-300/60" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-emerald-200/70">
                    A Blue Duck Foundation Initiative
                  </span>
                </div>

                <h1 className="font-['Cormorant_Garamond'] text-6xl font-light leading-[0.9] text-white sm:text-7xl lg:text-[92px]">
                  Blue Duck
                  <br />
                  <em className="italic text-emerald-300">Discovery Lab</em>
                </h1>

                <p className="mt-9 max-w-2xl text-xl font-light leading-relaxed text-slate-300">
                  Where breakthrough environmental technologies meet real
                  landscapes.
                </p>

                <p className="mt-5 max-w-2xl text-[15px] font-light leading-[1.9] text-slate-400">
                  We discover, deploy, evaluate, and share remarkable tools that
                  can improve environmental data, conservation research,
                  archaeology, mapping, wildlife science, water intelligence,
                  and our understanding of the Earth.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-slate-100"
                  >
                    Become a partner
                    <ArrowIcon />
                  </Link>

                  <a
                    href="#missions"
                    className="inline-flex items-center justify-center gap-3 border border-white/25 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                  >
                    Explore the lab
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <RadarMark />
              </div>
            </div>

            <div className="relative border-t border-white/10">
              <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-4 lg:px-8">
                {[
                  ["Discover", "Emerging technology"],
                  ["Deploy", "Real-world environments"],
                  ["Evaluate", "Practical field value"],
                  ["Share", "Research and insight"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="border-white/10 px-0 py-6 first:border-l-0 odd:border-r lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
                  >
                    <div className="font-['Cormorant_Garamond'] text-2xl text-white">
                      {title}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-500">
                      {description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24">
                <div>
                  <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                    Why the lab exists
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900 lg:text-5xl">
                    Better tools create
                    <br />
                    <em className="italic text-emerald-700">
                      better understanding
                    </em>
                  </h2>
                </div>

                <div className="space-y-6 text-[15px] font-light leading-[1.9] text-slate-500">
                  <p className="font-['Cormorant_Garamond'] text-3xl leading-snug text-slate-800">
                    Some of the most important environmental discoveries begin
                    with a new way of seeing.
                  </p>

                  <p>
                    Environmental decisions are only as strong as the
                    information behind them. New technologies are making it
                    possible to observe ecosystems, investigate landscapes,
                    detect patterns, collect measurements, and communicate
                    findings in ways that were once impossible.
                  </p>

                  <p>
                    The Blue Duck Discovery Lab searches for promising
                    technologies and places them into meaningful real-world
                    service. We work with technology companies, environmental
                    professionals, researchers, educators, landowners,
                    universities, agencies, and conservation organizations to
                    explore what these tools can reveal.
                  </p>

                  <p>
                    Our goal is not simply to showcase products. It is to create
                    useful environmental knowledge, document honest field
                    experience, support public-benefit research, and help
                    exceptional technologies find meaningful applications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission statement */}
          <section className="overflow-hidden bg-emerald-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-end lg:gap-24">
                <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-emerald-300/70">
                  Our purpose
                </div>

                <blockquote className="font-['Cormorant_Garamond'] text-4xl font-light leading-[1.12] text-white sm:text-5xl lg:text-6xl">
                  “Discovering the technologies that will change how we
                  understand, document, and protect the Earth.”
                </blockquote>
              </div>
            </div>
          </section>

          {/* Technology areas */}
          <section id="technology" className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
                <div>
                  <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                    Technology radar
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 lg:text-5xl">
                    Technologies we are
                    <br />
                    <em className="italic text-emerald-700">exploring</em>
                  </h2>
                </div>

                <p className="max-w-xl text-sm font-light leading-relaxed text-slate-500 lg:justify-self-end">
                  The Discovery Lab follows established systems and emerging
                  innovations that can create better environmental data, safer
                  fieldwork, stronger research, and more accessible science.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
                {technologyAreas.map((area) => (
                  <article
                    key={area.number}
                    className="group bg-white p-8 transition-colors duration-300 hover:bg-slate-950 lg:p-10"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-emerald-300">
                        {area.number}
                      </span>

                      <div className="h-8 w-8 rounded-full border border-slate-200 transition-colors group-hover:border-white/20">
                        <div className="flex h-full w-full items-center justify-center text-slate-400 transition-colors group-hover:text-white">
                          <ArrowIcon />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900 transition-colors group-hover:text-white">
                      {area.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-slate-500 transition-colors group-hover:text-slate-400">
                      {area.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {area.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="border border-slate-200 px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] text-slate-500 transition-colors group-hover:border-white/15 group-hover:text-slate-400"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Missions */}
          <section id="missions" className="border-b border-slate-800 bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
                <div>
                  <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                    Discovery missions
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light lg:text-5xl">
                    Research built around
                    <br />
                    <em className="italic text-emerald-300">real questions</em>
                  </h2>
                </div>

                <p className="max-w-xl text-sm font-light leading-relaxed text-slate-400 lg:justify-self-end">
                  Each mission brings technologies and partners together around
                  a defined environmental, scientific, cultural, or community
                  challenge.
                </p>
              </div>

              <div className="space-y-px bg-slate-800">
                {discoveryMissions.map((mission) => (
                  <article
                    key={mission.number}
                    className="grid gap-8 bg-slate-950 p-8 transition-colors hover:bg-slate-900 lg:grid-cols-[0.6fr_1fr_1.2fr_0.7fr] lg:items-center lg:p-10"
                  >
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-emerald-300">
                        {mission.number}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-600">
                        {mission.category}
                      </div>
                    </div>

                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light">
                      {mission.title}
                    </h3>

                    <div>
                      <p className="text-sm font-light leading-relaxed text-slate-400">
                        {mission.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {mission.tools.map((tool) => (
                          <span
                            key={tool}
                            className="border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-slate-500"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <span className="inline-flex border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-emerald-300">
                        {mission.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Research process */}
          <section className="border-b border-slate-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="grid gap-14 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">
                <div>
                  <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                    Our process
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900 lg:text-5xl">
                    From promising idea
                    <br />
                    to <em className="italic text-emerald-700">field insight</em>
                  </h2>

                  <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-slate-500">
                    The Lab is designed to create a responsible path from
                    technology introduction to real-world understanding.
                  </p>
                </div>

                <div>
                  {researchProcess.map((item, index) => (
                    <div
                      key={item.step}
                      className="grid grid-cols-[52px_1fr] gap-6 border-t border-slate-200 py-8 first:border-t-0 first:pt-0"
                    >
                      <div className="font-['Cormorant_Garamond'] text-2xl text-emerald-700">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="grid gap-3 md:grid-cols-[0.45fr_1fr] md:gap-10">
                        <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900">
                          {item.step}
                        </h3>

                        <p className="text-sm font-light leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Partner ecosystem */}
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
              <div className="mb-14 max-w-3xl">
                <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                  Build with us
                </div>

                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900 lg:text-5xl">
                  A field platform for
                  <br />
                  <em className="italic text-emerald-700">
                    meaningful partnership
                  </em>
                </h2>

                <p className="mt-7 max-w-2xl text-sm font-light leading-relaxed text-slate-500">
                  The Discovery Lab gives companies and organizations a place to
                  put useful technology into the field, support public-benefit
                  research, and tell the story of what innovation can accomplish.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
                {partnerOpportunities.map((opportunity) => (
                  <article key={opportunity.title} className="bg-white p-8 lg:p-10">
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900">
                      {opportunity.title}
                    </h3>

                    <p className="mt-4 text-sm font-light leading-relaxed text-slate-500">
                      {opportunity.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-12 grid gap-8 border border-slate-200 bg-white p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700">
                    Partner features
                  </div>

                  <h3 className="mt-4 font-['Cormorant_Garamond'] text-3xl font-light text-slate-900 lg:text-4xl">
                    Your technology. Real fieldwork. A story worth sharing.
                  </h3>

                  <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-slate-500">
                    Partner profiles may include product information,
                    applications, mission deployments, photography, video,
                    field observations, maps, data visualizations, technical
                    findings, and links to published reports.
                  </p>
                </div>

                <div className="flex items-center lg:justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-3 bg-emerald-800 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-900 sm:w-auto"
                  >
                    Introduce your technology
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Standards */}
          <section className="border-b border-slate-800 bg-slate-900 text-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">
                <div>
                  <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                    Our standards
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight lg:text-5xl">
                    Discovery with
                    <br />
                    <em className="italic text-emerald-300">integrity</em>
                  </h2>
                </div>

                <div className="grid gap-px bg-slate-700 sm:grid-cols-2">
                  {principles.map((principle, index) => (
                    <div key={principle} className="bg-slate-900 p-6">
                      <div className="mb-4 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-200">
                        {principle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Future content */}
          <section className="border-b border-slate-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="mb-12 max-w-2xl">
                <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
                  Growing the lab
                </div>

                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 lg:text-5xl">
                  What comes next
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Field Notes",
                    text: "Stories, observations, photography, and lessons from Discovery Lab deployments.",
                  },
                  {
                    title: "Technology Profiles",
                    text: "Dedicated pages highlighting partners, products, applications, and field results.",
                  },
                  {
                    title: "Research Library",
                    text: "Reports, maps, datasets, technical resources, and educational materials.",
                  },
                  {
                    title: "Interactive Missions",
                    text: "Project maps and visualizations showing where technologies are being used.",
                  },
                ].map((item, index) => (
                  <article
                    key={item.title}
                    className="border-t border-slate-200 pt-7"
                  >
                    <div className="text-[9px] uppercase tracking-[0.18em] text-emerald-700">
                      Coming {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3 className="mt-5 font-['Cormorant_Garamond'] text-3xl font-light text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm font-light leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="relative isolate overflow-hidden bg-emerald-950">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 110%, rgba(37,99,235,0.32), transparent 42%), linear-gradient(145deg, rgba(6,78,59,0.94), rgba(2,6,23,0.97))",
              }}
            />

            <div className="relative mx-auto max-w-5xl px-6 py-24 text-center lg:px-8 lg:py-32">
              <div className="mb-7 text-[10px] font-medium uppercase tracking-[0.25em] text-emerald-200/60">
                Discover what is possible
              </div>

              <h2 className="font-['Cormorant_Garamond'] text-5xl font-light leading-tight text-white lg:text-7xl">
                Help us see what
                <br />
                <em className="italic text-emerald-200">others cannot</em>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl font-light leading-relaxed text-slate-300">
                Join the Blue Duck Discovery Lab as a technology, research,
                field, or funding partner and help create better environmental
                understanding through innovation.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-white px-9 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-950 transition-colors hover:bg-slate-100"
                >
                  Work with the Discovery Lab
                  <ArrowIcon />
                </Link>

                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center border border-white/25 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                >
                  Support the lab
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
