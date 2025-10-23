import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import EmptyState from '../../components/ui/EmptyState';
import {
  NewspaperIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const categories = [
  { value: 'all', label: 'All Updates' },
  { value: 'policy', label: 'Policy & Governance' },
  { value: 'programmes', label: 'Programmes & Events' },
  { value: 'community', label: 'Community Impact' },
  { value: 'careers', label: 'Careers & Opportunities' }
];

const newsArticles = [
  {
    id: 1,
    title: 'ESLGSC Unveils 2025-2027 Strategic Transformation Agenda',
    summary: 'The commission has launched a three-year roadmap focusing on service digitisation, leadership pipelines, and community accountability across all LGAs.',
    date: 'September 18, 2025',
    category: 'policy',
    image: '/vertexbuilding.png',
    link: '#'
  },
  {
    id: 2,
    title: 'New Performance Management Framework Goes Live in 13 LGAs',
    summary: 'A unified scorecard now tracks project delivery, citizen feedback, and service desk responsiveness across the state.',
    date: 'August 30, 2025',
    category: 'policy',
    image: '/pic6.jpg',
    link: '#'
  },
  {
    id: 3,
    title: 'Development Centres Host Digital Service Bootcamp Series',
    summary: 'Over 420 officers participated in workshops on records automation, analytics dashboards, and digital-first service design.',
    date: 'August 14, 2025',
    category: 'programmes',
    image: '/seminar2.jpg',
    link: '#'
  },
  {
    id: 4,
    title: 'Community Feedback Hubs Launched in Four Pilot LGAs',
    summary: 'The hubs provide citizens with direct channels to report service gaps, track resolutions, and co-create solutions.',
    date: 'July 25, 2025',
    category: 'community',
    image: '/pic4.jpg',
    link: '#'
  },
  {
    id: 5,
    title: 'Recruitment Portal Opens for Graduate Trainee Programme',
    summary: 'Applications are invited from young professionals to join the Ebonyi Local Government Talent Pipeline (ELG-TP).',
    date: 'July 4, 2025',
    category: 'careers',
    image: '/pic13.jpg',
    link: '#'
  },
  {
    id: 6,
    title: 'Commission Partners with Civil Society on Transparency Clinics',
    summary: 'A new partnership with civic organisations will host quarterly transparency forums within service centres.',
    date: 'June 18, 2025',
    category: 'community',
    image: '/pic1.jpg',
    link: '#'
  }
];

  const spotlight = {
  title: 'Special Report: How ESLGSC is digitising grassroots governance',
  description: 'In-depth feature on the new statewide records digitisation programme, highlighting change management, success stories, and what citizens can expect next.',
  image: '/commissionBuilding.jpg',
  link: '/news-and-updates/spotlight'
};

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') return newsArticles;
    return newsArticles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pb-20 space-y-16">
      <PageHero
        eyebrow="Newsroom"
        title="Official news, announcements, and policy insights from ESLGSC."
        description="Stay informed about reforms, programmes, vacancies, and service delivery milestones across Ebonyi State’s 13 Local Government Areas. We publish verified updates weekly and provide media-ready resources."
        actions={
          <>
            <Button as="a" href="#updates" size="lg">
              Browse Latest Updates
            </Button>
            <Button as="a" href="mailto:press@eslgsc.gov.ng" variant="outline" size="lg">
              Media Enquiries
            </Button>
          </>
        }
      />

      <section className="container-custom">
        <Card className="overflow-hidden">
          <div className="h-60 w-full overflow-hidden">
            <img
              src={spotlight.image}
              alt={spotlight.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <Badge variant="green">Spotlight</Badge>
            <h2 className="text-2xl font-semibold text-gov-gray-900">{spotlight.title}</h2>
            <p className="text-gov-gray-600">{spotlight.description}</p>
                <Button as={Link} to={spotlight.link} variant="outline" size="sm">
              Read Special Report
            </Button>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <section id="updates" className="container-custom space-y-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'outline'}
              size="sm"
              className="capitalize"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {filteredNews.length === 0 ? (
            <div className="col-span-3">
              <EmptyState
                title="No news found"
                description="There are no articles matching your filters right now. Check back later or select a different category."
                action={<Button as={Link} to="/news-and-updates" size="sm">Browse all</Button>}
              />
            </div>
          ) : filteredNews.map((article) => (
            <Card key={article.id} className="flex flex-col overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gov-gray-500">
                  <Badge variant="gray" className="capitalize">{article.category}</Badge>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gov-gray-900">{article.title}</h3>
                <p className="text-sm text-gov-gray-600 flex-1">{article.summary}</p>
                <Button as={Link} to={`/news-and-updates/${article.id}`} variant="outline" size="sm" className="self-start">
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Media resources */}
      <section className="bg-white py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <NewspaperIcon className="w-10 h-10 text-gov-blue-600" />
              <div>
                <h2 className="text-2xl font-semibold text-gov-gray-900">Downloadable Resources</h2>
                <p className="text-sm text-gov-gray-500">Briefs, fact sheets, and highlights</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gov-gray-600">
              <li className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-gov-blue-500" />
                Quarterly service delivery scorecards (PDF)
              </li>
              <li className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-gov-blue-500" />
                Media briefs on ongoing reforms (DOCX)
              </li>
              <li className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-gov-blue-500" />
                Photo gallery asset pack (ZIP)
              </li>
            </ul>
            <Button as="a" href="#" size="sm" className="w-fit">
              Request Download Links
            </Button>
          </Card>

          <Card className="p-8 space-y-6 bg-gradient-to-br from-gov-blue-600 to-gov-blue-800 text-white">
            <div className="flex items-center gap-3">
              <MegaphoneIcon className="w-10 h-10" />
              <div>
                <h2 className="text-2xl font-semibold">Press Desk</h2>
                <p className="text-sm text-white/80">Verified statements &amp; interviews</p>
              </div>
            </div>
            <p className="text-white/80">
              Journalists, development partners, and civic groups can schedule interviews with ESLGSC spokespersons
              to discuss reforms, service metrics, and community partnerships.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Verified information and on-record quotes.
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Support for fact-checking and data requests.
              </div>
            </div>
            <Button
              as="a"
              href="mailto:press@eslgsc.gov.ng"
              size="lg"
              className="bg-white text-gov-blue-700 hover:bg-gov-gray-100"
            >
              press@eslgsc.gov.ng
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;