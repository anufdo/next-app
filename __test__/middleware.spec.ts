/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock auth wrapper to avoid NextAuth dependencies during middleware tests
jest.mock('@/lib/auth', () => ({
  auth: (handler: any) => (req: any) => handler(req)
}));
import { middleware } from '@/middleware';
import { NextResponse } from 'next/server';

describe('middleware', () => {
  let originalRedirect: typeof NextResponse.redirect;
  let originalNext: typeof NextResponse.next;

  beforeAll(() => {
    originalRedirect = NextResponse.redirect;
    originalNext = NextResponse.next;
    // Mock NextResponse methods
    (NextResponse.redirect as unknown as jest.Mock) = jest.fn((url) => ({ redirectUrl: url.toString() }));
    (NextResponse.next as unknown as jest.Mock) = jest.fn(() => ({ next: true }));
  });

  afterAll(() => {
    NextResponse.redirect = originalRedirect;
    NextResponse.next = originalNext;
  });

  it('allows public routes for unauthenticated users', () => {
    const req = { nextUrl: { pathname: '/login' }, url: 'http://localhost/login', auth: null } as any;
    const res = middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('redirects unauthenticated users from protected routes', () => {
    const req = { nextUrl: { pathname: '/profile' }, url: 'http://localhost/profile', auth: null } as any;
    const res = middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', req.url));
    expect(res).toEqual({ redirectUrl: 'http://localhost/login' });
  });

  it('redirects authenticated users away from login/register pages', () => {
    ['/login', '/register'].forEach(path => {
      const req = { nextUrl: { pathname: path }, url: `http://localhost${path}`, auth: { id: '1' } } as any;
      const res = middleware(req);
      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', req.url));
      expect(res).toEqual({ redirectUrl: 'http://localhost/' });
    });
  });

  it('allows authenticated users to access protected routes', () => {
    const req = { nextUrl: { pathname: '/dashboard' }, url: 'http://localhost/dashboard', auth: { id: '1' } } as any;
    const res = middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });
});
