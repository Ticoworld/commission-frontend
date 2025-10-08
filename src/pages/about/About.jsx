import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Local Government Areas Served', value: '13' },
  { label: 'Development Centres Coordinated', value: '37' },
  { label: 'Workforce Supported Statewide', value: '12,400+' },
  { label: 'Capacity-Building Hours in 2024', value: '18,600+' }
];

const values = [
  {
    title: 'Service Excellence',
    description: 'We champion professional standards and responsive public service delivery across every local government secretariat.',
    icon: SparklesIcon
  },
  {
    title: 'Transparency & Accountability',
    description: 'Our processes are open, data-backed, and benchmarked against national public-sector reforms.',
    icon: ShieldCheckIcon
  },
  {
    title: 'People-Centred Governance',
    description: 'We invest in our workforce and communities, ensuring that policies reflect real local needs.',
    icon: UsersIcon
  },
  {
    title: 'Innovation & Digital Transformation',
    description: 'Modern digital tools power recruitment, records, and performance analytics for reliable decision-making.',
    icon: ChartBarIcon
  }
];

const timeline = [
  {
    year: '1991',
    title: 'Commission Inaugurated',
    description: 'Established following the creation of Ebonyi State to professionalise local government administration.'
  },
  {
    year: '2005',
    title: 'Unified Service Framework',
    description: 'Introduced harmonised HR policies, pension structures, and promotion guidelines across all LGAs.'
  },
  {
    year: '2016',
    title: 'Digital HR Migration',
    description: 'Rolled out biometric verification and an electronic records register covering over 11,000 personnel.'
  },
  {
    year: '2023',
    title: 'ESLGSC Transformation Agenda',
    description: 'Launched strategic reforms for leadership development, service automation, and community accountability.'
  }
];

const leadership = [
  {
    name: 'Chief. Romanus Okemini Nwasum',
    role: 'Chairman LGSC',
    image: '/pic1.jpg'
  },
  {
    name: 'Mrs. Okezie Juliet',
    role: 'HPM ICT LGSC',
    image: '/pic2.jpg'
  },
  {
    name: 'Mr Egwu Ernest Otu',
    role: 'Cashier LGSC',
    image: '/pic3.jpg'
  },
  {
    name: 'Mrs Nene I Chijioke-Alum',
    role: 'HPM III LGSC',
    image: '/pic4.jpg'
  },
  {
    name: 'Mrs Chinyere G Okorie',
    role: 'Director of Agriculture (HOD)',
    image: '/pic5.jpg'
  },
  {
    name: 'Mr Alphonsus C Anyigor',
    role: 'Director of Admin and Gen. Service (Sir. of Training)',
    image: '/pic6.jpg'
  },
  {
    name: 'Mrs Stella Nwagu',
    role: 'Director of Education & Social Welfare (HOD)',
    image: '/pic7.jpg'
  },
  {
    name: 'Mr Emma Ogbu Ituma',
    role: 'HPM IV LGSC',
    image: '/pic8.jpg'
  },
  {
    name: 'Mr Alex E Iduma',
    role: 'HPM II LGSC',
    image: '/pic9.jpg'
  },
  {
    name: 'Mrs Bridget N Jioke',
    role: 'Internal Auditor LGSC',
    image: '/pic10.jpg'
  },
  {
    name: 'Nnachi Rachael Orie',
    role: 'HPM LGSC',
    image: '/pic11.jpg'
  },
  {
    name: 'Mrs Edith Eze',
    role: 'HPM ICT LGSC',
    image: '/pic12.jpg'
  },
  {
    name: 'Mrs Amaka Eucharia Larry-Udu',
    role: 'HPM Pension LGSC',
    image: '/pic13.jpg'
  },
  {
    name: 'Mr Paulinus A Okafor',
    role: 'HPM (PRS) LGSC',
    image: '/F8uB6jNWcAEj6Ba.jpg'
  }
];

