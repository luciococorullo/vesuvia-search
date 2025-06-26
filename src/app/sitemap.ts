import { MetadataRoute } from 'next'

/**
 * Comprehensive sitemap creation for VesuviaSearch
 * Includes popular routes and destinations to improve SEO for Napoli area
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vesuvia-search.vercel.app'
    const currentDate = new Date()

    // Define popular destinations to pre-create search links
    const popularDestinations = [
        // Napoli to popular destinations
        { from: 'Napoli', to: 'Sorrento', priority: 1.0 },
        { from: 'Napoli', to: 'Pompei Scavi', priority: 1.0 },
        { from: 'Napoli', to: 'Ercolano Scavi', priority: 0.9 },
        { from: 'Napoli', to: 'Castellammare', priority: 0.9 },
        { from: 'Napoli', to: 'Torre Annunziata', priority: 0.9 },
        { from: 'Napoli', to: 'Vico Equense', priority: 0.9 },
        { from: 'Napoli', to: 'Meta', priority: 0.9 },
        { from: 'Napoli', to: 'Piano', priority: 0.9 },
        { from: 'Napoli', to: 'Sant\'Agnello', priority: 0.9 },
        { from: 'Napoli', to: 'Poggiomarino', priority: 0.8 },
        { from: 'Napoli', to: 'Sarno', priority: 0.8 },
        { from: 'Napoli', to: 'Nola', priority: 0.8 },
        { from: 'Napoli', to: 'Baiano', priority: 0.8 },
        { from: 'Napoli', to: 'San Giorgio', priority: 0.8 },

        // Return routes to Napoli
        { from: 'Sorrento', to: 'Napoli', priority: 1.0 },
        { from: 'Pompei Scavi', to: 'Napoli', priority: 1.0 },
        { from: 'Ercolano Scavi', to: 'Napoli', priority: 0.9 },
        { from: 'Castellammare', to: 'Napoli', priority: 0.9 },
        { from: 'Vico Equense', to: 'Napoli', priority: 0.9 },

        // Popular tourist connections
        { from: 'Sorrento', to: 'Pompei Scavi', priority: 0.9 },
        { from: 'Pompei Scavi', to: 'Sorrento', priority: 0.9 },
        { from: 'Pompei Scavi', to: 'Ercolano Scavi', priority: 0.9 },
        { from: 'Ercolano Scavi', to: 'Pompei Scavi', priority: 0.9 }
    ]

    // Build destination-specific URLs
    const destinationUrls = popularDestinations.map(({ from, to, priority }) => ({
        url: `${baseUrl}/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority
    }))

    // Main site pages
    const mainPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: currentDate,
            changeFrequency: 'hourly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/stations`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/stazioni-napoli`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/destinazioni-turistiche`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/accessibilita`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tempi-viaggio`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        // Popular route pages for SEO
        {
            url: `${baseUrl}/route/napoli-sorrento`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/route/napoli-pompei`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/route/napoli-ercolano`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/route/sorrento-pompei`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/offline`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    return [...mainPages, ...destinationUrls]
}
