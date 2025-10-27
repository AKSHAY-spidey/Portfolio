# Portfolio Management System

A modern, full-featured portfolio website with an admin dashboard for managing all your content. Built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

## Features

### Public Portfolio Website
- **Professional Landing Page** - Showcases your work with smooth scrolling sections
- **Projects Gallery** - Display your work with images, descriptions, and live demo links
- **Skills Section** - Organized by categories with proficiency levels
- **Experience Timeline** - Your work history with company logos and descriptions
- **Education Section** - Academic background and certifications
- **Testimonials** - Client and colleague recommendations
- **Contact Form** - Visitors can reach out directly through your site
- **Responsive Design** - Mobile-friendly and accessible

### Admin Dashboard
- **Secure Authentication** - Protected admin area with NextAuth.js
- **Content Management** - Full CRUD operations for all content types
- **Profile Management** - Update your bio, photo, contact information
- **Project Management** - Add/edit projects with multiple images
- **Skills Management** - Organize skills by custom categories
- **Permission System** - Control project visibility (Public, Private, Unlisted, Password-protected)
- **Real-time Updates** - Changes appear immediately on the public site
- **File Uploads** - Support for images and PDFs

### Permission System
Projects can have four visibility levels:
- **Public** - Visible to everyone on the homepage
- **Private** - Only visible when logged in as admin
- **Unlisted** - Accessible only via unique shareable link
- **Password-protected** - Requires custom password to view

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQLite (dev) / PostgreSQL (production)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form + Zod validation
- **File Storage:** Vercel Blob (optional)
- **Email:** Resend (optional)
- **Icons:** React Icons
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   # Database (SQLite for development)
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"  # Generate: openssl rand -base64 32

   # Vercel Blob (optional - for file uploads)
   BLOB_READ_WRITE_TOKEN=""

   # Resend (optional - for contact form emails)
   RESEND_API_KEY=""
   RESEND_FROM_EMAIL="noreply@yourdomain.com"

   # Admin credentials
   ADMIN_EMAIL="admin@portfolio.com"
   ADMIN_PASSWORD="changeme123"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   DATABASE_URL="file:./dev.db" npx prisma migrate dev

   # Seed initial data
   DATABASE_URL="file:./dev.db" npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Public site: http://localhost:3000
   - Admin login: http://localhost:3000/login
   - Admin dashboard: http://localhost:3000/admin

   **Default credentials:**
   - Email: `admin@portfolio.com`
   - Password: `changeme123`

## Project Structure

```
Portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── admin/         # Admin-only endpoints
│   │   │   ├── profile/       # Profile endpoints
│   │   │   ├── projects/      # Projects endpoints
│   │   │   ├── skills/        # Skills endpoints
│   │   │   ├── experience/    # Experience endpoints
│   │   │   ├── education/     # Education endpoints
│   │   │   ├── testimonials/  # Testimonials endpoints
│   │   │   ├── social-links/  # Social links endpoints
│   │   │   ├── contact/       # Contact form endpoint
│   │   │   └── settings/      # Site settings endpoint
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── login/             # Login page
│   │   ├── projects/          # Public project pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── admin/            # Admin-specific components
│   │   ├── public/           # Public site components
│   │   └── shared/           # Reusable components
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   ├── validation.ts     # Zod schemas
│   │   ├── email.ts          # Email functions
│   │   ├── storage.ts        # File upload functions
│   │   ├── utils.ts          # General utilities
│   │   └── constants.ts      # App constants
│   ├── types/                 # TypeScript types
│   └── middleware.ts          # Route protection
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migrations
│   └── seed.ts              # Seed script
├── public/                    # Static assets
├── .env.local                # Environment variables (not in git)
├── .env.example              # Example environment file
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
└── next.config.js            # Next.js config
```

## Database Schema

The application uses 11 tables:
- `users` - Admin authentication
- `profile` - Personal information
- `projects` - Portfolio projects with visibility controls
- `project_images` - Images for projects
- `skill_categories` - Skill organization
- `skills` - Individual skills with proficiency levels
- `experience` - Work history
- `education` - Academic background
- `testimonials` - Recommendations
- `social_links` - Social media profiles
- `contact_messages` - Contact form submissions
- `site_settings` - Global site configuration

## Admin Dashboard

### Accessing the Dashboard

1. Navigate to `/login`
2. Enter your admin credentials
3. You'll be redirected to `/admin`

### Managing Content

