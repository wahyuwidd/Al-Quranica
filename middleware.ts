import { URL } from 'url';
let locales = ["id", "en"];
interface RequestType {
  url: string | URL | undefined;
  nextUrl: {
    pathname: string;
    // Add other properties here if needed
  };
  // Add other properties here if needed
}
export function middleware(request: RequestType) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = "id";
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. if the incoming request is /products
  // the new URL iwill be /en/products
  return Response.redirect(new globalThis.URL(request.nextUrl.pathname, request.url))
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Only run on root (/) URL
    "/",
  ],
};