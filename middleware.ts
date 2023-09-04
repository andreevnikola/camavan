import { authMiddleware, currentUser } from "@clerk/nextjs";
import { db } from "./app/_db/edgePrisma";

import { Roles, userRole, setUserRole } from "./app/layout";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/:locale/sign-in",
    "/:locale/sign-up",
    "/api/:rote*",
    "/events",
  ],
  ignoredRoutes: ["/api/webhooks/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
