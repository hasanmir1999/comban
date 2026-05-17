import { NextResponse } from "next/server";
import { decodeJWT } from "@/lib/jwt";

export default function proxy(request) {
    const access_token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    if (access_token && pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!access_token && pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (access_token && pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!access_token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (access_token && pathname.startsWith("/dashboard")) {
        const payload = decodeJWT(access_token);
        console.log(payload)
        const okRoutes = payload.user_permissions
            .filter(per => per.startsWith("view_"))
            .map(per => per.replace("view_", ""));

        console.log("okRoutes:", okRoutes);

        const currentPath = pathname.replace("/dashboard/", "").split("/")[0];

        console.log("currentPath:", currentPath);

        if (currentPath && !okRoutes.includes(currentPath)) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login/:path*", "/dashboard/:path*"],
};
