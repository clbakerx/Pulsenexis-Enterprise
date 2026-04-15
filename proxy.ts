import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/studio/videos(.*)"]);

const isPublicApi = createRouteMatcher([
  "/api/generate-video(.*)",
  "/api/stripe-webhook(.*)",
  "/api/traffic(.*)",
  "/api/video-status(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicApi(req)) return;
  if (isProtected(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};