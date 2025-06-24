/**
 * SEO-optimized Call-to-Action Component
 * 
 * Componente CTA ottimizzato per aumentare il click-through rate
 * e migliorare l'engagement degli utenti che cercano orari treni a Napoli
 */

import React from 'react';
import Link from 'next/link';

interface SEOCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: 'primary' | 'secondary' | 'tourist';
  showEmoji?: boolean;
}

const SEOCTA: React.FC<SEOCTAProps> = ({
  title = "Trova subito gli orari dei treni a Napoli",
  description = "Orari in tempo reale per Circumvesuviana, EAV e Campania Express. Raggiungi facilmente Sorrento, Pompei, Ercolano e tutte le destinazioni della provincia.",
  buttonText = "🚆 Cerca Orari Treni Ora",
  buttonLink = "/",
  variant = 'primary',
  showEmoji = true
}) => {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'tourist':
        return {
          container: "bg-gradient-to-r from-blue-100 via-red-50 to-blue-100",
          button: "bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white",
          title: "text-blue-800",
          description: "text-gray-700"
        };
      case 'secondary':
        return {
          container: "bg-gray-100 border border-gray-200",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
          title: "text-gray-800",
          description: "text-gray-600"
        };
      default:
        return {
          container: "bg-gradient-to-r from-blue-50 to-red-50",
          button: "bg-red-600 hover:bg-red-700 text-white",
          title: "text-blue-800",
          description: "text-gray-700"
        };
    }
  };

  const styles = getVariantStyles();
  
  return (
    <div className={`${styles.container} rounded-lg p-8 text-center shadow-lg transition-all hover:shadow-xl`}>
      <h2 className={`text-2xl md:text-3xl font-bold ${styles.title} mb-4`}>
        {showEmoji && variant === 'tourist' && '🚆 '}
        {title}
      </h2>
      
      <p className={`text-lg ${styles.description} mb-6 max-w-2xl mx-auto leading-relaxed`}>
        {description}
      </p>
      
      <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center md:items-center">
        <Link 
          href={buttonLink}
          className={`${styles.button} font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg inline-block`}
        >
          {buttonText}
        </Link>
        
        {variant === 'tourist' && (
          <div className="text-sm text-gray-600 mt-3 md:mt-0">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <span>✓ Orari tempo reale</span>
              <span>✓ Tutte le destinazioni</span>
              <span>✓ Gratuito</span>
            </div>
          </div>
        )}
      </div>
      
      {variant === 'primary' && (
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/faq" className="text-blue-600 hover:text-blue-800 underline">
            FAQ Treni Napoli
          </Link>
          <Link href="/destinazioni-turistiche" className="text-blue-600 hover:text-blue-800 underline">
            Destinazioni Turistiche
          </Link>
          <Link href="/stazioni-napoli" className="text-blue-600 hover:text-blue-800 underline">
            Stazioni Napoli
          </Link>
        </div>
      )}
    </div>
  );
};

export default SEOCTA;
