import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vesuvia-search.vercel.app'
    const currentDate = new Date()

    // Main pages
    const mainPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: currentDate,
            changeFrequency: 'hourly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/stations`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }
    ]

    // Popular route combinations for SEO
    const popularRoutes = [
        'napoli-sorrento',
        'sorrento-napoli',
        'napoli-pompei',
        'pompei-napoli',
        'napoli-ercolano',
        'ercolano-napoli',
        'pompei-sorrento',
        'sorrento-pompei',
        'torre-annunziata-sorrento',
        'castellammare-sorrento'
    ]

    const routePages = popularRoutes.map(route => ({
        url: `${baseUrl}/route/${route}`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }))

    // Station-specific pages
    const stations = [
        'napoli-porta-nolana',
        'napoli-garibaldi',
        'san-giovanni-barra',
        'barra',
        'ponticelli',
        'vesuvio-de-meis',
        'cercola',
        'pollena-trocchia',
        'trocchia',
        'massa-di-somma',
        'ercolano-scavi',
        'portici-bellavista',
        'portici-via-liberta',
        'torre-annunziata-centrale',
        'torre-annunziata-citta',
        'pompei-scavi-villa-misteri',
        'pompei-santuario',
        'moregine',
        'castellammare-di-stabia',
        'pozzano',
        'scrajo-mare',
        'vico-equense',
        'seiano',
        'meta',
        'piano-di-sorrento',
        'sant-agnello',
        'sorrento'
    ]

    const stationPages = stations.map(station => ({
        url: `${baseUrl}/station/${station}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Information pages for SEO
    const infoPages = [
        {
            url: `${baseUrl}/come-arrivare-sorrento`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/come-arrivare-pompei`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/campania-express`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/orari-circumvesuviana`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/prezzi-biglietti`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }
    ]

    return [...mainPages, ...routePages, ...stationPages, ...infoPages]
}
