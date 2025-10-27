'use client'

import { useEffect, useState } from 'react'
import { FiFolder, FiCode, FiBriefcase, FiBookOpen, FiEye, FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'
import Loading from '@/components/shared/Loading'

interface Stats {
  totalProjects: number
  publicProjects: number
  privateProjects: number
  totalSkills: number
  totalExperience: number
  totalEducation: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projects, skills, experience, education] = await Promise.all([
        fetch('/api/admin/projects').then((res) => res.json()),
        fetch('/api/skills').then((res) => res.json()),
        fetch('/api/experience').then((res) => res.json()),
        fetch('/api/education').then((res) => res.json()),
      ])

      const projectsData = projects.data || []
      const skillsData = Object.values(skills.data || {}).flat()

      setStats({
        totalProjects: projectsData.length,
        publicProjects: projectsData.filter((p: any) => p.visibility === 'public').length,
        privateProjects: projectsData.filter((p: any) => p.visibility === 'private').length,
        totalSkills: skillsData.length,
        totalExperience: experience.data?.length || 0,
        totalEducation: education.data?.length || 0,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading size="lg" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your portfolio admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Projects"
          value={stats?.totalProjects || 0}
          subtitle={`${stats?.publicProjects || 0} public, ${stats?.privateProjects || 0} private`}
          icon={FiFolder}
          color="blue"
        />
        <StatCard
          title="Skills"
          value={stats?.totalSkills || 0}
          subtitle="Across all categories"
          icon={FiCode}
          color="green"
        />
        <StatCard
          title="Experience"
          value={stats?.totalExperience || 0}
          subtitle="Work positions"
          icon={FiBriefcase}
          color="purple"
        />
        <StatCard
          title="Education"
          value={stats?.totalEducation || 0}
          subtitle="Degrees & certifications"
          icon={FiBookOpen}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionButton href="/admin/projects" icon={FiFolder}>
            Manage Projects
          </ActionButton>
          <ActionButton href="/admin/skills" icon={FiCode}>
            Manage Skills
          </ActionButton>
          <ActionButton href="/admin/about" icon={FiEye}>
            Edit Profile
          </ActionButton>
          <ActionButton href="/" icon={FiExternalLink} external>
            View Public Site
          </ActionButton>
        </div>
      </div>

      {/* Setup reminder */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
        <ul className="space-y-2 text-blue-800">
          <li>1. Update your profile in the About section</li>
          <li>2. Add your skills and organize them by category</li>
          <li>3. Create your first project and add images</li>
          <li>4. Configure site settings (theme, contact email, etc.)</li>
          <li>5. View your public portfolio to see your changes</li>
        </ul>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  subtitle: string
  icon: React.ElementType
  color: 'blue' | 'green' | 'purple' | 'orange'
}

function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
    </div>
  )
}

interface ActionButtonProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  external?: boolean
}

function ActionButton({ href, icon: Icon, children, external }: ActionButtonProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Icon className="h-5 w-5 text-gray-500 mr-3" />
      <span className="text-sm font-medium text-gray-700">{children}</span>
    </Link>
  )
}
