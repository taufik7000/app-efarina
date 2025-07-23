'use client'

import { useAuth } from '@/lib/auth-context'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your admin panel today.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                👥 Manage Users
              </Button>
            </Link>
            <Link href="/admin/roles">
              <Button variant="outline" className="w-full justify-start">
                🛡️ Manage Roles
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                ⚙️ System Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Your account details and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-600">Your Role:</span>
                <span className="text-sm font-semibold capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {user?.role}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-600">Permissions:</span>
                <span className="text-sm font-semibold">{user?.permissions.length} granted</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm font-semibold text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system activities and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-500 mb-4">
              User activities and system events will appear here once you start managing users and roles.
            </p>
            <div className="space-x-2">
              <Link href="/admin/users">
                <Button size="sm">Manage Users</Button>
              </Link>
              <Link href="/admin/roles">
                <Button variant="outline" size="sm">View Roles</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}