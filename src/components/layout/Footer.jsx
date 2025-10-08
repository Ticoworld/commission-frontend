import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'News & Updates', href: '/news-and-updates' },
      { name: 'Gallery', href: '/gallery' }
    ],
    units: [
      { name: 'Development Centers', href: '/development-centers' },
      { name: 'Local Governments', href: '/local-governments' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Complaints & Reports', href: '/complaints' }
    ]
  };

  return (
    <footer className="bg-gov-blue-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/cropped-Kwara-Vector-logo-1.webp" 
                alt="ESLGSC" 
                className="h-10 w-10"
              />
              <div>
                <div className="font-bold text-lg">ESLGSC</div>
                <div className="text-xs text-gov-blue-200">Since 1991</div>
              </div>
            </div>
            <p className="text-sm text-gov-blue-100 leading-relaxed">
              Ebonyi State Local Government Service Commission - Committed to excellence 
              in public service delivery and local governance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-gov-blue-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Units */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Units</h3>
            <ul className="space-y-2">
              {footerLinks.units.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-gov-blue-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mt-6 mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-gov-blue-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-gov-blue-100">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Local Government Service Commission Complex,<br />
                  Abakaliki, Ebonyi State, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gov-blue-100">
                <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                <span>+234 (0) 803 XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gov-blue-100">
                <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                <span>info@eslgsc.gov.ng</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gov-blue-700 mt-8 pt-6 text-center text-sm text-gov-blue-200">
          <p>
            &copy; {currentYear} Ebonyi State Local Government Service Commission. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
