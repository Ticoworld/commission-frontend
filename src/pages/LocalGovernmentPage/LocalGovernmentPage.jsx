import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import {
  BuildingOffice2Icon,
  ChartBarIcon,
  MapIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const lgas = [
  { name: 'Abakaliki', headquarters: 'Abakaliki', population: '195,300', developmentCentres: 3, focus: 'Urban infrastructure renewal and digital service desks.' },
  { name: 'Ebonyi', headquarters: 'Ugbodo', population: '176,400', developmentCentres: 3, focus: 'Agricultural value chains and revenue automation.' },
  { name: 'Ohaukwu', headquarters: 'Ezzamgbo', population: '198,700', developmentCentres: 3, focus: 'Cross-border trade facilitation and workforce mobility.' },
  { name: 'Ezza North', headquarters: 'Ebonyi', population: '158,900', developmentCentres: 3, focus: 'Youth empowerment and civic participation programmes.' },
  { name: 'Ezza South', headquarters: 'Onueke', population: '149,200', developmentCentres: 3, focus: 'Public health outreach and education support.' },
  { name: 'Ikwo', headquarters: 'Onuebonyi Echara', population: '212,400', developmentCentres: 3, focus: 'ICT innovation labs and open governance forums.' },
  { name: 'Ivo', headquarters: 'Isiaka', population: '148,100', developmentCentres: 2, focus: 'Rural remuneration and workforce housing schemes.' },
  { name: 'Izzi', headquarters: 'Iboko', population: '209,900', developmentCentres: 3, focus: 'Agricultural cooperatives and irrigation programmes.' },
  { name: 'Afikpo North', headquarters: 'Afikpo', population: '176,500', developmentCentres: 2, focus: 'Tourism development and citizen service kiosks.' },
  { name: 'Afikpo South', headquarters: 'Nguzu Edda', population: '135,200', developmentCentres: 2, focus: 'Coastal resilience and community engagement clinics.' },
  { name: 'Onicha', headquarters: 'Isu', population: '167,400', developmentCentres: 2, focus: 'Women in governance fellowship and SME support.' },
  { name: 'Ohaozara', headquarters: 'Obiozara', population: '156,300', developmentCentres: 2, focus: 'Pension harmonisation and staff welfare schemes.' },
  { name: 'Ishielu', headquarters: 'Ezillo', population: '141,800', developmentCentres: 2, focus: 'Road maintenance brigades and safety audits.' }
];

const LocalGovernmentPage = () => {
  return (
    <div className="space-y-20 pb-16">
      <PageHero
        eyebrow="Local Governments"
        title="13 Local Government Areas working together for inclusive development."
        description="ESLGSC provides strategic oversight, workforce support, and performance monitoring for every Local Government Area in Ebonyi State."
        actions={(
          <>
            <Button as="a" href="#directory" size="lg">
              View LGA directory
            </Button>
            <Button as="a" href="/contact" variant="outline" size="lg">
              Request stakeholder briefing
            </Button>
          </>
        )}
      >
        <Card className="grid gap-6 bg-white/80 p-6 md:p-8 lg:grid-cols-2">
          <p className="text-sm text-gov-gray-600">
            Explore the priorities, development centres, and flagship initiatives underway across the federation. Our teams provide weekly dashboards to guide interventions and support.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Population served</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">2.9M+</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Staff across LGAs</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">12,400</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Development centres</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">37</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Strategic programmes</p>
              <p className="mt-1 text-3xl font-semibold text-gov-blue-700">52</p>
            </div>
          </div>
        </Card>
      </PageHero>

      <section id="directory" className="container-custom space-y-10">
        <div className="max-w-2xl space-y-4">
          <Badge variant="green">Directory</Badge>
          <h2 className="heading-lg">Snapshot of Ebonyi State Local Government Areas.</h2>
          <p className="text-gov-gray-600">
            Each entry highlights the headquarters, estimated population, number of development centres coordinated by ESLGSC, and the current strategic focus driving service delivery.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lgas.map((lga) => (
            <Card key={lga.name} className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gov-gray-900">{lga.name} LGA</h3>
                  <p className="mt-1 text-sm text-gov-gray-500">Headquarters: {lga.headquarters}</p>
                </div>
                <Badge variant="blue">{lga.developmentCentres} D/Centres</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-gov-gray-600">
                <UsersIcon className="h-5 w-5 text-gov-blue-500" />
                <span>Population: {lga.population}</span>
              </div>
              <p className="text-sm leading-relaxed text-gov-gray-600">{lga.focus}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <Card className="space-y-6 p-8">
            <div className="flex items-center gap-3">
              <MapIcon className="h-10 w-10 text-gov-blue-600" />
              <div>
                <h2 className="text-2xl font-semibold text-gov-gray-900">Interactive service map</h2>
                <p className="text-sm text-gov-gray-500">Live 2025 rollout</p>
              </div>
            </div>
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-gov-gray-100 text-center text-gov-gray-500">
              <div>
                <BuildingOffice2Icon className="mx-auto mb-3 h-12 w-12" />
                <p>Map visualisation of local government projects is coming soon.</p>
                <p className="text-sm">Overlay population data, project status, and service desk reach.</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-6 bg-gradient-to-br from-gov-blue-600 to-gov-blue-800 p-8 text-white">
            <div className="flex items-center gap-3">
              <ChartBarIcon className="h-10 w-10" />
              <div>
                <h2 className="text-2xl font-semibold">Performance analytics</h2>
                <p className="text-sm text-white/80">Monthly dashboards</p>
              </div>
            </div>
            <p className="text-white/80">
              Scorecards monitor budget absorption, project milestones, staff deployment, and citizen satisfaction per LGA. Reports are shared with chairpersons, development partners, and civil society every month.
            </p>
            <Button
              as="a"
              href="mailto:analytics@eslgsc.gov.ng"
              size="lg"
              className="bg-white text-gov-blue-700 hover:bg-gov-gray-100"
            >
              Request dashboard access
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LocalGovernmentPage;