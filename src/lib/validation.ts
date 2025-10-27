import { z } from 'zod'

// Auth validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Profile validation
export const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  title: z.string().min(1, 'Professional title is required').max(100),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(2000),
  email: z.string().email('Invalid email').optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
})

// Project validation
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  technologies: z.array(z.string()).default([]),
  projectDate: z.string().optional().nullable(),
  visibility: z.enum(['public', 'private', 'unlisted', 'password']),
  password: z.string().optional(),
  isFeatured: z.boolean().default(false),
  demoUrl: z.string().url('Invalid demo URL').optional().or(z.literal('')).nullable(),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')).nullable(),
})

// Skill validation
export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50),
  categoryId: z.string().uuid('Invalid category'),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  yearsExperience: z.number().int().min(0).max(50).optional().nullable(),
})

// Skill Category validation
export const skillCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50),
})

// Experience validation
export const experienceSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(100),
  jobTitle: z.string().min(1, 'Job title is required').max(100),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'freelance']),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})

// Education validation
export const educationSchema = z.object({
  institutionName: z.string().min(1, 'Institution name is required').max(100),
  degree: z.string().min(1, 'Degree is required').max(100),
  fieldOfStudy: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  gpa: z.number().min(0).max(5).optional().nullable(),
  achievements: z.string().optional().nullable(),
})

// Testimonial validation
export const testimonialSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters').max(500),
  personName: z.string().min(1, 'Person name is required').max(100),
  personRole: z.string().min(1, 'Person role is required').max(100),
  company: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
})

// Social Link validation
export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required').max(50),
  url: z.string().url('Invalid URL'),
})

// Contact Form validation
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

// Site Settings validation
export const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1, 'Site title is required').max(100),
  metaDescription: z.string().max(160).optional().nullable(),
  themeColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
  contactFormEnabled: z.boolean().default(true),
  notificationEmail: z.string().email('Invalid email').optional().nullable(),
})

// Change Password validation
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})
