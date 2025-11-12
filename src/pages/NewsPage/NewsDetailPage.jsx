import { useParams, Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNewsBySlug } from '../../services/newsService';
import Skeleton from '../../components/ui/Skeleton';
import { ArrowLeftIcon, CalendarIcon, TagIcon, ShareIcon } from '@heroicons/react/24/outline';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['news', 'public', slug],
    queryFn: () => getNewsBySlug(slug)
  });

  if (isLoading) {
    return <div className="container-custom py-12 max-w-3xl mx-auto"><Skeleton rows={8} /></div>;
  }

  // If not found or not published, redirect to public listing
  if (isError || !article || article.status !== 'published') {
    return <Navigate to="/news-and-updates" replace />;
  }

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
                <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString()}</time>
              </div>
              <div className="flex items-center gap-2">
                <TagIcon className="w-5 h-5" />
                <span>By {article.authorName || 'Media Team'}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg">
              <img src={article.imageUrl || '/images/hero/hero6.jpg'} alt={article.title} className="w-full h-auto object-cover" />
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
              <img src="/images/gallery/image16.jpg" alt="Related article" className="w-full h-40 object-cover" />
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
