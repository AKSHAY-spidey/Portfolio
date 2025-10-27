export const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'unlisted', label: 'Unlisted' },
  { value: 'password', label: 'Password Protected' },
] as const

export const PROFICIENCY_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
] as const

export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
] as const

export const DEFAULT_SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Tools',
  'Soft Skills',
] as const

export const MAX_PROJECT_IMAGES = 5
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_PDF_SIZE = 10 * 1024 * 1024 // 10MB
