import { MetadataRoute } from 'next'

const BASE_URL = 'https://chiranjib.xyz'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/hire', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/portfolio', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/case-studies', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/process', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/why-us', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/expertise', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/solutions', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/chat', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/sekkhoai', changeFrequency: 'monthly', priority: 0.6 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
