import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {tag}
          </span>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{scope}</p>
        </div>
      </div>
      <p className="mt-4 leading-relaxed text-slate-600">{description}</p>
      <ul className="mt-5 space-y-2">
        {activities.map((a) => (
          <li key={a} className="flex items-start gap-2 text-sm text-slate-700">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    ongoing: { label: "Ongoing", classes: "bg-yellow-100 text-yellow-800" },
    developing: { label: "Developing", classes: "bg-blue-100 text-blue-800" },
    critical: { label: "Critical", classes: "bg-red-100 text-red-800" },
  };

  return (
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{scope}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[status].classes}`}>
          {statusConfig[status].label}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

export default function ConservationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-900 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-900"></span>
                </span>
                Programs in development
              </div>
              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl">
                Our Programs
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">
                From Texas wetlands to global ecosystems, from archaeological preservation to environmental monitoring technology — our program areas reflect a simple belief: meaningful work deserves support, transparency, and reach.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY NAV */}
        <section className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex gap-1 overflow-x-auto py-1" aria-label="Program categories">
              {[
                { label: "Conservation", href: "#conservation" },
                { label: "Research & Technology", href: "#research" },
                { label: "Heritage & Culture", href: "#heritage" },
                { label: "Humanitarian Support", href: "#humanitarian" },
                { label: "Issues We're Watching", href: "#issues" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* CONSERVATION */}
        <section className="border-b border-slate-100 bg-white" id="conservation">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Environmental Conservation</h2>
              <p className="mt-3 text-lg text-slate-600">
                Protecting and restoring ecosystems at every scale — from local waterways to globally significant habitats.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <ProgramCard
                tag="Global Stewardship"
                title="Ecosystem & Habitat Protection"
                scope="North America & International"
                description="Conserving wetlands, waterways, forests, coastal regions, marine environments, and terrestrial habitats. We prioritize high-impact sites through conservation easements, land stewardship partnerships, and field research."
                activities={[
                  "Wetland and waterway restoration projects",
                  "Wildlife corridor and habitat connectivity initiatives",
                  "Conservation easement support and land partnerships",
                  "Ecological monitoring and baseline assessment",
                ]}
              />
              <ProgramCard
                tag="Wildlife & Biodiversity"
                title="Wildlife Protection & Species Recovery"
                scope="Domestic & International"
                description="Supporting native, migratory, and endangered species through habitat restoration, ecological surveys, and grants to qualified anti-poaching and conservation organizations worldwide."
                activities={[
                  "Habitat restoration for migratory species",
                  "Species recovery support and ecological surveys",
                  "Grants to qualified anti-poaching partners",
                  "Landowner and community conservation education",
                ]}
              />
              <ProgramCard
                tag="Water Resources"
                title="Freshwater Conservation & Access"
                scope="Regional & International"
                description="Protecting watersheds, aquifers, and freshwater systems — and ensuring communities in underserved regions have access to safe, clean water. A conservation and humanitarian priority."
                activities={[
                  "Watershed monitoring and aquifer research partnerships",
                  "Water quality testing and pollution mitigation",
                  "International freshwater access initiatives",
                  "Riparian corridor restoration",
                ]}
              />
              <ProgramCard
                tag="Resource Stewardship"
                title="Ethical Natural Resource Region Support"
                scope="Resource-Dependent Communities"
                description="Providing charitable support to communities impacted by natural resource industries — worker safety education, land reclamation advocacy, and environmental monitoring — without engaging in or benefiting commercial extraction."
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

        {/* RESEARCH & TECHNOLOGY */}
        <section className="border-b border-slate-100 bg-slate-50" id="research">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Research & Technology</h2>
              <p className="mt-3 text-lg text-slate-600">
                Science-driven tools and research that increase transparency, accountability, and measurable outcomes.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <ProgramCard
                tag="Environmental Technology"
                title="Environmental Monitoring Systems"
                scope="Field Deployments & Partner Programs"
                description="Developing and deploying IoT-based environmental sensors, data platforms, and scientific tools that give researchers, agencies, and communities real-time intelligence on conservation outcomes."
                activities={[
                  "IoT sensor networks for air, water, and soil monitoring",
                  "Open data platforms for conservation transparency",
                  "Tools shared with government agencies and academic partners",
                  "Remote sensing and satellite data integration",
                ]}
              />
              <ProgramCard
                tag="Earth Sciences"
                title="Geological & Earth Systems Research"
                scope="Academic & Public Programs"
                description="Studying, documenting, and educating the public on geological formations, mineral systems, volcanology, soil science, and earth processes — for scientific advancement and public understanding."
                activities={[
                  "Field research and geological documentation",
                  "Public education platforms and curriculum",
                  "Volcanology and earth systems study",
                  "Mineral spring and subsurface research partnerships",
                ]}
              />
              <ProgramCard
                tag="Renewable Energy"
                title="Renewable & Sustainable Energy Research"
                scope="Research Partnerships"
                description="Supporting forward-thinking research in solar, wind, and other sustainable energy fields — creating transparent pathways to fund the work that too often goes without support."
                activities={[
                  "Research grants to renewable energy scientists",
                  "Support for community solar and rural energy access",
                  "Collaboration with energy innovators globally",
                  "Education on sustainable energy and land use",
                ]}
              />
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8">
                <h3 className="text-lg font-semibold text-slate-900">Working on something that fits?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  We're building research partnerships and program infrastructure. If you're a scientist, institution, or organization doing meaningful work in environmental science, energy, or conservation technology — we'd like to connect.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                  Get in touch
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* HERITAGE */}
        <section className="border-b border-slate-100 bg-white" id="heritage">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Archaeological & Cultural Heritage</h2>
              <p className="mt-3 text-lg text-slate-600">
                Preserving the human record — sites, stories, and landscapes that belong to all of us.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <ProgramCard
                tag="Archaeology"
                title="Archaeological Site Documentation & Protection"
                scope="Domestic & International"
                description="Conducting and sponsoring scientific study, excavation, documentation, and protection of archaeological sites and culturally significant landscapes in partnership with academic institutions and indigenous communities."
                activities={[
                  "Archaeological site mapping and 3D documentation",
                  "Excavation support and field research grants",
                  "Indigenous history research and community partnerships",
                  "Digital preservation and public access platforms",
                ]}
              />
              <ProgramCard
                tag="Cultural Preservation"
                title="Historical Landscape & Heritage Protection"
                scope="Domestic & International"
                description="Protecting historically significant landscapes, geological heritage sites, and cultural heritage areas from degradation, development, and neglect — ensuring future generations can access and learn from them."
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

        {/* HUMANITARIAN */}
        <section className="border-b border-slate-100 bg-slate-50" id="humanitarian">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Humanitarian Environmental Support</h2>
              <p className="mt-3 text-lg text-slate-600">
                Where human dignity and environmental protection intersect — we show up.
              </p>
            </div>
            <div className="mt-12 max-w-4xl">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8">
                <p className="text-lg leading-relaxed text-slate-700">
                  The Blue Duck Foundation provides direct charitable assistance — including safety equipment, training, supplies, and operational support — to communities and workers in environmentally sensitive or resource-dependent regions, particularly in underserved and developing areas.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  This includes support for individuals and organizations doing work in solar, renewables, conservation science, and other fields where access to funding has historically been limited or gatekept. We believe good work deserves a clear, compliant pathway to support — and we're building that pathway.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Safety & Equipment", desc: "Direct provision of safety gear, field equipment, and supplies to workers and communities in need." },
                    { label: "Training & Education", desc: "Environmental safety training, technical education, and capacity-building for underserved regions." },
                    { label: "Operational Support", desc: "Grants and partnership support for humanitarian environmental organizations and initiatives globally." },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-slate-50 p-5">
                      <h4 className="font-semibold text-slate-900">{item.label}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ISSUES WE'RE WATCHING */}
        <section className="border-b border-slate-100 bg-white" id="issues">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Issues We're Watching</h2>
                <p className="mt-3 text-lg text-slate-600">
                  Regulatory, legal, and environmental developments shaping conservation globally — and how they connect to our work.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                Submit a tip
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                description="Indigenous communities across North America, South America, and beyond continue to face displacement and loss of traditional lands to resource extraction. Legal recognition and enforcement of environmental rights remains inconsistent."
                status="ongoing"
              />
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Know something happening locally?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Help us track conservation and environmental issues affecting communities worldwide. We rely on scientists, landowners, journalists, and community members to stay ahead of emerging threats.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                  Submit a tip
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
              <div className="px-8 py-12 md:px-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-3xl font-light tracking-tight text-white">Global Conservation & Environment Brief</h3>
                    <p className="mt-3 text-lg text-slate-300">
                      Monthly roundup of policy developments, research highlights, and environmental issues affecting communities worldwide — delivered to your inbox.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                    >
                      Subscribe to monthly brief
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Partner with us
                    </Link>
                  </div>
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
