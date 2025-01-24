import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes
  matcher: [
    '/',
    '/executive',
    '/customize',
    '/funnel',
    '/ai-training/:path*',
    '/multi-step',
    '/sales',
    '/integrations',
    '/settings',
    '/financial',
    '/analytics/:path',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',
    '/forms/profile-settings/:path*',
    '/search/:path*',
    '/filters/:path*',
    '/tickets/:path*',
    '/recommendation/:path*',
    '/ai-train/:path*',
    '/search-cards',
    '/recent-cards',
    '/personalize-cards',
    '/leads',
    '/playground',
  ],
};
