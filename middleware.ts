import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define a matcher for the root route
const isRootRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  if (isRootRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Apply middleware to the root route
    '/',
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
