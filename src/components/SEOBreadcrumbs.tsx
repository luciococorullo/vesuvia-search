/**
 * SEO Breadcrumbs Component
 * 
 * Componente per breadcrumbs con structured data per migliorare la SEO
 * e la navigabilità del sito, particolarmente importante per le pagine
 * specifiche delle destinazioni turistiche.
 */

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

const SEOBreadcrumbs: React.FC<SEOBreadcrumbsProps> = ({ items, currentPage }) => {
  // Genera i dati strutturati per i breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      })),
      {
        "@type": "ListItem",
        "position": items.length + 1,
        "name": currentPage
      }
    ]
  };

  return (
    <>
      {/* Structured Data per i breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      {/* Breadcrumbs visibili */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link 
                href={item.url}
                className="hover:text-red-600 transition-colors"
              >
                {item.name}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
          ))}
          <li className="text-gray-800 font-medium">
            {currentPage}
          </li>
        </ol>
      </nav>
    </>
  );
};

export default SEOBreadcrumbs;
