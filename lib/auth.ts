import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  name: string | null;
  email: string;
  role?: "ADMIN" | "OFFICER" | "EMPLOYEE";
  iat?: number;
  exp?: number;
}

/**
 * Decode JWT token and return payload
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    if (!decoded.exp) return false;
    
    // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

/**
 * Get user data from token
 */
export function getUserFromToken(): JWTPayload | null {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token);
}

/**
 * Logout user (clear token and user data)
 */
export function logout(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  document.cookie = 'auth_token=; path=/; max-age=0';
}

