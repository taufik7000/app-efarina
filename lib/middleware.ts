import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export async function requireAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    return payload
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

export function requirePermission(userPermissions: string[], requiredPermission: string) {
  if (!userPermissions.includes(requiredPermission)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return null
}