import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const response = NextResponse.next();

  // Allow iframe embedding from Sanity Studio
  const studioOrigin = process.env.NEXT_PUBLIC_STUDIO_URL || 'http://localhost:3333';
  const appOrigins = [
    studioOrigin,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3333',
  ];

  // In production, allow specific domains
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    appOrigins.push(
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
      process.env.NEXT_PUBLIC_PRODUCTION_URL || ''
    );
  }

  const cspHeader = `frame-ancestors ${appOrigins.filter(Boolean).join(' ')} 'self';`;

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.delete('X-Frame-Options');

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    String.raw`/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)`,
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};