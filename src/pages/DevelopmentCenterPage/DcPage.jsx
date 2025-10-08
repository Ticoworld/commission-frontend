import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  CpuChipIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const centers = [
  {
    name: 'Ebonyi State Training School, Abakaliki',
    focus: 'Leadership, public finance, and ethical governance modules for senior management cadres.',
    location: 'Abakaliki Development Centre',
    capacity: '220 delegates per cohort',
    facilities: ['Smart lecture theatres', 'Policy simulation lab', 'Residential hostels', 'Resource library'],
    image: '/seminar1.jpg'
  },
  {
    name: 'Ivo Community Leadership Hub',
    focus: 'Grassroots leadership, gender inclusion, and citizen engagement for community officers.',
    location: 'Ivo Development Centre',
    capacity: '120 officers per session',
    facilities: ['Civic dialogue studio', 'Hybrid classrooms', 'Collaboration pods'],
    image: '/pic8.jpg'
  },
  {
    name: 'Ikwo Digital Innovation Lab',
    focus: 'Data governance, e-records, automation tools, and ICT service delivery.',
    location: 'Ikwo Development Centre',
    capacity: '160 officers per quarter',
    facilities: ['Device testing lab', 'Fiber-backed computer suites', 'Design thinking studio'],
    image: '/pic11.jpg'
  },
  {
    name: 'Afikpo South Service Academy',
    focus: 'Community development, budgeting, and monitoring & evaluation frameworks.',
    location: 'Afikpo South Development Centre',
    capacity: '140 officers per cohort',
    facilities: ['Mini auditorium', 'Documentation centre', 'Project incubation rooms'],
    image: '/pic5.jpg'
  }
];

const programmes = [
  {
    title: 'Leadership Acceleration Programme',
    description: 'Three-month blended programme for principal officers focusing on strategy, ethics, and performance management.'
  },
  {
    title: 'Service Delivery Clinics',
    description: 'Rotational clinics that pair frontline workers with transformation coaches to resolve citizen-facing bottlenecks.'
  },
  {
    title: 'Digital Service Bootcamps',
    description: 'Hands-on sessions covering records digitisation, analytics dashboards, and workflow automation tools.'
  },
  {
    title: 'Community Cohesion Workshops',
    description: 'Scenario-based workshops that reinforce conflict resolution, inclusion, and participatory governance.'
  }
];

const DcPage = () => {
  return (
    <div className="space-y-20 pb-16">
      <PageHero
        eyebrow="Development Centres"
        title="Accelerating capacity for modern local government service delivery."
        description="ESLGSC manages a network of specialised development centres that equip officers with the tools, mindset, and experience required to serve communities effectively."
        actions={(
          <>
            <Button as="a" href="#centres" size="lg">
              Explore centres
            </Button>
            <Button as="a" href="/contact" variant="outline" size="lg">
              Partner with us
            </Button>
          </>
        )}
      >
        <Card className="grid gap-6 bg-white/80 p-6 md:p-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm text-gov-gray-600">
              Every programme blends policy, technology, and practical simulations tailored to Ebonyi State’s development priorities. Officers can customise their learning journey across leadership, digital service, and community engagement tracks.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Centres in operation</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">12</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Training hours (2024)</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">6,400+</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Disciplines covered</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">32</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Average satisfaction</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">94%</p>
            </div>
          </div>
        </Card>
      </PageHero>

      <section id="centres" className="container-custom space-y-12">
        <div className="max-w-2xl space-y-4">
          <Badge variant="green">Flagship locations</Badge>
          <h2 className="heading-lg">Centres engineered for continuous learning and innovation.</h2>
          <p className="text-gov-gray-600">
            Each development centre is built around a strategic theme—governance, innovation, community engagement, or digital service delivery—so that teams can deep-dive into practical skills with measurable impact.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {centers.map((centre) => (
            <Card key={centre.name} className="overflow-hidden">
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={centre.image}
                  alt={centre.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gov-gray-900">{centre.name}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gov-gray-500">
                      <MapPinIcon className="h-4 w-4" />
                      {centre.location}
                    </p>
                  </div>
                  <Badge variant="blue">Capacity: {centre.capacity}</Badge>
                </div>
                <p className="leading-relaxed text-gov-gray-600">{centre.focus}</p>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gov-gray-500">Key facilities</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {centre.facilities.map((facility) => (
                      <li key={facility} className="flex items-center gap-2 text-sm text-gov-gray-600">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gov-blue-500" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="space-y-6 bg-gradient-to-br from-gov-blue-600 to-gov-blue-800 p-8 text-white">
            <div className="flex items-center gap-3">
              <AcademicCapIcon className="h-8 w-8" />
              <h2 className="text-2xl font-semibold">Learning pathways</h2>
            </div>
            <p className="text-white/80">
              Officers can chart personalised learning journeys—combining leadership, technical, and community engagement modules—aligned with their career level and departmental goals.
            </p>
            <div className="grid gap-4 text-sm">
              <div className="flex items-center gap-3">
                <UsersIcon className="h-5 w-5" />
                Cohort-based peer learning circles.
              </div>
              <div className="flex items-center gap-3">
                <CpuChipIcon className="h-5 w-5" />
                Virtual labs for e-governance simulations.
              </div>
              <div className="flex items-center gap-3">
                <BuildingOfficeIcon className="h-5 w-5" />
                Residency programmes for executive leadership teams.
              </div>
            </div>
            <Button
              as="a"
              href="/services"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              View related services
            </Button>
          </Card>

          <div className="space-y-6">
            <h3 className="heading-md">Programmes delivered every quarter.</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {programmes.map((programme) => (
                <Card key={programme.title} className="p-6">
                  <h4 className="mb-2 text-lg font-semibold text-gov-gray-900">{programme.title}</h4>
                  <p className="text-sm leading-relaxed text-gov-gray-600">{programme.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gov-gray-900 py-16 text-white">
        <div className="container-custom space-y-6 text-center">
          <h2 className="text-3xl font-semibold">Collaborate with the development centres</h2>
          <p className="mx-auto max-w-3xl text-white/80">
            We welcome partnerships with ministries, development partners, and training institutions to co-deliver high-impact programmes. Share curriculum ideas, sponsor cohorts, or deploy your facilitators through ESLGSC.
          </p>
          <Button
            as="a"
            href="mailto:training@eslgsc.gov.ng"
            size="lg"
            className="bg-white text-gov-blue-700 hover:bg-gov-gray-100"
          >
            training@eslgsc.gov.ng
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DcPage;