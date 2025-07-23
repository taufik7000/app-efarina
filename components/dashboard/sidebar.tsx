'use client'

import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, permission: 'dashboard:admin' },
  { name: 'Users', href: '/admin/users', icon: UsersIcon, permission: 'users:read' },
  { name: 'Roles', href: '/admin/roles', icon: ShieldCheckIcon, permission: 'roles:read' },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, permission: 'dashboard:admin' },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon, permission: 'dashboard:admin' },
]

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const filteredNavigation = navigation.filter(item => 
    user?.permissions.includes(item.permission)
  )

  return (
    <div className="flex flex-col w-full h-full bg-gray-900">
      {/* Logo */}
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-700">
        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        {/* User info at bottom */}
        <div className="flex-shrink-0 border-t border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}