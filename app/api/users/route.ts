import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken, hashPassword } from '@/lib/auth'

// GET - List users
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    
    // Check permissions (you can add this later)
    // if (!payload.permissions.includes('users:read')) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }

    const users = await prisma.user.findMany({
      include: {
        role: {
          include: {
            permissions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Remove password from response
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user
      return safeUser
    })

    return NextResponse.json({ users: safeUsers })

  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create user
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    const { email, name, password, roleId } = await request.json()

    // Validation
    if (!email || !name || !password || !roleId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        roleId
      },
      include: {
        role: true
      }
    })

    // Return user without password
    const { password: _, ...safeUser } = user

    return NextResponse.json(
      { message: 'User created successfully', user: safeUser },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}