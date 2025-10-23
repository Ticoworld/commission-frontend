import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Button from '../ui/Button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Units & Centers', 
    href: '#',
    children: [
      { name: 'Development Centers', href: '/development-centers' },
      { name: 'Local Governments', href: '/local-governments' }
    ]
  },
  { 
    name: 'Administration', 
    href: '#',
    children: [
      { name: 'Services', href: '/services' },
      { name: 'News & Updates', href: '/news-and-updates' },
      { name: 'Gallery', href: '/gallery' }
    ]
  },
  { 
    name: 'Contact', 
    href: '#',
    children: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Complaints & Reports', href: '/complaints' },
      { name: 'FAQ', href: '/faq' }
    ]
  }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      role="banner"
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled 
          ? 'bg-white shadow-md' 
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
  <nav role="navigation" aria-label="Primary navigation" className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/cropped-Kwara-Vector-logo-1.webp" 
              alt="ESLGSC Logo" 
              className="h-10 w-10 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gov-blue-800 leading-tight">
                ESLGSC
              </div>
              <div className="text-xs text-gov-gray-600">
                Ebonyi State LG Service Commission
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const hasChildren = Boolean(item.children);
              const childIsActive = hasChildren && item.children.some((child) => location.pathname.startsWith(child.href));

              if (hasChildren) {
                return (
                  <Menu as="div" key={item.name} className="relative">
            <Menu.Button
              aria-haspopup="true"
              className={clsx(
                        'px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center space-x-1',
                        childIsActive
                          ? 'text-gov-blue-700 bg-gov-gray-50'
                          : 'text-gov-gray-700 hover:text-gov-blue-700 hover:bg-gov-gray-50'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Menu.Item key={child.name}>
                            {({ active }) => {
                              const isCurrent = location.pathname.startsWith(child.href);
                              return (
                                <Link
                                  to={child.href}
                                  aria-current={isCurrent ? 'page' : undefined}
                                  className={clsx(
                                    'block px-4 py-2 text-sm transition-colors',
                                    active || isCurrent
                                      ? 'bg-gov-gray-50 text-gov-blue-700'
                                      : 'text-gov-gray-700'
                                  )}
                                >
                                  {child.name}
                                </Link>
                              );
                            }}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                );
              }

              const isCurrent = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    isCurrent
                      ? 'text-gov-blue-700 bg-gov-gray-50'
                      : 'text-gov-gray-700 hover:text-gov-blue-700 hover:bg-gov-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Login Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/login')}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Login
            </Button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden text-gov-gray-700 hover:text-gov-blue-700 transition-colors"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <div className="lg:hidden border-t border-gov-gray-200 bg-white">
          <div className="container-custom py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <Menu as="div" className="relative">
                    {({ open }) => (
                      <>
                        <Menu.Button aria-haspopup="true" className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gov-gray-700 hover:bg-gov-gray-50 rounded-md transition-colors">
                          <span>{item.name}</span>
                          <ChevronDownIcon 
                            className={clsx('w-4 h-4 transition-transform', open && 'rotate-180')} 
                          />
                        </Menu.Button>
                        <Menu.Items className="mt-1 ml-4 space-y-1">
                          {item.children.map((child) => (
                            <Menu.Item key={child.name}>
                              <Link
                                to={child.href}
                                onClick={() => setMobileMenuOpen(false)}
                                aria-current={location.pathname.startsWith(child.href) ? 'page' : undefined}
                                className={clsx(
                                  'block px-4 py-2 text-sm rounded-md transition-colors',
                                  location.pathname.startsWith(child.href)
                                    ? 'bg-gov-gray-50 text-gov-blue-700'
                                    : 'text-gov-gray-600 hover:text-gov-blue-700 hover:bg-gov-gray-50'
                                )}
                              >
                                {child.name}
                              </Link>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </>
                    )}
                  </Menu>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    className={clsx(
                      'block px-4 py-2 text-sm font-medium rounded-md transition-colors',
                      location.pathname === item.href
                        ? 'bg-gov-gray-50 text-gov-blue-700'
                        : 'text-gov-gray-700 hover:bg-gov-gray-50'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              size="sm"
              className="w-full sm:hidden"
            >
              Login
            </Button>
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
