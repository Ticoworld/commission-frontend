import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import api from '../../services/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/announcements');
        setAnnouncements(res.data ?? []);
      } catch (err) {
        console.error('Failed to load announcements', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      <PageHero
        eyebrow="Public updates"
        title="Announcements for citizens, partners, and local government staff."
        description="Stay informed about policy notices, recruitment timelines, trainings, and other important updates from ESLGSC."
        actions={(
          <Button as="a" href="/news-and-updates" variant="outline" size="lg">
            Visit news &amp; updates
          </Button>
        )}
      />

      <section className="container-custom">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-24 w-full animate-pulse rounded-lg bg-gov-gray-100" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-gov-gray-100" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-gov-gray-100" />
          </div>
        ) : announcements.length === 0 ? (
          <Card className="p-8 text-center text-gov-gray-600">
            No announcements are currently available. Please check back soon.
          </Card>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="space-y-3 p-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gov-gray-900">{announcement.title}</h2>
                  <p className="text-xs uppercase tracking-wide text-gov-gray-500">
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gov-gray-600">{announcement.content}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Announcements;
