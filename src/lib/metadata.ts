/**
 * @fileoverview Metadata generation utility for multilingual pages
 * 
 * This utility helps generate appropriate metadata for different languages
 * in Next.js pages, supporting SEO optimization across multiple languages.
 * This file runs on the server-side only.
 */

import type { Metadata } from "next";
import { languages } from "./i18n";

type LanguageMetadata = {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
};

type MultilingualMetadata = {
    [key in keyof typeof languages]?: LanguageMetadata;
} & {
    canonical?: string;
};

/**
 * Generate metadata for a page with multiple language support
 * It uses Italian as the default language
 * 
 * This function is used by the Next.js App Router's metadata system and works
 * on the server side only.
 */
export function generateMetadata(metadata: MultilingualMetadata): Metadata {
    // Default to Italian metadata
    const defaultLang = "it";
    const defaultMeta = metadata[defaultLang] as LanguageMetadata || {
        title: "",
        description: ""
    };

    // Build keywords as a combined array from all languages with deduplication
    const allKeywords = Object.entries(metadata)
        .filter(([key]) => key !== "canonical")
        .flatMap(([_, value]) => (value as LanguageMetadata)?.keywords || [])
        .filter((value, index, self) => self.indexOf(value) === index);

    return {
        title: defaultMeta.title,
        description: defaultMeta.description,
        keywords: allKeywords,
        openGraph: {
            title: defaultMeta.ogTitle || defaultMeta.title,
            description: defaultMeta.ogDescription || defaultMeta.description,
            type: "website",
        },
        alternates: {
            canonical: metadata.canonical,
            // Add language alternates if we add language path support in future
        },
    };
}
