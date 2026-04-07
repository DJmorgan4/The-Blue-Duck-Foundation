import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── PROGRAM CARD ──────────────────────────────────────────────────────────
function ProgramCard({
  title,
  scope,
  description,
  activities,
  tag,
}: {
  title: string;
  scope: string;
  description: string;
  activities: string[];
  tag: string;
}) {
  return (
    <div className="border-t border-slate-100 pt-8">
      <div className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-medium mb-4">
        {tag}
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-1">
        {title}
      </h3>
      <div className="text-[11px] tracking-[0.08em] uppercase text-slate-400 font-medium mb-4">
        {scope}
      </div>
      <p className="text-sm leading-relaxed text-slate-500 font-light mb-5">
        {description}
      </p>
      <ul className="space-y-2">
        {activities.map((a) => (
          <li key={a} className="flex items-start gap-3 text-sm text-slate-500 font-light">
            <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── ISSUE CARD ────────────────────────────────────────────────────────────
function IssueCard({
  title,
  scope,
  description,
  status,
}: {
  title: string;
  scope: string;
  description: string;
  status: "ongoing" | "developing" | "critical";
}) {
  const statusConfig = {
    ongoing:   { label: "Ongoing",    color: "#92400e", bg: "#fef3c7" },
    developing: { label: "Developing", color: "#1e40af", bg: "#eff6ff" },
    critical:  { label: "Critical",   color: "#991b1b", bg: "#fef2f2" },
  };
  const s = statusConfig[status];

  return (
    <div className="border-t border-slate-100 pt-6 pb-2">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900 mb-1">
            {title}
          </h3>
          <div className="text-[10px] tracking-[0.1em] uppercase text-slate-400 font-medium">
            {scope}
          </div>
        </div>
        <span
          className="text-[10px] tracking-[0.1em] uppercase font-medium px-3 py-1 flex-shrink-0"
          style={{ color: s.color, background: s.bg }}
        >
          {s.label}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-500 font-light">{description}</p>
    </div>
  );
}

// ─── SECTION HEADER ────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-px bg-slate-300" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-3">
        {title}
      </h2>
      {body && (
        <p className="text-[15px] leading-[1.85] text-slate-500 font-light max-w-2xl">
          {body}
        </p>
      )}
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function ConservationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[400px]">

              <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      Programs in development
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    The work<br />
                    <em className="italic">itself.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    From ecosystems to archaeological sites, from environmental science to humanitarian support — our programs go where the need is real and the work is meaningful.
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-28 pl-16">
                {[
                  { num: "01", label: "Environmental Conservation", href: "#conservation" },
                  { num: "02", label: "Research & Technology", href: "#research" },
                  { num: "03", label: "Archaeological & Cultural", href: "#heritage" },
                  { num: "04", label: "Humanitarian Support", href: "#humanitarian" },
                  { num: "05", label: "Issues We're Watching", href: "#issues" },
                ].map((item) => (
                  <a
                    key={item.num}
                    href={item.href}
                    className="flex items-baseline justify-between py-4 border-b border-slate-100 first:border-t group"
                  >
                    <span className="font-['Cormorant_Garamond'] text-[20px] font-light text-slate-800 group-hover:text-slate-900 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] tracking-[0.15em] text-slate-300 font-medium ml-4">
                      {item.num}
                    </span>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── STICKY NAV ────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-10 border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex gap-0 overflow-x-auto">
              {[
                { label: "Conservation", href: "#conservation" },
                { label: "Research & Technology", href: "#research" },
                { label: "Heritage & Culture", href: "#heritage" },
                { label: "Humanitarian", href: "#humanitarian" },
                { label: "Issues", href: "#issues" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap px-5 py-4 text-[11px] tracking-[0.1em] uppercase font-medium text-slate-400 hover:text-slate-900 transition-colors border-r border-slate-100 last:border-r-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ── CONSERVATION ──────────────────────────────────────────────── */}
        <section className="border-b border-slate-100" id="conservation">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <SectionHeader
              eyebrow="Environmental conservation"
              title="Protecting ecosystems at every scale"
              body="Conserving wetlands, waterways, forests, coastal regions, and terrestrial habitats — from local waterways to globally significant landscapes."
            />
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0">
              <ProgramCard
                tag="Global stewardship"
                title="Ecosystem & Habitat Protection"
                scope="North America & International"
                description="Prioritizing high-impact sites through conservation easements, land stewardship partnerships, and field research across wetlands, waterways, forests, and marine environments."
                activities={[
                  "Wetland and waterway restoration projects",
                  "Wildlife corridor and habitat connectivity initiatives",
                  "Conservation easement support and land partnerships",
                  "Ecological monitoring and baseline assessment",
                ]}
              />
              <ProgramCard
                tag="Wildlife & biodiversity"
                title="Wildlife Protection & Species Recovery"
                scope="Domestic & International"
                description="Supporting native, migratory, and endangered species through habitat restoration, ecological surveys, and grants to qualified conservation organizations worldwide."
                activities={[
                  "Habitat restoration for migratory species",
                  "Species recovery support and ecological surveys",
                  "Grants to qualified anti-poaching partners",
                  "Landowner and community conservation education",
                ]}
              />
              <ProgramCard
                tag="Water resources"
                title="Freshwater Conservation & Access"
                scope="Regional & International"
                description="Protecting watersheds, aquifers, and freshwater systems — and ensuring communities in underserved regions have access to safe, clean water."
                activities={[
                  "Watershed monitoring and aquifer research partnerships",
                  "Water quality testing and pollution mitigation",
                  "International freshwater access initiatives",
                  "Riparian corridor restoration",
                ]}
              />
              <ProgramCard
                tag="Resource stewardship"
                title="Natural Resource Region Support"
                scope="Resource-Dependent Communities"
                description="Providing charitable support to communities impacted by natural resource industries — worker safety, land reclamation advocacy, and environmental monitoring — without engaging in or benefiting commercial extraction."
                activities={[
                  "Worker safety education and training programs",
                  "Environmental monitoring for impacted communities",
                  "Land reclamation advocacy and support",
                  "Pollution mitigation and ethical sourcing education",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── RESEARCH & TECHNOLOGY ─────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50" id="research">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <SectionHeader
              eyebrow="Research & technology"
              title="Science-driven tools and measurable outcomes"
              body="Increasing transparency, accountability, and real-world impact through environmental monitoring, earth science, and renewable energy research."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
              <ProgramCard
                tag="Environmental technology"
                title="Environmental Monitoring Systems"
                scope="Field Deployments & Partner Programs"
                description="IoT-based sensors, data platforms, and scientific tools that give researchers, agencies, and communities real-time intelligence on conservation outcomes."
                activities={[
                  "IoT sensor networks for air, water, and soil",
                  "Open data platforms for conservation transparency",
                  "Remote sensing and satellite data integration",
                  "Tools shared with government and academic partners",
                ]}
              />
              <ProgramCard
                tag="Earth sciences"
                title="Geological & Earth Systems Research"
                scope="Academic & Public Programs"
                description="Studying and documenting geological formations, mineral systems, soil science, and earth processes — for scientific advancement and public understanding."
                activities={[
                  "Field research and geological documentation",
                  "Public education platforms and curriculum",
                  "Volcanology and earth systems study",
                  "Mineral spring and subsurface research",
                ]}
              />
              <ProgramCard
                tag="Renewable energy"
                title="Sustainable Energy Research"
                scope="Research Partnerships"
                description="Supporting forward-thinking research in solar, wind, and other sustainable energy fields — creating transparent pathways to fund work that too often goes without support."
                activities={[
                  "Research grants to renewable energy scientists",
                  "Support for community solar and rural energy access",
                  "Collaboration with energy innovators globally",
                  "Education on sustainable energy and land use",
                ]}
              />
            </div>
            <div className="border-t border-slate-200 mt-12 pt-10">
              <div className="grid lg:grid-cols-2 gap-10 lg:items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">
                    Working on something that fits?
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 font-light">
                    We're building research partnerships and program infrastructure. If you're a scientist, institution, or organization doing meaningful work in environmental science, energy, or conservation technology — we'd like to connect.
                  </p>
                </div>
                <div className="lg:flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-300 text-slate-700 px-7 py-3.5 hover:border-slate-600 transition-colors inline-flex"
                  >
                    Get in touch →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HERITAGE ──────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100" id="heritage">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <SectionHeader
              eyebrow="Archaeological & cultural heritage"
              title="Preserving the human record"
              body="Sites, stories, and landscapes that belong to all of us — documented, protected, and made accessible for future generations."
            />
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0 max-w-4xl">
              <ProgramCard
                tag="Archaeology"
                title="Site Documentation & Protection"
                scope="Domestic & International"
                description="Conducting and sponsoring scientific study, excavation, documentation, and protection of archaeological sites in partnership with academic institutions and indigenous communities."
                activities={[
                  "Archaeological site mapping and 3D documentation",
                  "Excavation support and field research grants",
                  "Indigenous history research and community partnerships",
                  "Digital preservation and public access platforms",
                ]}
              />
              <ProgramCard
                tag="Cultural preservation"
                title="Historical Landscape Protection"
                scope="Domestic & International"
                description="Protecting historically significant landscapes, geological heritage sites, and cultural areas from degradation, development, and neglect."
                activities={[
                  "Heritage site identification and protection advocacy",
                  "Geological heritage documentation",
                  "Cultural heritage education programs",
                  "International collaboration with preservation organizations",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── HUMANITARIAN ──────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50" id="humanitarian">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <SectionHeader
              eyebrow="Humanitarian environmental support"
              title="Where human dignity and conservation meet"
              body="We show up where environmental protection and human need intersect — directly supporting communities and workers in environmentally sensitive regions."
            />
            <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">
              <div>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-8">
                  The Blue Duck Foundation provides direct charitable assistance — including safety equipment, training, supplies, and operational support — to communities and workers in environmentally sensitive or resource-dependent regions, particularly in underserved and developing areas.
                </p>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light">
                  This includes support for individuals and organizations doing work in solar, renewables, conservation science, and other fields where access to funding has historically been limited or gatekept. Good work deserves a clear, compliant pathway to support.
                </p>
              </div>
              <div className="flex flex-col gap-0">
                {[
                  { label: "Safety & Equipment", desc: "Direct provision of safety gear, field equipment, and supplies to workers and communities in need." },
                  { label: "Training & Education", desc: "Environmental safety training and capacity-building for underserved regions." },
                  { label: "Operational Support", desc: "Grants and partnership support for humanitarian environmental organizations globally." },
                ].map((item, i) => (
                  <div key={i} className="border-t border-slate-200 pt-5 pb-4 last:border-b">
                    <h4 className="font-['Cormorant_Garamond'] text-lg font-light text-slate-900 mb-1">
                      {item.label}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-500 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ISSUES WE'RE WATCHING ─────────────────────────────────────── */}
        <section className="border-b border-slate-100" id="issues">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Issues we're watching
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-3">
                  On our radar
                </h2>
                <p className="text-[15px] leading-[1.85] text-slate-500 font-light max-w-xl">
                  Regulatory, legal, and environmental developments shaping conservation globally — and how they connect to our work.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2 self-start sm:self-auto flex-shrink-0"
              >
                Submit a tip →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
              <IssueCard
                title="Wetlands Protection Post-Sackett"
                scope="United States"
                description="Following the Supreme Court's Sackett v. EPA ruling, jurisdictional wetlands protections have been significantly narrowed. Seasonal and isolated wetlands face increased development pressure with reduced federal oversight."
                status="ongoing"
              />
              <IssueCard
                title="Global Freshwater Stress"
                scope="International"
                description="Aquifer depletion and freshwater scarcity are accelerating across multiple continents. Regions dependent on groundwater for agriculture and drinking water face compounding environmental and humanitarian risk."
                status="critical"
              />
              <IssueCard
                title="Renewable Energy & Land Use Policy"
                scope="Domestic & International"
                description="As solar and wind infrastructure expands rapidly, land use, habitat fragmentation, and community impact policies are evolving. Responsible siting and reclamation standards vary widely across jurisdictions."
                status="developing"
              />
              <IssueCard
                title="Archaeological Site Loss to Development"
                scope="Global"
                description="Significant archaeological and cultural heritage sites continue to be lost to infrastructure development, agricultural expansion, and conflict. Digital documentation and protection frameworks are inadequate in many regions."
                status="ongoing"
              />
              <IssueCard
                title="Indigenous Environmental Rights"
                scope="International"
                description="Indigenous communities across North America, South America, and beyond continue to face displacement and loss of traditional lands to resource extraction. Legal recognition and enforcement remains inconsistent."
                status="ongoing"
              />
              <div className="border-t border-dashed border-slate-200 pt-6 pb-2">
                <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900 mb-2">
                  Know something happening locally?
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 font-light mb-4">
                  We rely on scientists, landowners, journalists, and community members to stay ahead of emerging threats. Help us track conservation issues affecting communities worldwide.
                </p>
                <Link
                  href="/contact"
                  className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
                >
                  Submit a tip →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="bg-slate-900 px-10 py-14 lg:px-16 lg:py-16">
              <div className="grid lg:grid-cols-2 gap-10 lg:items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-600" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-medium">
                      Stay informed
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-4 leading-tight">
                    Global Conservation<br /><em className="italic">&amp; Environment Brief</em>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 font-light">
                    Monthly roundup of policy developments, research highlights, and environmental issues affecting communities worldwide — delivered to your inbox.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                  >
                    Subscribe to monthly brief
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                  >
                    Partner with us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
