export type VisibilityType = 'public' | 'private' | 'unlisted' | 'password'

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface ProjectWithImages {
  id: string
  title: string
  slug: string
  description: string
  technologies: string[]
  projectDate: Date | null
  visibility: string
  uniqueLinkId: string | null
  isFeatured: boolean
  displayOrder: number
  demoUrl: string | null
  githubUrl: string | null
  createdAt: Date
  updatedAt: Date
  images: ProjectImage[]
}

export interface ProjectImage {
  id: string
  projectId: string
  imageUrl: string
  isFeatured: boolean
  displayOrder: number
  createdAt: Date
}

export interface SkillWithCategory {
  id: string
  name: string
  proficiency: string
  yearsExperience: number | null
  iconUrl: string | null
  displayOrder: number
  category: {
    id: string
    name: string
  }
}

export interface SkillsByCategory {
  [categoryName: string]: SkillWithCategory[]
}
