import React, { useState, useEffect } from 'react';
import { enquiryService, SubmissionResponse } from '../services/enquiryService';
import { EnquiryFormData } from '../types';
import { siteConfig } from '../config/site';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface EnquiryFormProps {
  preselectedEventType?: string;
  preselectedPackage?: string;
  onClearPrefill?: () => void;
}

const EVENT_OPTIONS = [
  'Weddings & Love',
  "Life's Celebrations",
  'Brands & Events',
  'Little Beginnings',
  'Pre-Wedding / Engagement',
  'Other Celebration',
];

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  preselectedEventType,
  preselectedPackage,
  onClearPrefill,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    email: '',
    phone: '',
    event: preselectedEventType || 'Weddings & Love',
    additionalNotes: preselectedPackage ? `Interested in: ${preselectedPackage}` : '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync pre-fills from external clicks (services, rate cards, etc.)
  useEffect(() => {
    if (preselectedEventType) {
      setFormData((prev) => ({
        ...prev,
        event: preselectedEventType,
      }));
    }
  }, [preselectedEventType]);

  useEffect(() => {
    if (preselectedPackage) {
      setFormData((prev) => ({
        ...prev,
        additionalNotes: prev.additionalNotes
          ? `${prev.additionalNotes}\nInterested in: ${preselectedPackage}`
          : `Interested in: ${preselectedPackage}`,
      }));
    }
  }, [preselectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = enquiryService.validate(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      const element = document.getElementById(firstKey);
      element?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await enquiryService.submitEnquiry(formData);
      setSubmissionResult(result);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionResult(null);
    setSubmitError(null);
    setValidationErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      event: 'Weddings & Love',
      additionalNotes: '',
    });
    onClearPrefill?.();
  };

  const getWhatsAppHref = () => {
    const whatsappNum = siteConfig.contact.whatsappNumber || '918446646306';
    const msg = enquiryService.formatWhatsAppMessage(formData, submissionResult?.referenceId);
    return `https://wa.me/${whatsappNum}?text=${msg}`;
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#F5F0E7] text-[#111111] overflow-hidden">
      {/* Decorative Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#111111]/10" />

      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#111111]/60">
            <Sparkles className="w-3.5 h-3.5 text-[#C8B58C]" />
            <span>Connect & Create</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111111] leading-tight">
            YOUR MOMENT. YOUR STORY. LET'S CREATE.
          </h2>

          <p className="text-base sm:text-lg text-[#111111]/75 font-sans leading-relaxed">
            Tell us what you're celebrating. We'll help you turn it into something worth reliving.
          </p>
        </div>

        {/* Pre-fill Tag if external selection was made */}
        {(preselectedEventType || preselectedPackage) && !submissionResult && (
          <div className="mt-8 p-3 rounded-md bg-[#EAE2D2] border border-[#C8B58C]/40 text-xs text-[#111111] flex items-center justify-between">
            <span className="font-sans">
              Selected: <strong>{preselectedPackage || preselectedEventType}</strong>
            </span>
            <button
              onClick={onClearPrefill}
              className="text-[#111111]/60 hover:text-[#111111] underline text-[11px] font-mono uppercase"
            >
              Clear
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#111111]/10 shadow-xl">
          {submissionResult ? (
            /* Success Confirmation State */
            <div className="space-y-6 py-6 text-center" role="status" aria-live="polite">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#111111] text-[#C8B58C] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C8B58C] bg-[#111111] px-3 py-1 rounded-xs">
                  Reference: {submissionResult.referenceId}
                </span>

                <h3 className="font-serif text-3xl font-medium text-[#111111] pt-2">
                  Enquiry Received
                </h3>

                <p className="text-sm text-[#111111]/80 font-sans leading-relaxed">
                  {submissionResult.message}
                </p>
              </div>

              {/* Direct WhatsApp Pre-send Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#1eb857] transition-colors shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
                  </svg>
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#111111]/20 text-[#111111] text-xs font-semibold tracking-wider uppercase hover:bg-[#111111]/5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another</span>
                </button>
              </div>
            </div>
          ) : (
            /* Streamlined 5-Field Form (Web3Forms Compatible) */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {submitError && (
                <div
                  className="p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* 1. Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3.5 bg-[#F5F0E7]/60 border rounded-xs text-sm text-[#111111] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111] transition-all ${
                    validationErrors.name ? 'border-red-400 bg-red-50/50' : 'border-[#111111]/20'
                  }`}
                  aria-required="true"
                  aria-invalid={!!validationErrors.name}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-[11px] text-red-600">{validationErrors.name}</p>
                )}
              </div>

              {/* 2 & 3. Email and Phone in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3.5 bg-[#F5F0E7]/60 border rounded-xs text-sm text-[#111111] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111] transition-all ${
                      validationErrors.email ? 'border-red-400 bg-red-50/50' : 'border-[#111111]/20'
                    }`}
                    aria-required="true"
                    aria-invalid={!!validationErrors.email}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-[11px] text-red-600">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3.5 bg-[#F5F0E7]/60 border rounded-xs text-sm text-[#111111] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111] transition-all ${
                      validationErrors.phone ? 'border-red-400 bg-red-50/50' : 'border-[#111111]/20'
                    }`}
                    aria-required="true"
                    aria-invalid={!!validationErrors.phone}
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-[11px] text-red-600">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* 4. Event */}
              <div>
                <label htmlFor="event" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-2">
                  Event / Occasion <span className="text-red-500">*</span>
                </label>
                <select
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#F5F0E7]/60 border border-[#111111]/20 rounded-xs text-sm text-[#111111] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111]"
                >
                  {EVENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Additional Note */}
              <div>
                <label htmlFor="additionalNotes" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-2">
                  Additional Note
                </label>
                <textarea
                  id="additionalNotes"
                  name="message"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Share details about dates, venue, or your creative ideas..."
                  className="w-full px-4 py-3.5 bg-[#F5F0E7]/60 border border-[#111111]/20 rounded-xs text-sm text-[#111111] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#111111] leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#111111] text-[#F5F0E7] text-xs font-bold tracking-[0.18em] uppercase rounded-xs hover:bg-[#242424] transition-all duration-200 disabled:opacity-50 active:scale-98 shadow-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8B58C] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#C8B58C] border-t-transparent rounded-full animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-3.5 h-3.5 text-[#C8B58C]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
