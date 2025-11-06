import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * POST /api/admin/login
 * Authenticates admin user with hardcoded credentials
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Hardcoded admin credentials
    const ADMIN_USERNAME = 'lumstudios';
    const ADMIN_PASSWORD = 'Lum@Studios01';
    const ADMIN_EMAIL = 'admin@lumstudios.com';

    // Accept either username or email
    const isValidUsername = email.toLowerCase() === ADMIN_USERNAME.toLowerCase();
    const isValidEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const isValidPassword = password === ADMIN_PASSWORD;

    if (!(isValidUsername || isValidEmail) || !isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate a simple session token
    const token = crypto.randomBytes(32).toString('hex');
    const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    return NextResponse.json({
      success: true,
      user: {
        id: 'admin',
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
      },
      token: token,
      expiresAt: sessionExpiry,
    });

  } catch (error) {
    console.error('Error in admin login:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
