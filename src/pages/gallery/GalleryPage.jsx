import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import {
  CameraIcon,
  PhotoIcon,
  PlayCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const categories = [
  { value: 'all', label: 'All Moments' },
  { value: 'events', label: 'Official Events' },
  { value: 'community', label: 'Community Impact' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'infrastructure', label: 'Infrastructure' }
];

const galleryItems = [
  {
    id: 1,
    src: '/launch-picture-with-ministers.jpg',
    title: 'Commissioners Strategy Retreat',
    description: 'Executive leadership convened to co-create the 2025 service delivery agenda.',
    category: 'leadership'
  },
  {
    id: 2,
    src: '/seminar1.jpg',
    title: 'Capacity Building Workshop',
    description: 'Training facilitators engaging senior administrative officers in a digital governance module.',
    category: 'events'
  },
  {
    id: 3,
    src: '/pic3.jpg',
    title: 'Community Outreach in Afikpo',
    description: 'Grassroots consultation with women leaders on inclusive service delivery.',
    category: 'community'
  },
  {
    id: 4,
    src: '/rebasing-coverpicture-052024.jpg',
    title: 'Development Centres Showcase',
    description: 'Showcasing modern training aids deployed across all 12 development centres.',
    category: 'infrastructure'
  },
  {
    id: 5,
    src: '/abuja-with-sg.jpg',
    title: 'National Collaboration Visit',
    description: 'Engagement with the Federal Civil Service Commission for shared reforms.',
    category: 'leadership'
  },
  {
    id: 6,
    src: '/pic5.jpg',
    title: 'ICT Upgrade Commissioning',
    description: 'Launch of the Ikwo Digital Innovation Lab and new service desks.',
    category: 'infrastructure'
  },
  {
    id: 7,
    src: '/pic7.jpg',
    title: 'Youth Empowerment Hub',
    description: 'Young professionals completing the public service mentorship programme.',
    category: 'community'
  },
  {
    id: 8,
    src: '/pic9.jpg',
    title: 'Field Monitoring Exercise',
    description: 'Joint monitoring by ESLGSC and citizens groups to track project delivery.',
    category: 'events'
  },
  {
    id: 9,
    src: '/seminar3.jpg',
    title: 'Policy Co-creation Lab',
    description: 'Facilitators guiding officers through scenario planning workshops.',
    category: 'events'
  },
  {
    id: 10,
    src: '/pic2.jpg',
    title: 'Women in Service Forum',
    description: 'Highlighting the leadership journey of women across Ebonyi’s LGAs.',
    category: 'community'
  },
  {
    id: 11,
    src: '/pic10.jpg',
    title: 'Commission Headquarters',
    description: 'The ESLGSC complex—nerve centre for policy, HR, and reform initiatives.',
    category: 'infrastructure'
  },
  {
    id: 12,
    src: '/pic12.jpg',
    title: 'Service Excellence Awards',
    description: 'Recognising outstanding officers who exceeded service delivery benchmarks.',
    category: 'leadership'
  }
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pb-20 space-y-16">
      <PageHero
        eyebrow="Media Hub"
        title="Stories of transformation from Ebonyi’s local governments."
        description="Explore photo and video highlights from ESLGSC’s programmes, development centre activities, and community engagements. Each moment captures progress toward a responsive and people-focused public service."
        actions={
          <>
            <Button as="a" href="#collection" size="lg">
              View Collection
            </Button>
            <Button as="a" href="mailto:media@eslgsc.gov.ng" variant="outline" size="lg">
              Submit Media
            </Button>
          </>
        }
      />

      <section className="container-custom">
        <Card className="p-8 bg-white/85 space-y-6">
          <div className="flex items-center gap-3">
            <PhotoIcon className="w-10 h-10 text-gov-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gov-gray-900">Media Quick Facts</h2>
              <p className="text-sm text-gov-gray-500">Snapshot of our growing archive</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Images curated</p>
              <p className="text-3xl font-semibold text-gov-blue-700 mt-1">850+</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Video features</p>
              <p className="text-3xl font-semibold text-gov-blue-700 mt-1">65</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Annual storytelling projects</p>
              <p className="text-3xl font-semibold text-gov-blue-700 mt-1">18</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gov-gray-500">Community submissions</p>
              <p className="text-3xl font-semibold text-gov-blue-700 mt-1">220</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <section id="collection" className="container-custom space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="capitalize"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="relative h-64 w-full">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="blue" className="mb-2">{item.category}</Badge>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Media features */}
      <section className="bg-white py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
          <Card className="p-8 space-y-6 bg-gradient-to-br from-gov-blue-600 to-gov-blue-800 text-white">
            <div className="flex items-center gap-3">
              <PlayCircleIcon className="w-10 h-10" />
              <div>
                <h2 className="text-2xl font-semibold">ESLGSC Video Library</h2>
                <p className="text-white/80 text-sm">Documentaries &amp; field stories</p>
              </div>
            </div>
            <p className="text-white/80">
              Watch mini-documentaries, project spotlights, and interviews with officers delivering grassroots services.
              curated monthly with subtitles and translation notes.
            </p>
            <Button
              as="a"
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              size="lg"
              className="bg-white text-gov-blue-700 hover:bg-gov-gray-100"
            >
              Open Video Library
            </Button>
          </Card>
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <CameraIcon className="w-10 h-10 text-gov-blue-600" />
              <div>
                <h2 className="text-2xl font-semibold text-gov-gray-900">Media Collaboration Desk</h2>
                <p className="text-sm text-gov-gray-500">Partner with our communications team</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-gov-gray-600">
              <li className="flex items-start gap-2">
                <SparklesIcon className="w-5 h-5 text-gov-blue-500 mt-0.5" />
                Co-produce features on reform milestones and citizen impact stories.
              </li>
              <li className="flex items-start gap-2">
                <SparklesIcon className="w-5 h-5 text-gov-blue-500 mt-0.5" />
                Access archival footage, infographics, and media briefs for reportage.
              </li>
              <li className="flex items-start gap-2">
                <SparklesIcon className="w-5 h-5 text-gov-blue-500 mt-0.5" />
                Invite ESLGSC spokespersons for expert commentary and civic education programmes.
              </li>
            </ul>
            <Button as="a" href="mailto:media@eslgsc.gov.ng" variant="outline" size="lg">
              media@eslgsc.gov.ng
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;