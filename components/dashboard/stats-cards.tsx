'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
      title: 'Total Users',
      value: stats.totalUsers,
      description: 'All registered users',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      description: 'Currently active users',
    },
    {
      title: 'Total Roles',
      value: stats.totalRoles,
      description: 'Available user roles',
    },
    {
      title: 'Permissions',
      value: stats.totalPermissions,
      description: 'Total permissions granted',
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}