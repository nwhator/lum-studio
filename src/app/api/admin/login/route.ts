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

    // Admin credentials
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'lumstudios';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lumstudios123';
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'lummedia01@gmail.com';

    // Accept username or email (lummedia01@gmail.com or admin@lumstudios.com)
    const inputLower = email.toLowerCase().trim();
    const isValidUsername = inputLower === ADMIN_USERNAME.toLowerCase();
    const isValidEmail = inputLower === ADMIN_EMAIL.toLowerCase() || inputLower === 'admin@lumstudios.com';
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
