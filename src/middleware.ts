import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/Auth";



type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register","reset-pass"];

const roleBasedPrivateRoutes = {
     USER: [/^\/dashboard\/user/, /^\/movies\/\w+/, /^\/series\/\w+/ ],
     ADMIN: [/^\/dashboard\/admin/, /^\/movies\/\w+/, /^\/series\/\w+/]

};

export const middleware = async (request: NextRequest) => {
     const { pathname } = request.nextUrl;
     console.log(pathname)

     const userInfo = await getCurrentUser();

     if (!userInfo) {
          if (authRoutes.includes(pathname)) {
               return NextResponse.next();
          } else {
               return NextResponse.redirect(
                    new URL(
                         `http://localhost:3000/login?redirectPath=${pathname}`,
                         request.url
                    )
               );
          }
     }

     if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
          const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
          if (routes.some((route) => pathname.match(route))) {
               return NextResponse.next();
          }
     }

     return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
     matcher: [
          "/dashboard",
          "/dashboard/user/:path*",
          "/dashboard/admin/:path*",
          "/movies/:id",
          "/series/:id",
          

     ],
};