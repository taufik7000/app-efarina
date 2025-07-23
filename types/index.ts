export interface User {
  id: string
  email: string
  name: string
  role: Role
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  description?: string
  resource: string
  action: string
}

export type RoleType = 'admin' | 'manager' | 'user'