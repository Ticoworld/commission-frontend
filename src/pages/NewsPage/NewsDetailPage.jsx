import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, TagIcon, ShareIcon } from '@heroicons/react/24/outline';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const NewsDetailPage = () => {
  const { id } = useParams();

  // TODO: Replace with API fetch by id
  const article = {
    id: Number(id) || 1,
    title: 'ESLGSC Unveils 2025-2027 Strategic Transformation Agenda',
    content: `
      <p>The Ebonyi State Local Government Service Commission has launched a comprehensive three-year roadmap focusing on service digitisation, leadership pipelines, and community accountability across all 13 Local Government Areas.</p>
      <p>Speaking at the unveiling ceremony held at the Commission's headquarters in Abakaliki, the Chairman emphasized the Commission's commitment to modernizing local government operations and improving service delivery to citizens.</p>
      <h2>Key Pillars of the Transformation Agenda</h2>
      <ul>
        <li><strong>Digital Service Delivery:</strong> Implementation of e-governance platforms across all LGAs.</li>
        <li><strong>Leadership Development:</strong> Comprehensive training programs for local government staff.</li>
        <li><strong>Community Accountability:</strong> Establishment of feedback mechanisms and citizen engagement forums.</li>
        <li><strong>Workforce Optimization:</strong> Strategic recruitment and deployment of qualified personnel.</li>
      </ul>
      <p>The Commission has allocated resources to ensure successful implementation, with quarterly review mechanisms to track progress and adjust strategies as needed.</p>
    `,
    date: 'September 18, 2025',
    category: 'policy',
    image: '/vertexbuilding.png',
    author: 'ESLGSC Communications Team'
  };

  return (
    <div className="pb-20">
      <div className="bg-gov-gray-50 py-4 border-b border-gov-gray-200">
        <div className="container-custom">
          <Link to="/news-and-updates" className="inline-flex items-center text-sm text-gov-blue-600 hover:text-gov-blue-700">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to News & Updates
          </Link>
        </div>
      </div>

      <div className="container-custom py-12">
        <article className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div>
              <Badge variant="blue" className="uppercase tracking-wide">{article.category}</Badge>
            </div>

            <h1 className="heading-xl">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gov-gray-600">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <TagIcon className="w-5 h-5" />
                <span>By {article.author}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg">
              <img src={article.image} alt={article.title} className="w-full h-auto object-cover" />
            </div>

            <div className="prose prose-lg max-w-none prose-headings:text-gov-blue-800 prose-a:text-gov-blue-600 prose-strong:text-gov-gray-900" dangerouslySetInnerHTML={{ __html: article.content }} />

            <div className="border-t border-gov-gray-200 pt-6 mt-12">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gov-gray-700">Share this article</span>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}>
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="heading-md mb-8">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <img src="/pic6.jpg" alt="Related article" className="w-full h-40 object-cover" />
              <div className="p-4">
                <Badge variant="blue" className="mb-2">Policy</Badge>
                <h3 className="font-semibold text-gov-gray-900 mb-2 line-clamp-2">Performance Management Framework Update</h3>
                <Link to="/news-and-updates/2" className="text-sm text-gov-blue-600 hover:text-gov-blue-700">Read more →</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
