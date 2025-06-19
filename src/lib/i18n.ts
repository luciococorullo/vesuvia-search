/**
 * @fileoverview Internationalization (i18n) configuration and translations
 * 
 * This file contains language definitions, translation objects, and types for
 * the multilingual support in VesuviaSearch. The application supports 6 languages
 * with dynamic language switching and browser detection.
 * 
 * Supported languages:
 * - Italian (it) - Primary language
 * - English (en) - Default fallback
 * - Spanish (es)
 * - Portuguese (pt)
 * - French (fr)
 * - German (de)
 * 
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

/**
 * Supported languages configuration with display names and flag emojis
 */
export const languages = {
    it: { name: 'Italiano', flag: '🇮🇹' },
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    pt: { name: 'Português', flag: '🇵🇹' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' }
} as const;

/**
 * Language code type derived from the languages object
 */
export type Language = keyof typeof languages;

/**
 * Comprehensive translations object containing all UI text in supported languages
 * 
 * Structure:
 * - Header/Navigation: App title, navigation elements
 * - Forms: Labels, placeholders, validation messages
 * - Search: Search functionality, filters, results
 * - Time/Date: Date picker, time selection
 * - Errors: Error messages and validation
 * - Train Data: Categories, directions, operating days
 */
export const translations = {
    it: {
        // ========================================
        // HEADER AND NAVIGATION
        // ========================================
        findTrains: 'Cerca Treni',
        searchSchedules: 'Cerca orari dei treni e prenota il tuo viaggio',

        // ========================================
        // FORM LABELS AND INPUTS
        // ========================================
        from: 'Da',
        to: 'A',
        departureTime: 'Orario di Partenza',
        departureStation: 'Stazione di partenza',
        arrivalStation: 'Stazione di arrivo',

        // ========================================
        // QUICK TIME SELECTION BUTTONS
        // ========================================
        now: 'Ora',
        oneHour: '+1 ora',
        twoHours: '+2 ore',
        tomorrow: 'Domani',

        // ========================================
        // SEARCH FUNCTIONALITY
        // ========================================
        searchTrains: 'Cerca Treni',
        searchingTrains: 'Ricerca treni...',

        // ========================================
        // VALIDATION AND ERROR MESSAGES
        // ========================================
        departureRequired: 'La stazione di partenza è obbligatoria',
        arrivalRequired: 'La stazione di arrivo è obbligatoria',
        stationsDifferent: 'La stazione di arrivo deve essere diversa da quella di partenza',
        timeRequired: 'L\'orario di partenza è obbligatorio',

        // ========================================
        // DATE AND TIME PICKER
        // ========================================
        selectDateTime: 'Seleziona data e ora',
        date: 'Data',
        time: 'Ora',
        selectDate: 'Seleziona data',

        // ========================================
        // SEARCH RESULTS AND TRAIN INFORMATION
        // ========================================
        searchingTrainsInProgress: 'Ricerca treni in corso...',
        noTrainsFound: 'Nessun treno trovato',
        noTrainsFoundDescription: 'Prova a modificare i criteri di ricerca o verifica che le stazioni siano corrette.',
        searchResults: 'Risultati della ricerca',
        train: 'treno',
        trains: 'treni',
        duration: 'Durata',
        direction: 'Direzione',
        intermediateStops: 'fermate intermedie',
        showAllStops: 'Mostra tutte le fermate',
        arrival: 'Arr',
        departure: 'Part',

        // ========================================
        // PAGE CONTENT AND TITLES
        // ========================================
        findTrainsTitle: 'Trova i tuoi treni della Circumvesuviana',
        findTrainsSubtitle: 'Ricerca semplice e veloce per la linea Napoli-Sorrento',
        loading: 'Caricamento...',
        swapStations: 'Scambia stazioni',
        filters: 'Filtri',
        campaniaExpressOnly: 'Solo Campania Express',
        campaniaExpressLabel: 'Campania Express',

        // ========================================
        // GENERAL UI ELEMENTS
        // ========================================
        error: 'Errore',
        retry: 'Riprova',
        noData: 'Nessun dato disponibile',

        // ========================================
        // TAB NAVIGATION
        // ========================================
        departureDepartureTab: 'Partenza - Arrivo',
        departureOnlyTab: 'Partenza',

        // ========================================
        // DEPARTURE-SPECIFIC FORMS
        // ========================================
        departureStationLabel: 'Stazione di Partenza',
        selectDepartureStation: 'Seleziona stazione di partenza',
        departureTimeLabel: 'Orario di Partenza',
        filtersLabel: 'Filtri',

        // ========================================
        // DEPARTURE SEARCH BUTTONS
        // ========================================
        searchingNextDepartures: 'Ricerca prossime partenze...',
        searchNextDepartures: 'Cerca Prossime Partenze',

        // ========================================
        // TRAIN CATEGORIES
        // ========================================
        categoryRegionale: 'Regionale',
        categoryIntercity: 'Diretto (D)',
        categoryCampaniaExpress: 'Campania Express',

        // ========================================
        // DIRECTION LABELS
        // ========================================
        directionNapoli: 'Napoli',
        directionSorrento: 'Sorrento',

        // ========================================
        // OPERATING DAYS
        // ========================================
        operatingDaysWeekdaysOnly: 'Solo feriali',
        operatingDaysWeekendsOnly: 'Solo festivi',
        operatingDaysDaily: 'Tutti i giorni',
        operatingDaysWeekdaysAndSaturday: 'Feriali e sabato',

        // Footer
        footerDisclaimer: 'Questo progetto non ha alcuna affiliazione con EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Questo è un progetto open source educativo creato solo a scopo didattico.',
        footerMadeWith: 'Realizzato con',
        footerBy: 'da',
        footerEducationalCopyright: 'Progetto Educativo'
    },

    en: {
        // Header/Navigation
        findTrains: 'Find Trains',
        searchSchedules: 'Search for train schedules and book your journey',

        // Form labels
        from: 'From',
        to: 'To',
        departureTime: 'Departure Time',
        departureStation: 'Departure station',
        arrivalStation: 'Arrival station',

        // Quick time buttons
        now: 'Now',
        oneHour: '+1 hour',
        twoHours: '+2 hours',
        tomorrow: 'Tomorrow',

        // Search button
        searchTrains: 'Search Trains',
        searchingTrains: 'Searching trains...',

        // Error messages
        departureRequired: 'Departure station is required',
        arrivalRequired: 'Arrival station is required',
        stationsDifferent: 'Arrival station must be different from departure',
        timeRequired: 'Departure time is required',

        // Date picker
        selectDateTime: 'Select date and time',
        date: 'Date',
        time: 'Time',
        selectDate: 'Select date',

        // Train results
        searchingTrainsInProgress: 'Searching trains...',
        noTrainsFound: 'No trains found',
        noTrainsFoundDescription: 'Try modifying your search criteria or verify that the stations are correct.',
        searchResults: 'Search results',
        train: 'train',
        trains: 'trains',
        duration: 'Duration',
        direction: 'Direction',
        intermediateStops: 'intermediate stops',
        showAllStops: 'Show all stops',
        arrival: 'Arr',
        departure: 'Dep',

        // Page content
        findTrainsTitle: 'Find your Circumvesuviana trains',
        findTrainsSubtitle: 'Simple and fast search for the Naples-Sorrento line',
        loading: 'Loading...',
        swapStations: 'Swap stations',
        filters: 'Filters',
        campaniaExpressOnly: 'Campania Express only',
        campaniaExpressLabel: 'Campania Express',

        // Additional useful translations
        error: 'Error',
        retry: 'Retry',
        noData: 'No data available',

        // Tab labels
        departureDepartureTab: 'Departure - Arrival',
        departureOnlyTab: 'Departure',

        // Form labels and placeholders (specific for departure tab)
        departureStationLabel: 'Departure Station',
        selectDepartureStation: 'Select departure station',
        departureTimeLabel: 'Departure Time',
        filtersLabel: 'Filters',

        // Button labels for departure searches
        searchingNextDepartures: 'Searching next departures...',
        searchNextDepartures: 'Search Next Departures',

        // Train categories
        categoryRegionale: 'Regional',
        categoryIntercity: 'Direct (D)',
        categoryCampaniaExpress: 'Campania Express',

        // Direction labels
        directionNapoli: 'Naples',
        directionSorrento: 'Sorrento',

        // Operating days
        operatingDaysWeekdaysOnly: 'Weekdays only',
        operatingDaysWeekendsOnly: 'Weekends only',
        operatingDaysDaily: 'Daily',
        operatingDaysWeekdaysAndSaturday: 'Weekdays and Saturday',

        // Footer
        footerDisclaimer: 'This project has no affiliation with EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'This is an open source educational project created for learning purposes only.',
        footerMadeWith: 'Made with',
        footerBy: 'by',
        footerEducationalCopyright: 'Educational Project'
    },

    es: {
        // Header/Navigation
        findTrains: 'Buscar Trenes',
        searchSchedules: 'Busca horarios de trenes y reserva tu viaje',

        // Form labels
        from: 'Desde',
        to: 'Hasta',
        departureTime: 'Hora de Salida',
        departureStation: 'Estación de salida',
        arrivalStation: 'Estación de llegada',

        // Quick time buttons
        now: 'Ahora',
        oneHour: '+1 hora',
        twoHours: '+2 horas',
        tomorrow: 'Mañana',

        // Search button
        searchTrains: 'Buscar Trenes',
        searchingTrains: 'Buscando trenes...',

        // Error messages
        departureRequired: 'La estación de salida es obligatoria',
        arrivalRequired: 'La estación de llegada es obligatoria',
        stationsDifferent: 'La estación de llegada debe ser diferente a la de salida',
        timeRequired: 'La hora de salida es obligatoria',

        // Date picker
        selectDateTime: 'Seleccionar fecha y hora',
        date: 'Fecha',
        time: 'Hora',
        selectDate: 'Seleccionar fecha',

        // Train results
        searchingTrainsInProgress: 'Buscando trenes...',
        noTrainsFound: 'No se encontraron trenes',
        noTrainsFoundDescription: 'Intenta modificar los criterios de búsqueda o verifica que las estaciones sean correctas.',
        searchResults: 'Resultados de búsqueda',
        train: 'tren',
        trains: 'trenes',
        duration: 'Duración',
        direction: 'Dirección',
        intermediateStops: 'paradas intermedias',
        showAllStops: 'Mostrar todas las paradas',
        arrival: 'Lleg',
        departure: 'Sal',

        // Page content
        findTrainsTitle: 'Encuentra tus trenes de la Circumvesuviana',
        findTrainsSubtitle: 'Búsqueda simple y rápida para la línea Nápoles-Sorrento',
        loading: 'Cargando...',
        swapStations: 'Intercambiar estaciones',
        filters: 'Filtros',
        campaniaExpressOnly: 'Solo Campania Express',
        campaniaExpressLabel: 'Campania Express',

        // Additional useful translations
        error: 'Error',
        retry: 'Reintentar',
        noData: 'No hay datos disponibles',

        // Tab labels
        departureDepartureTab: 'Salida - Llegada',
        departureOnlyTab: 'Salida',

        // Form labels and placeholders (specific for departure tab)
        departureStationLabel: 'Estación de Salida',
        selectDepartureStation: 'Seleccionar estación de salida',
        departureTimeLabel: 'Hora de Salida',
        filtersLabel: 'Filtros',

        // Button labels for departure searches
        searchingNextDepartures: 'Buscando próximas salidas...',
        searchNextDepartures: 'Buscar Próximas Salidas',

        // Train categories
        categoryRegionale: 'Regional',
        categoryIntercity: 'Directo (D)',
        categoryCampaniaExpress: 'Campania Express',

        // Direction labels
        directionNapoli: 'Nápoles',
        directionSorrento: 'Sorrento',

        // Operating days
        operatingDaysWeekdaysOnly: 'Solo laborables',
        operatingDaysWeekendsOnly: 'Solo fines de semana',
        operatingDaysDaily: 'Diario',
        operatingDaysWeekdaysAndSaturday: 'Laborables y sábado',

        // Footer
        footerDisclaimer: 'Este proyecto no tiene afiliación con EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Este es un proyecto educativo de código abierto creado solo con fines de aprendizaje.',
        footerMadeWith: 'Hecho con',
        footerBy: 'por',
        footerEducationalCopyright: 'Proyecto Educativo'
    },

    pt: {
        // Header/Navigation
        findTrains: 'Encontrar Comboios',
        searchSchedules: 'Pesquise horários de comboios e reserve sua viagem',

        // Form labels
        from: 'De',
        to: 'Para',
        departureTime: 'Horário de Partida',
        departureStation: 'Estação de partida',
        arrivalStation: 'Estação de chegada',

        // Quick time buttons
        now: 'Agora',
        oneHour: '+1 hora',
        twoHours: '+2 horas',
        tomorrow: 'Amanhã',

        // Search button
        searchTrains: 'Pesquisar Comboios',
        searchingTrains: 'Pesquisando comboios...',

        // Error messages
        departureRequired: 'A estação de partida é obrigatória',
        arrivalRequired: 'A estação de chegada é obrigatória',
        stationsDifferent: 'A estação de chegada deve ser diferente da partida',
        timeRequired: 'O horário de partida é obrigatório',

        // Date picker
        selectDateTime: 'Selecionar data e hora',
        date: 'Data',
        time: 'Hora',
        selectDate: 'Selecionar data',

        // Train results
        searchingTrainsInProgress: 'Pesquisando comboios...',
        noTrainsFound: 'Nenhum comboio encontrado',
        noTrainsFoundDescription: 'Tente modificar os critérios de pesquisa ou verifique se as estações estão corretas.',
        searchResults: 'Resultados da pesquisa',
        train: 'comboio',
        trains: 'comboios',
        duration: 'Duração',
        direction: 'Direção',
        intermediateStops: 'paragens intermédias',
        showAllStops: 'Mostrar todas as paragens',
        arrival: 'Cheg',
        departure: 'Part',

        // Page content
        findTrainsTitle: 'Encontre seus comboios da Circumvesuviana',
        findTrainsSubtitle: 'Pesquisa simples e rápida para a linha Nápoles-Sorrento',
        loading: 'Carregando...',
        swapStations: 'Trocar estações',
        filters: 'Filtros',
        campaniaExpressOnly: 'Apenas Campania Express',
        campaniaExpressLabel: 'Campania Express',

        // Additional useful translations
        error: 'Erro',
        retry: 'Tentar novamente',
        noData: 'Não há dados disponíveis',

        // Tab labels
        departureDepartureTab: 'Partida - Chegada',
        departureOnlyTab: 'Partida',

        // Form labels and placeholders (specific for departure tab)
        departureStationLabel: 'Estação de Partida',
        selectDepartureStation: 'Selecionar estação de partida',
        departureTimeLabel: 'Horário de Partida',
        filtersLabel: 'Filtros',

        // Button labels for departure searches
        searchingNextDepartures: 'Pesquisando próximas partidas...',
        searchNextDepartures: 'Pesquisar Próximas Partidas',

        // Train categories
        categoryRegionale: 'Regional',
        categoryIntercity: 'Direto (D)',
        categoryCampaniaExpress: 'Campania Express',

        // Direction labels
        directionNapoli: 'Nápoles',
        directionSorrento: 'Sorrento',

        // Operating days
        operatingDaysWeekdaysOnly: 'Apenas dias úteis',
        operatingDaysWeekendsOnly: 'Apenas fins de semana',
        operatingDaysDaily: 'Diário',
        operatingDaysWeekdaysAndSaturday: 'Dias úteis e sábado',

        // Footer
        footerDisclaimer: 'Este projeto não tem afiliação com EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Este é um projeto educacional de código aberto criado apenas para fins de aprendizagem.',
        footerMadeWith: 'Feito com',
        footerBy: 'por',
        footerEducationalCopyright: 'Projeto Educacional'
    },

    fr: {
        // Header/Navigation
        findTrains: 'Trouver des Trains',
        searchSchedules: 'Recherchez les horaires de trains et réservez votre voyage',

        // Form labels
        from: 'De',
        to: 'À',
        departureTime: 'Heure de Départ',
        departureStation: 'Gare de départ',
        arrivalStation: 'Gare d\'arrivée',

        // Quick time buttons
        now: 'Maintenant',
        oneHour: '+1 heure',
        twoHours: '+2 heures',
        tomorrow: 'Demain',

        // Search button
        searchTrains: 'Rechercher des Trains',
        searchingTrains: 'Recherche de trains...',

        // Error messages
        departureRequired: 'La gare de départ est obligatoire',
        arrivalRequired: 'La gare d\'arrivée est obligatoire',
        stationsDifferent: 'La gare d\'arrivée doit être différente de celle de départ',
        timeRequired: 'L\'heure de départ est obligatoire',

        // Date picker
        selectDateTime: 'Sélectionner date et heure',
        date: 'Date',
        time: 'Heure',
        selectDate: 'Sélectionner une date',

        // Train results
        searchingTrainsInProgress: 'Recherche de trains...',
        noTrainsFound: 'Aucun train trouvé',
        noTrainsFoundDescription: 'Essayez de modifier les critères de recherche ou vérifiez que les gares sont correctes.',
        searchResults: 'Résultats de recherche',
        train: 'train',
        trains: 'trains',
        duration: 'Durée',
        direction: 'Direction',
        intermediateStops: 'arrêts intermédiaires',
        showAllStops: 'Montrer tous les arrêts',
        arrival: 'Arr',
        departure: 'Dép',

        // Page content
        findTrainsTitle: 'Trouvez vos trains de la Circumvesuviana',
        findTrainsSubtitle: 'Recherche simple et rapide pour la ligne Naples-Sorrente',
        loading: 'Chargement...',
        swapStations: 'Échanger les gares',
        filters: 'Filtres',
        campaniaExpressOnly: 'Campania Express seulement',
        campaniaExpressLabel: 'Campania Express',

        // Additional useful translations
        error: 'Erreur',
        retry: 'Réessayer',
        noData: 'Aucune donnée disponible',

        // Tab labels
        departureDepartureTab: 'Départ - Arrivée',
        departureOnlyTab: 'Départ',

        // Form labels and placeholders (specific for departure tab)
        departureStationLabel: 'Gare de Départ',
        selectDepartureStation: 'Sélectionner la gare de départ',
        departureTimeLabel: 'Heure de Départ',
        filtersLabel: 'Filtres',

        // Button labels for departure searches
        searchingNextDepartures: 'Recherche prochains départs...',
        searchNextDepartures: 'Rechercher Prochains Départs',

        // Train categories
        categoryRegionale: 'Régional',
        categoryIntercity: 'Direct (D)',
        categoryCampaniaExpress: 'Campania Express',

        // Direction labels
        directionNapoli: 'Naples',
        directionSorrento: 'Sorrente',

        // Operating days
        operatingDaysWeekdaysOnly: 'Jours ouvrables seulement',
        operatingDaysWeekendsOnly: 'Week-ends seulement',
        operatingDaysDaily: 'Quotidien',
        operatingDaysWeekdaysAndSaturday: 'Jours ouvrables et samedi',

        // Footer
        footerDisclaimer: 'Ce projet n\'a aucune affiliation avec EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Il s\'agit d\'un projet éducatif open source créé uniquement à des fins d\'apprentissage.',
        footerMadeWith: 'Fait avec',
        footerBy: 'par',
        footerEducationalCopyright: 'Projet Éducatif'
    },

    de: {
        // Header/Navigation
        findTrains: 'Züge Finden',
        searchSchedules: 'Suchen Sie Zugfahrpläne und buchen Sie Ihre Reise',

        // Form labels
        from: 'Von',
        to: 'Nach',
        departureTime: 'Abfahrtszeit',
        departureStation: 'Abfahrtsbahnhof',
        arrivalStation: 'Ankunftsbahnhof',

        // Quick time buttons
        now: 'Jetzt',
        oneHour: '+1 Stunde',
        twoHours: '+2 Stunden',
        tomorrow: 'Morgen',

        // Search button
        searchTrains: 'Züge Suchen',
        searchingTrains: 'Suche Züge...',

        // Error messages
        departureRequired: 'Der Abfahrtsbahnhof ist erforderlich',
        arrivalRequired: 'Der Ankunftsbahnhof ist erforderlich',
        stationsDifferent: 'Der Ankunftsbahnhof muss sich vom Abfahrtsbahnhof unterscheiden',
        timeRequired: 'Die Abfahrtszeit ist erforderlich',

        // Date picker
        selectDateTime: 'Datum und Uhrzeit auswählen',
        date: 'Datum',
        time: 'Zeit',
        selectDate: 'Datum auswählen',

        // Train results
        searchingTrainsInProgress: 'Suche Züge...',
        noTrainsFound: 'Keine Züge gefunden',
        noTrainsFoundDescription: 'Versuchen Sie, die Suchkriterien zu ändern oder überprüfen Sie, ob die Bahnhöfe korrekt sind.',
        searchResults: 'Suchergebnisse',
        train: 'Zug',
        trains: 'Züge',
        duration: 'Dauer',
        direction: 'Richtung',
        intermediateStops: 'Zwischenstopps',
        showAllStops: 'Alle Haltestellen anzeigen',
        arrival: 'Ank',
        departure: 'Abf',

        // Page content
        findTrainsTitle: 'Finden Sie Ihre Circumvesuviana-Züge',
        findTrainsSubtitle: 'Einfache und schnelle Suche für die Linie Neapel-Sorrento',
        loading: 'Lädt...',
        swapStations: 'Bahnhöfe tauschen',
        filters: 'Filter',
        campaniaExpressOnly: 'Nur Campania Express',
        campaniaExpressLabel: 'Campania Express',

        // Additional useful translations
        error: 'Fehler',
        retry: 'Wiederholen',
        noData: 'Keine Daten verfügbar',

        // Tab labels
        departureDepartureTab: 'Abfahrt - Ankunft',
        departureOnlyTab: 'Abfahrt',

        // Form labels and placeholders (specific for departure tab)
        departureStationLabel: 'Abfahrtsbahnhof',
        selectDepartureStation: 'Abfahrtsbahnhof auswählen',
        departureTimeLabel: 'Abfahrtszeit',
        filtersLabel: 'Filter',

        // Button labels for departure searches
        searchingNextDepartures: 'Suche nächste Abfahrten...',
        searchNextDepartures: 'Nächste Abfahrten Suchen',

        // Train categories
        categoryRegionale: 'Regional',
        categoryIntercity: 'Direkt (D)',
        categoryCampaniaExpress: 'Campania Express',

        // Direction labels
        directionNapoli: 'Neapel',
        directionSorrento: 'Sorrent',

        // Operating days
        operatingDaysWeekdaysOnly: 'Nur Werktage',
        operatingDaysWeekendsOnly: 'Nur Wochenenden',
        operatingDaysDaily: 'Täglich',
        operatingDaysWeekdaysAndSaturday: 'Werktage und Samstag',

        // Footer
        footerDisclaimer: 'Dieses Projekt hat keine Verbindung zu EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Dies ist ein Open-Source-Bildungsprojekt, das nur zu Lernzwecken erstellt wurde.',
        footerMadeWith: 'Gemacht mit',
        footerBy: 'von',
        footerEducationalCopyright: 'Bildungsprojekt'
    }
} as const;

export type TranslationKey = keyof typeof translations['en'];
