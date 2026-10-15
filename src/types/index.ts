export interface ReelItem {
  id: string;
  reelId: string; // Instagram reel code e.g. DSp5Kb8jOUrMYHnkgC8MRZUcmueVU6vYpbioU40
  title: string;
  category: string;
  instagramUrl: string;
  directVideoUrl?: string;
  posterImage: string;
  description: string;
  date?: string;
  location?: string;
  duration?: string;
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export interface RatePackage {
  id: string;
  name: string;
  category: string;
  popular?: boolean;
  priceNote: string;
  description: string;
  coverage: string;
  functions: string;
  deliverables: string[];
  addons: string[];
  termsNote: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  event: string;
  additionalNotes?: string;
}

export interface SubmissionRecord {
  id: string;
  timestamp: string;
  data: EnquiryFormData;
}