**Profile/About:**
- Update your name, title, bio, photo
- Add social media links
- Upload resume/CV

**Projects:**
- Create new projects with title, description, technologies
- Upload up to 5 images per project
- Set visibility (Public/Private/Unlisted/Password-protected)
- Add demo and GitHub repository links
- Mark projects as featured

**Skills:**
- Organize skills by categories
- Set proficiency levels (Beginner/Intermediate/Advanced/Expert)
- Add years of experience
- Upload skill icons

**Experience:**
- Add work history with company details
- Set employment type and dates
- Mark current positions
- Upload company logos

**Education:**
- Add degrees and certifications
- Include GPA and achievements
- Upload institution logos

**Testimonials:**
- Add client/colleague recommendations
- Mark testimonials as featured
- Upload person photos

**Settings:**
- Configure site title and meta description
- Set theme color
- Enable/disable contact form
- Set notification email for contact form

### Content Workflow

1. **Initial Setup:**
   - Complete your profile in the About section
   - Add your skills organized by categories
   - Add your work experience and education

2. **Add Projects:**
   - Create your first project
   - Upload project images
   - Set visibility to Public to display on homepage
   - Add demo links and GitHub repositories

3. **Customize:**
   - Configure site settings (title, theme, etc.)
   - Add testimonials if available
   - Set up contact form notifications

4. **Publish:**
   - View the public site to see your changes
   - Share project links with specific people using Unlisted visibility

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy

3. **Set up PostgreSQL**
   - Use Vercel Postgres or external provider (Neon, Supabase)
   - Update `DATABASE_URL` in Vercel environment variables
   - Update Prisma schema datasource to `postgresql`
   - Run migrations: `npx prisma migrate deploy`

4. **Configure Vercel Blob (Optional)**
   - Enable Blob storage in Vercel project settings
   - Add `BLOB_READ_WRITE_TOKEN` to environment variables

5. **Configure Resend (Optional)**
   - Sign up at [resend.com](https://resend.com)
   - Verify your domain
   - Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to environment variables

## API Routes

### Public Endpoints

- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get public projects
- `GET /api/skills` - Get all skills grouped by category
- `GET /api/experience` - Get work experience
- `GET /api/education` - Get education
- `GET /api/testimonials` - Get testimonials
- `GET /api/social-links` - Get social media links
- `GET /api/settings` - Get public site settings
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Require Authentication)

- `PATCH /api/admin/profile` - Update profile
- `GET /api/admin/projects` - Get all projects (including private)
- `POST /api/admin/projects` - Create project
- `PATCH /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Delete project
- `POST /api/admin/upload` - Upload file

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Prisma commands
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed database
```

### Adding New Features

1. **Database Changes:**
   - Update `prisma/schema.prisma`
   - Run `npx prisma migrate dev --name description`
   - Generate client: `npx prisma generate`

2. **API Routes:**
   - Add route handler in `src/app/api/`
   - Use Zod validation for input
   - Return consistent response format: `{ success: boolean, data?, error? }`

3. **Admin Pages:**
   - Add page in `src/app/admin/`
   - Protected automatically by middleware
   - Use shared components for consistency

## Troubleshooting

### Database Issues

**Migration fails:**
```bash
# Reset database (WARNING: deletes all data)
DATABASE_URL="file:./dev.db" npx prisma migrate reset

# Or manually delete database and re-migrate
rm prisma/dev.db
DATABASE_URL="file:./dev.db" npx prisma migrate dev
```

**Prisma Client not generated:**
```bash
npx prisma generate
```

### Authentication Issues

**Can't login:**
- Check credentials match those in seed output
- Verify `NEXTAUTH_SECRET` is set in `.env.local`
- Try resetting password via seed script

**Redirected to login repeatedly:**
- Clear browser cookies
- Check middleware configuration in `src/middleware.ts`

### Build Errors

**Type errors:**
```bash
# Check TypeScript configuration
npm run lint

# Regenerate Prisma types
npx prisma generate
```

## Security Considerations

- **Passwords:** Change default admin password immediately after first login
- **Environment Variables:** Never commit `.env.local` to version control
- **NEXTAUTH_SECRET:** Generate a strong secret for production
- **File Uploads:** Validate file types and sizes on both client and server
- **Rate Limiting:** Consider adding rate limiting to contact form in production

## Contributing

This is a personal portfolio system. Feel free to fork and customize for your own use.

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues and questions:
1. Check this README
2. Review the planning document in the repository
3. Open an issue on GitHub

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
