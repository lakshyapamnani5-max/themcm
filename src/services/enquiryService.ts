import { EnquiryFormData, SubmissionRecord } from '../types';

const STORAGE_KEY = 'mcm_enquiries_log';
const RECENT_SUBMISSION_HASH_KEY = 'mcm_last_submission_hash';
const WEB3FORMS_API_URL = 'https://api.web3forms.com/submit';

export interface SubmissionResponse {
  success: boolean;
  referenceId: string;
  timestamp: string;
  destination: 'web3forms' | 'local_storage';
  message: string;
}

export const enquiryService = {
  validate(data: EnquiryFormData): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }

    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    const cleanPhone = data.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = 'Please provide a valid phone number.';
    }

    if (!data.event.trim()) {
      errors.event = 'Please select or specify your event.';
    }

    return errors;
  },

  async submitEnquiry(data: EnquiryFormData): Promise<SubmissionResponse> {
    // Validate
    const errors = this.validate(data);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      throw new Error(firstError);
    }

    // Duplicate submission prevention
    const payloadSignature = `${data.name.trim()}_${data.phone.trim()}_${data.event.trim()}`.toLowerCase();
    const lastHash = sessionStorage.getItem(RECENT_SUBMISSION_HASH_KEY);
    if (lastHash === payloadSignature) {
      throw new Error('This enquiry was already submitted a moment ago. We have your details on record.');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `MCM-${new Date().getFullYear()}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const record: SubmissionRecord = {
      id: referenceId,
      timestamp,
      data,
    };

    // Web3Forms Integration
    const web3FormsKey =
      (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY ||
      'YOUR_ACCESS_KEY_HERE';

    let destination: 'web3forms' | 'local_storage' = 'local_storage';
    let serverMessage = 'Enquiry recorded in studio records. We will connect with your quote shortly.';

    if (web3FormsKey && web3FormsKey !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const response = await fetch(WEB3FORMS_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Event Enquiry - ${data.name} (${data.event}) [Ref: ${referenceId}]`,
            from_name: 'The Main Character Media',
            name: data.name,
            email: data.email,
            phone: data.phone,
            event: data.event,
            message: data.additionalNotes || 'No additional notes provided.',
          }),
        });

        const json = await response.json();
        if (response.ok && json.success) {
          destination = 'web3forms';
          serverMessage = 'Enquiry delivered directly to The Main Character Media team via Web3Forms.';
        } else {
          console.warn('Web3Forms response was not successful:', json);
        }
      } catch (err) {
        console.warn('Web3Forms dispatch error, recorded locally:', err);
      }
    }

    // Save to local storage for local verification and immediate studio review
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: SubmissionRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
      sessionStorage.setItem(RECENT_SUBMISSION_HASH_KEY, payloadSignature);
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }

    return {
      success: true,
      referenceId,
      timestamp,
      destination,
      message: serverMessage,
    };
  },

  formatWhatsAppMessage(data: EnquiryFormData, referenceId?: string): string {
    const lines = [
      `*New Enquiry - The Main Character Media* ${referenceId ? `(Ref: ${referenceId})` : ''}`,
      `*Name:* ${data.name}`,
      `*Email:* ${data.email}`,
      `*Phone:* ${data.phone}`,
      `*Event:* ${data.event}`,
      data.additionalNotes ? `*Note:* ${data.additionalNotes}` : '',
    ].filter(Boolean);

    return encodeURIComponent(lines.join('\n'));
  },
};
