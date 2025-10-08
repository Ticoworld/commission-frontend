/**
 * Application constants
 */

export const USER_ROLES = {
  SUPER: 'SUPER',
  ADMIN: 'ADMIN',
  MEDIA: 'MEDIA',
  AUDIT: 'AUDIT',
  LGA: 'LGA'
};

export const RETIREMENT_WARNING_DAYS = {
  CRITICAL: 30,  // 30 days or less
  WARNING: 90,   // 31-90 days
  NORMAL: 180    // 91-180 days
};

export const NEWS_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const AUDIT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const SERVICE_CATEGORIES = [
  { value: 'seminars', label: 'Seminars & Training' },
  { value: 'grants', label: 'Grants & Funding' },
  { value: 'programs', label: 'Community Programs' },
  { value: 'recruitment', label: 'Recruitment Services' },
  { value: 'pension', label: 'Pension & Benefits' },
  { value: 'documentation', label: 'Documentation' }
];

export const DEPARTMENTS = [
  'Administration',
  'Finance',
  'Human Resources',
  'Information Technology',
  'Legal',
  'Operations',
  'Public Relations',
  'Audit',
  'Planning'
];

export const POSITIONS = [
  'Director',
  'Assistant Director',
  'Chief Officer',
  'Principal Officer',
  'Senior Officer',
  'Officer I',
  'Officer II',
  'Assistant Officer',
  'Support Staff'
];
