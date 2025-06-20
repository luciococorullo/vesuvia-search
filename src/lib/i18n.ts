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
 * - Span        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
               // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
               // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
               // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'Verspätet',
        onTime: 'Pünktlich',
        cancelled: 'Gestrichen',
        delayedByMinutes: 'Verspätet um {{minutes}} Min',
        trainCode: 'Zug {{code}}',
        connectionJourney: 'Reise mit Umstieg',
        directJourney: 'Direkte Reise',
        changeAt: 'Umstieg in',
        segment: 'Abschnitt',
        transfer: 'Umstieg',
        transferTime: 'Umstiegszeit',
        totalDuration: 'Gesamtdauer',
        showDetails: 'Details anzeigen',
        hideDetails: 'Details ausblenden',
        journeyDetails: 'Reisedetails',: 'En retard',
        onTime: 'À l\'heure',
        cancelled: 'Annulé',
        delayedByMinutes: 'En retard de {{minutes}} min',
        trainCode: 'Train {{code}}',
        connectionJourney: 'Voyage avec correspondance',
        directJourney: 'Voyage direct',
        changeAt: 'Changement à',
        segment: 'Segment',
        transfer: 'Correspondance',
        transferTime: 'Temps de correspondance',
        totalDuration: 'Durée totale',
        showDetails: 'Afficher les détails',
        hideDetails: 'Masquer les détails',
        journeyDetails: 'Détails du voyage',: 'Atrasado',
        onTime: 'Na hora',
        cancelled: 'Cancelado',
        delayedByMinutes: 'Atrasado {{minutes}} min',
        trainCode: 'Comboio {{code}}',
        connectionJourney: 'Viagem com ligação',
        directJourney: 'Viagem direta',
        changeAt: 'Mudança em',
        segment: 'Segmento',
        transfer: 'Transferência',
        transferTime: 'Tempo de transferência',
        totalDuration: 'Duração total',
        showDetails: 'Mostrar detalhes',
        hideDetails: 'Ocultar detalhes',
        journeyDetails: 'Detalhes da viagem',: 'Retrasado',
        onTime: 'A tiempo',
        cancelled: 'Cancelado',
        delayedByMinutes: 'Retrasado {{minutes}} min',
        trainCode: 'Tren {{code}}',
        connectionJourney: 'Viaje con transbordo',
        directJourney: 'Viaje directo',
        changeAt: 'Cambio en',
        segment: 'Tramo',
        transfer: 'Transbordo',
        transferTime: 'Tiempo de transbordo',
        totalDuration: 'Duración total',
        showDetails: 'Mostrar detalles',
        hideDetails: 'Ocultar detalles',
        journeyDetails: 'Detalles del viaje',
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
        searchResults: 'Risultati ricerca',
        train: 'treno',
        trains: 'treni',
        departure: 'Partenza',
        arrival: 'Arrivo',
        duration: 'Durata',
        direction: 'Direzione',
        intermediateStops: 'fermate intermedie',
        showAllStops: 'Mostra tutte le fermate',
        quickSelection: 'Selezione rapida',
        apiError: 'Servizio temporaneamente non disponibile',
        apiErrorDescription: 'Riprovare tra pochi istanti. Se il problema persiste, contattare il supporto.',
        networkError: 'Errore di connessione',
        networkErrorDescription: 'Controlla la tua connessione a Internet e riprova.',
        invalidStationError: 'Stazione non valida',
        invalidStationErrorDescription: 'Seleziona una stazione valida dall\'elenco.',
        searchError: 'Errore di ricerca',
        searchErrorDescription: 'Si è verificato un errore durante la ricerca. Riprova.',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'In ritardo',
        onTime: 'In orario',
        cancelled: 'Annullato',
        delayedByMinutes: 'In ritardo di {{minutes}} min',
        trainCode: 'Treno {{code}}',
        connectionJourney: 'Viaggio con cambio',
        directJourney: 'Viaggio diretto',
        changeAt: 'Cambio a',
        segment: 'Tratta',
        transfer: 'Cambio',
        transferTime: 'Tempo di cambio',
        totalDuration: 'Durata totale',
        showDetails: 'Mostra dettagli',
        hideDetails: 'Nascondi dettagli',
        journeyDetails: 'Dettagli del viaggio',

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
        // DEPARTURES RESULTS
        // ========================================
        nextDeparturesFrom: 'Prossime partenze da',
        nextArrivalsTo: 'Prossimi arrivi a',
        searchingArrivals: 'Ricerca arrivi...',
        noDeparturesFound: 'Nessuna partenza trovata',
        noArrivalsFound: 'Nessun arrivo trovato',
        noDeparturesFromStation: 'Nessuna partenza trovata da',
        noArrivalsToStation: 'Nessun arrivo trovato a',
        departuresFromStation: 'Partenze da stazione',
        arrivalsToStation: 'Arrivi alla stazione',
        departuresFound: 'partenze trovate',
        arrivalsFound: 'arrivi trovati',
        platform: 'Binario',

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
        quickSelection: 'Quick Selection',

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

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchingTrainsInProgress: 'Searching trains...',
        noTrainsFound: 'No trains found',
        noTrainsFoundDescription: 'Try modifying your search criteria or verify that the stations are correct.',
        searchResults: 'Search results',
        train: 'train',
        trains: 'trains',
        departure: 'Departure',
        arrival: 'Arrival',
        duration: 'Duration',
        direction: 'Direction',
        intermediateStops: 'intermediate stops',
        showAllStops: 'Show all stops',
        apiError: 'Service temporarily unavailable',
        apiErrorDescription: 'Please try again in a few moments. If the problem persists, contact support.',
        networkError: 'Connection error',
        networkErrorDescription: 'Check your internet connection and try again.',
        invalidStationError: 'Invalid station',
        invalidStationErrorDescription: 'Please select a valid station from the list.',
        searchError: 'Search error',
        searchErrorDescription: 'An error occurred during the search. Please try again.',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'Delayed',
        onTime: 'On time',
        cancelled: 'Cancelled',
        delayedByMinutes: 'Delayed by {{minutes}} min',
        trainCode: 'Train {{code}}',
        connectionJourney: 'Connection journey',
        directJourney: 'Direct journey',
        changeAt: 'Change at',
        segment: 'Segment',
        transfer: 'Transfer',
        transferTime: 'Transfer time',
        totalDuration: 'Total duration',
        showDetails: 'Show details',
        hideDetails: 'Hide details',
        journeyDetails: 'Journey details',

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

        // Departures results
        nextDeparturesFrom: 'Next departures from',
        nextArrivalsTo: 'Next arrivals to',
        searchingArrivals: 'Searching arrivals...',
        noDeparturesFound: 'No departures found',
        noArrivalsFound: 'No arrivals found',
        noDeparturesFromStation: 'No departures found from',
        noArrivalsToStation: 'No arrivals found to',
        departuresFromStation: 'Departures from station',
        arrivalsToStation: 'Arrivals to station',
        departuresFound: 'departures found',
        arrivalsFound: 'arrivals found',
        platform: 'Platform',

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
        quickSelection: 'Selección Rápida',

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
        apiError: 'Servicio temporalmente no disponible',
        apiErrorDescription: 'Inténtalo de nuevo en unos momentos. Si el problema persiste, contacta con el soporte.',
        networkError: 'Error de conexión',
        networkErrorDescription: 'Verifica tu conexión a Internet y vuelve a intentarlo.',
        invalidStationError: 'Estación no válida',
        invalidStationErrorDescription: 'Por favor, selecciona una estación válida de la lista.',
        searchError: 'Error de búsqueda',
        searchErrorDescription: 'Ocurrió un error durante la búsqueda. Por favor, inténtalo de nuevo.',

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchResults: 'Resultados de búsqueda',
        train: 'tren',
        trains: 'trenes',
        departure: 'Salida',
        arrival: 'Llegada',
        duration: 'Duración',
        direction: 'Dirección',
        intermediateStops: 'paradas intermedias',
        showAllStops: 'Mostrar todas las paradas',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'Retrasado',
        onTime: 'A tiempo',
        cancelled: 'Cancelado',
        delayedByMinutes: 'Retrasado por {{minutes}} min',
        trainCode: 'Tren {{code}}',

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

        // Departures results
        nextDeparturesFrom: 'Próximas partidas de',
        nextArrivalsTo: 'Próximas llegadas a',
        searchingArrivals: 'Buscando llegadas...',
        noDeparturesFound: 'No se encontraron salidas',
        noArrivalsFound: 'No se encontraron llegadas',
        noDeparturesFromStation: 'No se encontraron salidas desde',
        noArrivalsToStation: 'No se encontraron llegadas a',
        departuresFromStation: 'Salidas desde estación',
        arrivalsToStation: 'Llegadas a estación',
        departuresFound: 'salidas encontradas',
        arrivalsFound: 'llegadas encontradas',
        platform: 'Andén',

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
        operatingDaysWeekdaysAndSaturday: 'Laborables e sábado',

        // Footer
        footerDisclaimer: 'Este projeto não tem afiliación com EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Este é um projeto educativo de código aberto criado solo com fins de aprendizagem.',
        footerMadeWith: 'Feito com',
        footerBy: 'por',
        footerEducationalCopyright: 'Projeto Educativo'
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
        quickSelection: 'Seleção Rápida',

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
        apiError: 'Serviço temporariamente indisponível',
        apiErrorDescription: 'Tente novamente em alguns momentos. Se o problema persistir, entre em contato com o suporte.',
        networkError: 'Erro de conexão',
        networkErrorDescription: 'Verifique sua conexão com a Internet e tente novamente.',
        invalidStationError: 'Estação inválida',
        invalidStationErrorDescription: 'Selecione uma estação válida na lista.',
        searchError: 'Erro de pesquisa',
        searchErrorDescription: 'Ocorreu um erro durante a pesquisa. Tente novamente.',

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchResults: 'Resultados da pesquisa',
        train: 'comboio',
        trains: 'comboios',
        departure: 'Partida',
        arrival: 'Chegada',
        duration: 'Duração',
        direction: 'Direção',
        intermediateStops: 'paradas intermédias',
        showAllStops: 'Mostrar todas as paradas',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'Atrasado',
        onTime: 'No horário',
        cancelled: 'Cancelado',
        delayedByMinutes: 'Atrasado por {{minutes}} min',
        trainCode: 'Comboio {{code}}',

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
        searchingNextDepartures: 'Procurando próximas partidas...',
        searchNextDepartures: 'Buscar Próximas Partidas',

        // Departures results
        nextDeparturesFrom: 'Próximas partidas de',
        nextArrivalsTo: 'Próximas chegadas a',
        searchingArrivals: 'Procurando chegadas...',
        noDeparturesFound: 'Nenhuma partida encontrada',
        noArrivalsFound: 'Nenhuma chegada encontrada',
        noDeparturesFromStation: 'Nenhuma partida encontrada de',
        noArrivalsToStation: 'Nenhuma chegada encontrada para',
        departuresFromStation: 'Partidas da estação',
        arrivalsToStation: 'Chegadas à estação',
        departuresFound: 'partidas encontradas',
        arrivalsFound: 'chegadas encontradas',
        platform: 'Plataforma',

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
        quickSelection: 'Sélection Rapide',

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
        apiError: 'Service temporairement indisponible',
        apiErrorDescription: 'Veuillez réessayer dans quelques instants. Si le problème persiste, contactez le support.',
        networkError: 'Erreur de connexion',
        networkErrorDescription: 'Vérifiez votre connexion Internet et réessayez.',
        invalidStationError: 'Gare invalide',
        invalidStationErrorDescription: 'Veuillez sélectionner une gare valide dans la liste.',
        searchError: 'Erreur de recherche',
        searchErrorDescription: 'Une erreur est survenue lors de la recherche. Veuillez réessayer.',

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchResults: 'Résultats de recherche',
        train: 'train',
        trains: 'trains',
        departure: 'Départ',
        arrival: 'Arrivée',
        duration: 'Durée',
        direction: 'Direction',
        intermediateStops: 'arrêts intermédiaires',
        showAllStops: 'Afficher tous les arrêts',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'Retardé',
        onTime: 'À l\'heure',
        cancelled: 'Annulé',
        delayedByMinutes: 'Retardé de {{minutes}} min',
        trainCode: 'Train {{code}}',

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

        // Departures results
        nextDeparturesFrom: 'Prochaines départs de',
        nextArrivalsTo: 'Prochaines arrivées à',
        searchingArrivals: 'Recherche arrivées...',
        noDeparturesFound: 'Aucun départ trouvé',
        noArrivalsFound: 'Aucune arrivée trouvée',
        noDeparturesFromStation: 'Aucun départ trouvé depuis',
        noArrivalsToStation: 'Aucune arrivée trouvée vers',
        departuresFromStation: 'Départs de la gare',
        arrivalsToStation: 'Arrivées à la gare',
        departuresFound: 'départs trouvés',
        arrivalsFound: 'arrivées trouvées',
        platform: 'Voie',

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
        quickSelection: 'Schnellauswahl',

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
        apiError: 'Dienst vorübergehend nicht verfügbar',
        apiErrorDescription: 'Bitte versuchen Sie es in wenigen Augenblicken erneut. Wenn das Problem weiterhin besteht, wenden Sie sich an den Support.',
        networkError: 'Verbindungsfehler',
        networkErrorDescription: 'Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
        invalidStationError: 'Ungültiger Bahnhof',
        invalidStationErrorDescription: 'Bitte wählen Sie einen gültigen Bahnhof aus der Liste aus.',
        searchError: 'Suchfehler',
        searchErrorDescription: 'Bei der Suche ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchResults: 'Suchergebnisse',
        train: 'zug',
        trains: 'züge',
        departure: 'Abfahrt',
        arrival: 'Ankunft',
        duration: 'Dauer',
        direction: 'Richtung',
        intermediateStops: 'zwischenstopps',
        showAllStops: 'Alle Haltestellen anzeigen',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'Verspätet',
        onTime: 'Pünktlich',
        cancelled: 'Storniert',
        delayedByMinutes: 'Verspätet um {{minutes}} Min',
        trainCode: 'Zug {{code}}',

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

        // Departures results
        nextDeparturesFrom: 'Nächste Abfahrten von',
        nextArrivalsTo: 'Nächste Ankünfte nach',
        searchingArrivals: 'Suche Ankünfte...',
        noDeparturesFound: 'Keine Abfahrten gefunden',
        noArrivalsFound: 'Keine Ankünfte gefunden',
        noDeparturesFromStation: 'Keine Abfahrten gefunden von',
        noArrivalsToStation: 'Keine Ankünfte gefunden nach',
        departuresFromStation: 'Abfahrten vom Bahnhof',
        arrivalsToStation: 'Ankünfte am Bahnhof',
        departuresFound: 'Abfahrten gefunden',
        arrivalsFound: 'Ankünfte gefunden',
        platform: 'Gleis',

        // Train categories
        categoryRegionale: 'Regional',
        categoryIntercity: 'Direkt (D)',
        categoryCampaniaExpress: 'Campania Express',

        // Direction labels
        directionNapoli: 'Neapel',
        directionSorrento: 'Sorrento',

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
