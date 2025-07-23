import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getUserWithPermissions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    const user = await getUserWithPermissions(payload.userId)

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
        permissions: user.role.permissions.map(p => p.name)
      }
    })

  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}