import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { 
  AcademicCapIcon, 
  BanknotesIcon, 
  UsersIcon,
  NewspaperIcon,
  ArrowRightIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const services = [
    {
      icon: AcademicCapIcon,
      title: 'Seminars & Training',
      description: 'Professional development programs for local government staff',
      href: '/services'
    },
    {
      icon: BanknotesIcon,
      title: 'Grants & Funding',
      description: 'Financial support for community development projects',
      href: '/services'
    },
    {
      icon: UsersIcon,
      title: 'Recruitment Services',
      description: 'Transparent and merit-based employment processes',
      href: '/services'
    }
  ];

  const slides = [
    {
      image: '/launch-picture-with-ministers.jpg',
      title: 'Ebonyi State Local Government Service Commission',
      subtitle: 'Rural Remuneration Programme'
    },
    {
      image: '/rebasing-coverpicture-052024.jpg',
      title: 'Ebonyi State Local Government Service Commission',
      subtitle: 'Community Revitalization Scheme'
    },
    {
      image: '/226.jpg',
      title: 'Ebonyi State Local Government Service Commission',
      subtitle: 'Youth Employment Drive'
    },
    {
      image: '/F8uB6jNWcAEj6Ba.jpg',
      title: 'Ebonyi State Local Government Service Commission',
      subtitle: 'Public Health Outreach Programme'
    },
    {
      image: '/abuja-with-sg.jpg',
      title: 'Ebonyi State Local Government Service Commission',
      subtitle: 'Cultural Heritage Preservation Project'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Swiper */}
      <section className="relative h-[600px] md:h-[700px] bg-gov-gray-900">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img 
                  src={slide.image} 
                  alt={slide.subtitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container-custom">
                    <div className="max-w-2xl">
                      <Card variant="glass" className="p-8 md:p-10">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight text-balance">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-6">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Button size="lg" as={Link} to="/services">
                            View Services
                          </Button>
                          <Button variant="outline" size="lg" as={Link} to="/about" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                            Learn More
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">
                About ESLGSC
              </h2>
              <p className="text-lg text-gov-gray-600 leading-relaxed mb-6">
                The Ebonyi State Local Government Service Commission is the statutory body 
                responsible for the administration, management, and development of local 
                government personnel across all 13 Local Government Areas in Ebonyi State.
              </p>
              <p className="text-gov-gray-600 leading-relaxed mb-6">
                Established to ensure transparency, professionalism, and excellence in local 
                governance, we are committed to building a robust workforce that delivers 
                quality services to our communities.
              </p>
              <Button as={Link} to="/about" variant="outline">
                Read More About Us
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/commissionBuilding.jpg" 
                alt="Commission Building" 
                className="rounded-xl shadow-lg w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-16 md:py-20 bg-gov-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Services</h2>
            <p className="text-lg text-gov-gray-600 max-w-2xl mx-auto">
              Comprehensive support for local government operations and community development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gov-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gov-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gov-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link 
                    to={service.href}
                    className="text-gov-blue-600 hover:text-gov-blue-700 font-medium inline-flex items-center transition-colors"
                  >
                    Learn more
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-10">
            <Button size="lg" as={Link} to="/services">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="heading-lg mb-2">Latest News & Updates</h2>
              <p className="text-gov-gray-600">Stay informed about our activities and programs</p>
            </div>
            <Button variant="outline" as={Link} to="/news-and-updates" className="hidden sm:inline-flex">
              <NewspaperIcon className="w-4 h-4 mr-2" />
              View All News
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={`/pic${item}.jpg`} 
                  alt={`News image ${item} - Community development`} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-xs text-gov-gray-500 mb-2">October {item}, 2025</div>
                  <h3 className="text-lg font-semibold text-gov-gray-900 mb-3 line-clamp-2">
                    Community Development Initiative Phase {item} Launched
                  </h3>
                  <p className="text-gov-gray-600 text-sm mb-4 line-clamp-3">
                    ESLGSC announces new programs to enhance service delivery and community engagement across all local governments.
                  </p>
                  <Link 
                    to="/news-and-updates"
                    className="text-gov-blue-600 hover:text-gov-blue-700 font-medium text-sm inline-flex items-center transition-colors"
                  >
                    Read more
                    <ArrowRightIcon className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline" as={Link} to="/news-and-updates">
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links / CTA */}
      <section className="py-16 md:py-20 bg-gov-blue-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <PhotoIcon className="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 className="text-xl font-semibold mb-3">Gallery</h3>
              <p className="text-white/80 mb-4">
                View our photo and video collection
              </p>
              <Button variant="outline" as={Link} to="/gallery" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Visit Gallery
              </Button>
            </div>
            
            <div>
              <UsersIcon className="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 className="text-xl font-semibold mb-3">Local Governments</h3>
              <p className="text-white/80 mb-4">
                Explore our 13 local government areas
              </p>
              <Button variant="outline" as={Link} to="/local-governments" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View LGAs
              </Button>
            </div>
            
            <div>
              <AcademicCapIcon className="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 className="text-xl font-semibold mb-3">Development Centers</h3>
              <p className="text-white/80 mb-4">
                Learn about our training facilities
              </p>
              <Button variant="outline" as={Link} to="/development-centers" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Explore Centers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
