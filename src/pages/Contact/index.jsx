import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import PageHero from '../../components/common/PageHero';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // TODO: Replace with actual API call
    setTimeout(() => {
      console.log('Contact form data:', data);
      setSubmitStatus('success');
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Office Address',
      content: 'Local Government Service Commission Complex, Abakaliki, Ebonyi State, Nigeria'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      content: '+234 (0) 803 XXX XXXX'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      content: 'info@eslgsc.gov.ng'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      content: 'Monday - Friday: 8:00 AM - 5:00 PM'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      <PageHero
        eyebrow="Contact"
        title="We're here to help you navigate local government services."
        description="Reach out to the Ebonyi State Local Government Service Commission for enquiries, partnerships, or citizen support."
        actions={(
          <>
            <Button as="a" href="#contact-form" size="lg">
              Send a message
            </Button>
            <Button as="a" href="tel:+2348035550100" variant="outline" size="lg">
              Call Servicom Desk
            </Button>
          </>
        )}
      >
        <Card className="max-w-xl bg-white/80 p-6 md:p-8">
          <p className="text-sm text-gov-gray-600">
            Visit us at ESLGSC Complex, Abakaliki. Reception is open Monday to Friday, 8:00 AM – 5:00 PM. We reply to all
            emails within two working days.
          </p>
        </Card>
      </PageHero>

      <section className="container-custom space-y-12" id="contact-form">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <h2 className="heading-md">Contact information</h2>
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-blue-100">
                      <Icon className="h-5 w-5 text-gov-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gov-gray-900">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gov-gray-600">{item.content}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 md:p-10">
            <div className="mb-8 space-y-2">
              <h2 className="heading-md">Send us a message</h2>
              <p className="text-sm text-gov-gray-600">
                Complete the form and we will route your enquiry to the appropriate department for a prompt response.
              </p>
            </div>

            {submitStatus === 'success' && (
              <Alert variant="success" className="mb-6">
                Thank you for contacting us! We'll get back to you as soon as possible.
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Full Name"
                  required
                  {...register('name', { required: 'Name is required' })}
                  error={errors.name?.message}
                  placeholder="John Doe"
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Phone Number"
                  type="tel"
                  {...register('phone')}
                  placeholder="+234 XXX XXX XXXX"
                />
                <Input
                  label="Subject"
                  required
                  {...register('subject', { required: 'Subject is required' })}
                  error={errors.subject?.message}
                  placeholder="Inquiry about services"
                />
              </div>

              <Textarea
                label="Message"
                required
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters'
                  }
                })}
                error={errors.message?.message}
                placeholder="Please provide details about your inquiry..."
                rows={6}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="bg-gov-gray-50 py-16">
        <div className="container-custom">
          <Card className="overflow-hidden">
            <div className="flex h-96 w-full items-center justify-center bg-gov-gray-200">
              <div className="text-center text-gov-gray-500">
                <MapPinIcon className="mx-auto mb-2 h-12 w-12" />
                <p>Map integration placeholder</p>
                <p className="text-sm">Google Maps / OpenStreetMap</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
