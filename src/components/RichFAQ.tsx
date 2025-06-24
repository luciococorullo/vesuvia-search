/**
 * Rich FAQ Component with Schema.org Markup
 * 
 * Componente FAQ ottimizzato per Google Featured Snippets
 * con markup Schema.org completo per massimizzare la visibilità
 * nelle ricerche "orari treni napoli" e query correlate
 */

import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category?: 'orari' | 'biglietti' | 'destinazioni' | 'generale';
}

interface RichFAQProps {
  faqs: FAQItem[];
  title?: string;
}

const RichFAQ: React.FC<RichFAQProps> = ({ 
  faqs, 
  title = "Domande frequenti sui treni a Napoli" 
}) => {
  
  // Schema.org FAQPage markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `#faq-${index}`,
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'orari': return '🕐';
      case 'biglietti': return '🎫';
      case 'destinazioni': return '🗺️';
      default: return '❓';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'orari': return 'border-l-blue-500 bg-blue-50';
      case 'biglietti': return 'border-l-green-500 bg-green-50';
      case 'destinazioni': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <>
      {/* Schema.org FAQPage markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          {title}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              id={`faq-${index}`}
              className={`border-l-4 p-4 rounded-r-lg ${getCategoryColor(faq.category)} transition-all hover:shadow-md`}
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-start gap-2">
                <span className="text-xl flex-shrink-0">
                  {getCategoryIcon(faq.category)}
                </span>
                <span>{faq.question}</span>
              </h3>
              <div 
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Non trovi la risposta che cerchi? 
            <a href="/faq" className="text-blue-600 hover:text-blue-800 ml-1 underline">
              Consulta tutte le FAQ sui treni a Napoli
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RichFAQ;
