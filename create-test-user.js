const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('🌱 Creating test data...')

    // Create permissions first
    const permissions = await Promise.all([
      prisma.permission.upsert({
        where: { name: 'dashboard:admin' },
        update: {},
        create: {
          name: 'dashboard:admin',
          description: 'Access admin dashboard',
          resource: 'dashboard',
          action: 'admin'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'users:read' },
        update: {},
        create: {
          name: 'users:read',
          description: 'Read users',
          resource: 'users',
          action: 'read'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'users:create' },
        update: {},
        create: {
          name: 'users:create',
          description: 'Create users',
          resource: 'users',
          action: 'create'
        }
      }),
      prisma.permission.upsert({
        where: { name: 'roles:read' },
        update: {},
        create: {
          name: 'roles:read',
          description: 'Read roles',
          resource: 'roles',
          action: 'read'
        }
      })
    ])

    console.log('✅ Permissions created')

    // Create admin role with permissions
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {
        permissions: {
          set: permissions.map(p => ({ id: p.id }))
        }
      },
      create: {
        name: 'admin',
        description: 'System administrator',
        permissions: {
          connect: permissions.map(p => ({ id: p.id }))
        }
      }
    })

    console.log('✅ Admin role created')

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {
        password: hashedPassword,
        roleId: adminRole.id
      },
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        roleId: adminRole.id
      }
    })

    console.log('✅ Test user created:')
    console.log('📧 Email: admin@example.com')
    console.log('🔑 Password: admin123')
    console.log('👤 Role:', adminRole.name)
    console.log('🛡️ Permissions:', permissions.map(p => p.name))

  } catch (error) {
    console.error('❌ Error creating test user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()