const About = () => {
  return (
    <div className="pb-20 space-y-20">
      <PageHero
        eyebrow="About the Commission"
        title="Building an agile, accountable, and people-focused local government service in Ebonyi State."
        description="The Ebonyi State Local Government Service Commission (ESLGSC) provides leadership, oversight, and professional support to the teams delivering grassroots services across the state. From recruitment and training to welfare, performance, and pensions, we empower every local government worker to serve with excellence."
        actions={
          <>
            <Button as="a" href="#mission" size="lg">
              Our Mission &amp; Vision
            </Button>
            <Button as="a" href="#leadership" variant="outline" size="lg">
              Meet the Leadership
            </Button>
          </>
        }
      />

      <section className="container-custom">
        <Card className="p-8 bg-white/80">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h2 className="heading-md mb-4">At a Glance</h2>
              <p className="text-gov-gray-600 leading-relaxed">
                ESLGSC coordinates policy implementation across 13 local government areas, 37 development centres, and dozens of community-facing initiatives.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg border border-gov-gray-200 p-4 text-center">
                  <div className="text-2xl font-semibold text-gov-blue-700">{item.value}</div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gov-gray-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="container-custom grid gap-8 lg:grid-cols-2">
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <BuildingOffice2Icon className="w-10 h-10 text-gov-blue-600" />
            <div>
              <h2 className="heading-md mb-3">Our Mission</h2>
              <p className="text-gov-gray-600 leading-relaxed">
                To nurture a motivated and highly skilled local government workforce that delivers inclusive,
                people-centred services, drives community development, and upholds the values of accountability,
                transparency, and responsive governance.
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <GlobeAltIcon className="w-10 h-10 text-gov-green-600" />
            <div>
              <h2 className="heading-md mb-3">Our Vision</h2>
              <p className="text-gov-gray-600 leading-relaxed">
                To become a benchmark public service institution recognised for inspiring innovation, ethical leadership,
                and sustainable development at the grassroots level throughout Ebonyi State.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="max-w-2xl mb-10">
            <Badge variant="green" className="mb-3">Our Values</Badge>
            <h2 className="heading-lg mb-4">Principles guiding every decision.</h2>
            <p className="text-gov-gray-600">
              ESLGSC’s mandate is delivered through a set of shared values that anchor policy design, service delivery,
              and stakeholder engagement across all departments.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gov-blue-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gov-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gov-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gov-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="container-custom grid gap-8 lg:grid-cols-[1fr_1fr]">
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <AcademicCapIcon className="w-10 h-10 text-gov-blue-600" />
            <div>
              <h3 className="heading-sm mb-3">Talent &amp; Capability Development</h3>
              <p className="text-gov-gray-600">
                Continuous training, leadership coaching, and structured career pathways ensure that local government staff
                can thrive in a modern public service environment.
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <div className="flex items-start gap-4">
            <ShieldCheckIcon className="w-10 h-10 text-gov-green-600" />
            <div>
              <h3 className="heading-sm mb-3">Governance &amp; Compliance</h3>
              <p className="text-gov-gray-600">
                We drive policy implementation, ethics enforcement, and evidence-based decision-making across the service
                to sustain trust and citizen satisfaction.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-gov-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-2xl mb-10">
            <Badge variant="blue" className="mb-3">Leadership</Badge>
            <h2 className="heading-lg mb-4">Guided by experienced public sector leaders.</h2>
            <p className="text-gov-gray-600">
              The commission’s executive team combines decades of governance, HR, and administrative expertise to
              deliver results that matter for communities.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="group relative overflow-hidden rounded-2xl bg-gov-gray-900/5 shadow-sm"
              >
                <figure className="relative aspect-[3/4] sm:aspect-[4/5]">
                  <img
                    src={leader.image}
                    alt={`Portrait of ${leader.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <p className="text-base font-semibold text-white">{leader.name}</p>
                    <p className="text-sm text-white/80">{leader.role}</p>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-custom">
        <Card className="p-8">
          <Badge variant="gray" className="mb-4">Milestones</Badge>
          <h2 className="heading-lg mb-8">Three decades of grassroots service transformation.</h2>
          <div className="space-y-8 border-l border-gov-gray-200 pl-6">
            {timeline.map((event) => (
              <div key={event.year} className="relative">
                <span className="absolute -left-[33px] mt-1 w-3 h-3 rounded-full border-2 border-gov-blue-600 bg-white" />
                <p className="text-sm font-semibold uppercase tracking-wide text-gov-blue-600">{event.year}</p>
                <h3 className="text-xl font-semibold text-gov-gray-900 mt-1 mb-2">{event.title}</h3>
                <p className="text-gov-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Call to action */}
      <section className="bg-gov-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-semibold mb-4">Partner with ESLGSC</h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            We collaborate with ministries, development partners, civil society organisations, and local communities
            to co-create responsive governance programmes. Let’s work together to accelerate grassroots development
            across Ebonyi State.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button as="a" href="/contact" size="lg" className="bg-white text-gov-blue-700 hover:bg-gov-gray-100">
              Contact the Commission
            </Button>
            <Button
              as="a"
              href="/services"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Explore Our Programmes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;