import { useMemo, useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import PageHero from '../../components/common/PageHero';
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'services', label: 'Services & Programmes' },
  { value: 'complaints', label: 'Complaints & Ethics' },
  { value: 'careers', label: 'Careers & Recruitment' }
];

const faqData = {
  general: [
    {
      question: 'What is the mandate of the Ebonyi State Local Government Service Commission?',
      answer: 'ESLGSC oversees recruitment, promotion, discipline, training, and welfare of local government staff. We coordinate policy implementation, monitor service delivery outcomes, and support development centres across the 13 LGAs.'
    },
    {
      question: 'How can I contact the commission for official correspondence?',
      answer: 'You can reach us via info@eslgsc.gov.ng, call +234 (0) 803 555 0100, or visit the ESLGSC Complex, Abakaliki. Our reception desk is open Monday to Friday, 8:00 AM – 5:00 PM.'
    }
  ],
  services: [
    {
      question: 'Do you provide training for local government staff?',
      answer: 'Yes. Through our 12 development centres we offer leadership, digital service, and community engagement programmes. Officers can register via their HR departments or through the intranet portal.'
    },
    {
      question: 'How do communities benefit from ESLGSC programmes?',
      answer: 'We coordinate community outreach, service clinics, and transparency forums that bring citizens together with service desk leads. Data gathered feeds into reforms, resource allocation, and improvement plans.'
    }
  ],
  complaints: [
    {
      question: 'How can I report misconduct or poor service delivery?',
      answer: 'Submit a report through the Complaints & Reports page, email reportdesk@eslgsc.gov.ng, or call +234 (0) 803 555 0101. Anonymous tips are welcome and logged in our secure case management system.'
    },
    {
      question: 'What happens after I lodge a complaint?',
      answer: 'You receive a reference ID (if contact details are provided). Cases are triaged within 48 hours, assigned to an investigation officer, and monitored until resolution. Updates are shared through your preferred channel.'
    }
  ],
  careers: [
    {
      question: 'How do I apply for jobs within the local government service?',
      answer: 'Visit the Careers section on our portal or follow official announcements in national dailies. Applications are handled through a secure recruitment platform that supports merit-based selection and interview scheduling.'
    },
    {
      question: 'Does the commission run graduate trainee programmes?',
      answer: 'Yes. The Ebonyi Local Government Talent Pipeline (ELG-TP) opens annually. Shortlisted candidates receive training at our development centres before deployment to LGAs.'
    }
  ]
};

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const faqs = useMemo(() => faqData[selectedCategory] || [], [selectedCategory]);

  return (
    <div className="space-y-20 pb-16">
      <PageHero
        eyebrow="Support"
        title="Answers to the most common questions about ESLGSC services and support."
        description="We keep our knowledge base updated so citizens, staff, and partners can get quick clarification."
        actions={(
          <>
            <Button as="a" href="#faq-list" size="lg">
              Browse FAQs
            </Button>
            <Button as="a" href="mailto:support@eslgsc.gov.ng" variant="outline" size="lg">
              Email support team
            </Button>
          </>
        )}
      >
        <Card className="max-w-xl bg-white/80 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <QuestionMarkCircleIcon className="h-10 w-10 text-gov-blue-600" />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gov-gray-900">Need personalised help?</h2>
              <p className="text-sm text-gov-gray-600">
                Our Servicom desk offers one-on-one support for citizens, staff, and partners Monday to Friday, 8:00 AM – 5:00 PM.
              </p>
            </div>
          </div>
        </Card>
      </PageHero>

      <section id="faq-list" className="container-custom space-y-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              aria-pressed={selectedCategory === category.value}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <Card className="p-6 md:p-8">
          <div className="space-y-4">
            {faqs.map((item) => (
              <Disclosure key={item.question}>
                {({ open }) => (
                  <div className="border-b border-gov-gray-200 last:border-none">
                    <Disclosure.Button className="w-full py-4 text-left">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-gov-gray-900">{item.question}</span>
                        <ChevronDownIcon
                          className={`h-5 w-5 text-gov-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-200 ease-out"
                      enterFrom="transform -translate-y-2 opacity-0"
                      enterTo="transform translate-y-0 opacity-100"
                      leave="transition duration-150 ease-in"
                      leaveFrom="transform translate-y-0 opacity-100"
                      leaveTo="transform -translate-y-1 opacity-0"
                    >
                      <Disclosure.Panel className="pb-4 text-sm leading-relaxed text-gov-gray-600">
                        {item.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </Card>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Card className="space-y-4 bg-gradient-to-br from-gov-blue-600 to-gov-blue-800 p-8 text-white">
            <div className="flex items-start gap-3">
              <ChatBubbleLeftRightIcon className="h-10 w-10" />
              <div>
                <h2 className="text-2xl font-semibold">Still need clarity?</h2>
                <p className="mt-1 text-white/80">Book a virtual helpdesk session with our Servicom officers.</p>
              </div>
            </div>
            <Button
              as="a"
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              size="lg"
              className="bg-white text-gov-blue-700 hover:bg-gov-gray-100"
            >
              Schedule a call
            </Button>
          </Card>
          <Card className="space-y-4 p-8">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-10 w-10 text-gov-blue-600" />
              <div>
                <h2 className="text-2xl font-semibold text-gov-gray-900">Policy Library</h2>
                <p className="text-sm text-gov-gray-500">Access circulars, guidelines, and templates</p>
              </div>
            </div>
            <p className="text-sm text-gov-gray-600">
              Visit our documentation portal for downloadable policy documents, circulars, HR templates, and reporting formats.
              Files are updated quarterly in collaboration with the Ministry of Local Government &amp; Chieftaincy Matters.
            </p>
            <Button as="a" href="#" variant="outline" size="sm" className="w-fit">
              Open policy library
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Faq;