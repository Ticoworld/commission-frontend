import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import PageHero from '../../components/common/PageHero';
import {
  EnvelopeIcon,
  PhoneIcon,
  ShieldExclamationIcon,
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const complaintTypes = [
  { value: 'service-quality', label: 'Service Quality' },
  { value: 'staff-conduct', label: 'Staff Conduct' },
  { value: 'corruption', label: 'Fraud / Corruption' },
  { value: 'accessibility', label: 'Access to Service' },
  { value: 'other', label: 'Other' }
];

const preferredChannels = [
  { value: 'email', label: 'Email Response' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'physical-meeting', label: 'Physical Meeting' }
];

const Complaint = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setStatus(null);

    // TODO: Replace with API integration
    setTimeout(() => {
      console.log('Complaint submitted:', data);
      setStatus('success');
      setIsSubmitting(false);
      reset();
    }, 1600);
  };

  return (
    <div className="space-y-20 pb-16">
      <PageHero
        eyebrow="Complaints & Reports"
        title="Speak up. We are committed to a responsive, accountable local government service."
        description="Use this channel to report misconduct, service gaps, or commendable experiences within Ebonyi State Local Government Service Commission."
        actions={(
          <>
            <Button as="a" href="#complaint-form" size="lg">
              Submit a report
            </Button>
            <Button as="a" href="tel:+2348035550101" variant="outline" size="lg">
              Call oversight desk
            </Button>
          </>
        )}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <ShieldExclamationIcon className="h-6 w-6 text-gov-blue-600" />
              <div>
                <h3 className="font-semibold text-gov-gray-900">Anonymous tips welcome</h3>
                <p className="mt-1 text-sm text-gov-gray-600">
                  You can withhold personal details. We protect whistle-blowers and keep your identity secure.
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gov-blue-600" />
              <div>
                <h3 className="font-semibold text-gov-gray-900">Status updates</h3>
                <p className="mt-1 text-sm text-gov-gray-600">
                  Provide contact details if you wish to receive acknowledgement and resolution updates.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PageHero>

      <section className="container-custom" id="complaint-form">
        <Card className="p-8 lg:p-12 space-y-8">
          <div className="space-y-3">
            <h2 className="heading-lg">Submit a complaint or report</h2>
            <p className="max-w-3xl text-gov-gray-600">
              Provide as much detail as possible so we can investigate and respond quickly. A reference ID will be generated
              automatically once the report is logged in our system.
            </p>
          </div>

          {status === 'success' && (
            <Alert variant="success">
              Thank you. Your report has been received. A case officer will review it and contact you if follow-up is required.
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Select
                label="Type of Issue"
                required
                placeholder="Select issue category"
                options={complaintTypes}
                error={errors.issueType?.message}
                {...register('issueType', { required: 'Please choose an issue type' })}
              />
              <Select
                label="Preferred Update Channel"
                placeholder="How should we contact you?"
                options={preferredChannels}
                {...register('channel')}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Full Name"
                placeholder="Optional"
                {...register('name')}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Optional"
                {...register('phone')}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Email Address"
                type="email"
                placeholder="Optional"
                {...register('email')}
              />
              <Input
                label="LGA or Office concerned"
                placeholder="e.g. Afikpo North LGA"
                {...register('location')}
              />
            </div>

            <Textarea
              label="Details of the Complaint"
              required
              rows={6}
              placeholder="Describe the issue, when it occurred, people involved, and any evidence available."
              error={errors.details?.message}
              {...register('details', { required: 'Please describe the incident' })}
            />

            <Textarea
              label="Suggested action or additional notes"
              rows={4}
              placeholder="Optional: let us know how this has affected citizens or services, or share additional context."
              {...register('notes')}
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gov-gray-500">
                By submitting this form you consent to ESLGSC processing the information provided solely for investigation and response.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit report'}
              </Button>
            </div>
          </form>
        </Card>
      </section>

      <section className="bg-gov-gray-900 py-16 text-white">
        <div className="container-custom">
          <Card className="grid gap-6 bg-white/5 p-8 text-white md:grid-cols-[0.6fr_1fr]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Need immediate assistance?</h2>
              <p className="text-white/80">
                Our oversight team is available Monday to Friday, 8:00 AM – 5:00 PM, to respond to urgent issues related to service integrity, staff conduct, or local government processes.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/85">
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5" />
                +234 (0) 803 555 0101
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5" />
                reportdesk@eslgsc.gov.ng
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5" />
                <span>
                  Servicom &amp; Compliance Desk,<br />
                  Local Government Service Commission Complex, Abakaliki.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Complaint;