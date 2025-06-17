export const languages = {
    it: { name: 'Italiano', flag: '🇮🇹' },
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    pt: { name: 'Português', flag: '🇵🇹' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' }
} as const;

export type Language = keyof typeof languages;

export const translations = {
    it: {
        // Header/Navigation
        findTrains: 'Cerca Treni',
        searchSchedules: 'Cerca orari dei treni e prenota il tuo viaggio',

        // Form labels
        from: 'Da',
        to: 'A',
        departureTime: 'Orario di Partenza',
        departureStation: 'Stazione di partenza',
        arrivalStation: 'Stazione di arrivo',

        // Quick time buttons
        now: 'Ora',
        oneHour: '+1 ora',
        twoHours: '+2 ore',
        tomorrow: 'Domani',

        // Search button
        searchTrains: 'Cerca Treni',
        searchingTrains: 'Ricerca treni...',

        // Error messages
        departureRequired: 'La stazione di partenza è obbligatoria',
        arrivalRequired: 'La stazione di arrivo è obbligatoria',
        stationsDifferent: 'La stazione di arrivo deve essere diversa da quella di partenza',
        timeRequired: 'L\'orario di partenza è obbligatorio',

        // Date picker
        selectDateTime: 'Seleziona data e ora',
        date: 'Data',
        time: 'Ora',
        selectDate: 'Seleziona data',

        // Train results
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
        departure: 'Part'
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
        departure: 'Dep'
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
        departure: 'Sal'
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
        departure: 'Part'
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
        departure: 'Dép'
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
        departure: 'Abf'
    }
} as const;

export type TranslationKey = keyof typeof translations['en'];
