import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
const isProtectedRoute=createRouteMatcher(["/userProfile(.*)"]);
export default clerkMiddleware(async(auth,req)=>{
    if (isProtectedRoute(req)){
  await auth.protect()
}
});


export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // all routes except static files
    "/(api|trpc)(.*)",        // always run on APIs
  ],
};