import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Get admin credentials from environment
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'

  // Hash password
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  // Create admin user
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
    },
  })
  console.log('✅ Created admin user:', user.email)

  // Create default profile
  const profile = await prisma.profile.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      fullName: 'Your Name',
      title: 'Full Stack Developer',
      bio: 'Welcome to my portfolio! Update this section in the admin dashboard to tell your story.',
      email: 'your@email.com',
      phone: null,
      location: 'Your City, Country',
    },
  })
  console.log('✅ Created default profile')

  // Create default skill categories
  const categories = [
    { name: 'Frontend', displayOrder: 1 },
    { name: 'Backend', displayOrder: 2 },
    { name: 'Tools', displayOrder: 3 },
    { name: 'Soft Skills', displayOrder: 4 },
  ]

  for (const cat of categories) {
    await prisma.skillCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    })
  }
  console.log('✅ Created default skill categories')

  // Create default site settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      siteTitle: 'My Portfolio',
      metaDescription: 'Welcome to my professional portfolio showcasing my work and skills.',
      themeColor: '#1976d2',
      contactFormEnabled: true,
      notificationEmail: adminEmail,
    },
  })
  console.log('✅ Created default site settings')

  console.log('🎉 Seed completed successfully!')
  console.log('📧 Admin Email:', adminEmail)
  console.log('🔑 Admin Password:', adminPassword)
  console.log('⚠️  Please change the password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
