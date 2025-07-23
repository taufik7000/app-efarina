'use client'

import { useEffect, useState } from 'react'
import { UsersIcon, ShieldCheckIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface StatsData {
  totalUsers: number
  activeUsers: number
  totalRoles: number
  totalPermissions: number
}

export function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
    totalPermissions: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch('/api/users', { credentials: 'include' }),
        fetch('/api/roles', { credentials: 'include' })
      ])

      if (usersRes.ok && rolesRes.ok) {
        const usersData = await usersRes.json()
        const rolesData = await rolesRes.json()

        const activeUsers = usersData.users.filter((user: any) => user.isActive).length
        const totalPermissions = rolesData.roles.reduce((acc: number, role: any) => 
          acc + role.permissions.length, 0
        )

        setStats({
          totalUsers: usersData.users.length,
          activeUsers,
          totalRoles: rolesData.roles.length,
          totalPermissions
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsItems = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Total Roles',
      value: stats.totalRoles,
      icon: ShieldCheckIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Permissions',
      value: stats.totalPermissions,
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsItems.map((item) => (
        <div key={item.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${item.bgColor} mr-4`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}