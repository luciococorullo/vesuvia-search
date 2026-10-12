/**
 * Curated colloquial aliases, keyed by the NORMALIZED station name (see `normalize`).
 * Keys are names, never ids, so they survive EAV id changes; aliases whose key does
 * not match any current station are simply ignored.
 */
export const STATION_ALIASES: Readonly<Record<string, readonly string[]>> = {
  // Vesuviana
  'napoli p garibaldi': [
    'garibaldi',
    'piazza garibaldi',
    'stazione centrale',
    'napoli centrale',
    'napoli garibaldi',
    'centrale',
  ],
  'napoli porta nolana': ['porta nolana', 'nolana'],
  'napoli centro direzionale': ['centro direzionale', 'cdn'],
  'pompei scavi villa dei misteri': [
    'pompei',
    'pompei scavi',
    'scavi di pompei',
    'pompeii',
    'villa dei misteri',
  ],
  'pompei santuario': ['pompei', 'santuario di pompei', 'pompei centro'],
  'ercolano scavi': ['scavi di ercolano', 'herculaneum', 'ercolano'],
  'ercolano miglio d oro': ['ercolano', 'miglio d oro'],
  'castellammare di stabia': ['castellammare', 'stabia', 'c mare'],
  'stabia scavi': ['scavi di stabia', 'stabiae'],
  'torre annunziata oplonti': ['torre annunziata', 'oplonti', 'oplontis'],
  sorrento: ['sorrento centro'],
  piano: ['piano di sorrento'],
  meta: ['meta di sorrento'],
  'vico equense': ['vico'],
  's agnello': ['santagnello'],
  'san giorgio a cremano': ['san giorgio', 'sangiorgio'],
  'portici bellavista': ['portici'],
  'portici via liberta': ['portici'],
  'torre del greco': ['torre'],
  // Flegrea (Cumana / Circumflegrea)
  montesanto: ['piazza montesanto'],
  mostra: ['mostra d oltremare', 'mostra oltremare'],
  edenlandia: ['zoo', 'zoo di napoli'],
  'corso v emanuele': ['corso vittorio emanuele', 'vittorio emanuele'],
  'monte sant angelo': ['universita monte sant angelo'],
  'arco felice': ['arcofelice'],
  // Suburbana
  'napoli centrale rfi': ['napoli centrale', 'stazione centrale fs', 'napoli centrale fs'],
  'afragola alta velocita rfi': ['afragola av', 'stazione afragola'],
  'benevento p corvo': ['benevento porta corvo'],
};
