'use client'

import { useState } from 'react'
import { UsersList } from '@/components/dashboard/users-list'
import { UserFormModal } from '@/components/dashboard/user-form-modal'

interface User {
  id: string
  email: string
  name: string
  isActive: boolean
  role: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCreateUser = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleSaveUser = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Users Management
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage users and their roles in the system.
        </p>
      </div>

      {/* Users List */}
      <UsersList
        onCreateUser={handleCreateUser}
        onEditUser={handleEditUser}
        refreshTrigger={refreshTrigger}
      />

      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  )
}