import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.academiafrederickfloret.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
