import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://alquranica.kaii.my.id',
      lastModified: new Date(),
      alternates: {
        languages: {
          id: 'https://alquranica.kaii.my.id/id',
          en: 'https://alquranica.kaii.my.id/en',
        },
      },
      priority: 1,
      changeFrequency: 'daily',
    },
    {
      url: 'https://alquranica.kaii.my.id/doa',
      lastModified: new Date(),
      alternates: {
        languages: {
          id: 'https://alquranica.kaii.my.id/id/doa',
          en: 'https://alquranica.kaii.my.id/en/prayer',
        },
      },
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      url: 'https://alquranica.kaii.my.id/juz-amma',
      lastModified: new Date(),
      alternates: {
        languages: {
          id: 'https://alquranica.kaii.my.id/id/juz-amma',
          en: 'https://alquranica.kaii.my.id/en/juz-amma',
        },
      },
      priority: 0.5,
      changeFrequency: 'daily',
    },
  ]
}