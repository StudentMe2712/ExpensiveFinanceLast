export interface Application {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  loanAmount: number;
  comment?: string | null;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  loanAmount: number;
  comment?: string;
}

export interface Content {
  id: string;
  section: string;
  title?: string;
  content: string;
  updatedAt: Date;
}

export interface News {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SENT_TO_BANK = 'SENT_TO_BANK',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  telegram: string;
  address?: string;
}
