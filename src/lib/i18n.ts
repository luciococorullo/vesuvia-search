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
        findTrainsSubtitle: 'Ricerca semplice e veloce per la rete EAV in Campania',
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

        // ========================================
        // DYNAMIC ROUTE PAGES
        // ========================================
        routePages: {
            common: {
                metaTitle: "Treno da {{from}} a {{to}} - Orari, Durata e Guida Completa",
                metaDescription: "Scopri orari, durata e informazioni complete sul treno da {{from}} a {{to}}. Guida dettagliata con consigli di viaggio e opzioni di trasporto.",
                pageTitle: "🚆 Da {{from}} a {{to}} in Treno",
                intro: "Informazioni complete sul collegamento ferroviario tra {{from}} e {{to}}, orari aggiornati e consigli di viaggio.",
                trainSchedules: "Orari dei Treni",
                travelTime: "Tempo di Viaggio",
                travelOptions: "Opzioni di Viaggio",
                fares: "Tariffe",
                travelTips: "Consigli di Viaggio",
                howToReach: "Come Raggiungere",
                fromStation: "Dalla stazione di {{station}}",
                toDestination: "A {{destination}}",
                directConnection: "Collegamento diretto",
                connectionWithTransfer: "Collegamento con cambio",
                regularTrains: "Treni Regionali",
                expressTrains: "Treni Campania Express",
                mostPopularTimes: "Orari più frequentati",
                lastTrains: "Ultimi treni",
                earlyMorning: "Prima mattina",
                ticketPurchaseOptions: "Dove Acquistare i Biglietti",
                onboardFacilities: "Servizi a Bordo",
                accessibility: "Accessibilità",
                schedulesSubject: "Gli orari sono soggetti a modifiche. Controllare sempre prima del viaggio."
            },
            napoliSorrento: {
                specificInfo: "La linea Napoli-Sorrento è la più frequentata della rete Circumvesuviana, con treni ogni 30 minuti durante l'alta stagione.",
                attractionsOnRoute: "Attrazioni lungo il percorso: Pompei, Ercolano, Torre Annunziata, Castellammare di Stabia, Vico Equense.",
                peakTimeWarning: "Durante l'alta stagione estiva i treni possono essere molto affollati, soprattutto nelle ore di punta.",
                travelTip1: "Considera il Campania Express per un viaggio più veloce e confortevole durante l'alta stagione.",
                travelTip2: "I biglietti possono essere acquistati nelle stazioni o tramite l'app ufficiale EAV.",
                travelTip3: "Porta sempre con te un documento di identità valido per i controlli a bordo."
            },
            napoliPompei: {
                specificInfo: "Il collegamento Napoli-Pompei è molto frequentato dai turisti diretti agli scavi archeologici.",
                attractionsInfo: "La fermata più vicina agli Scavi Archeologici è 'Pompei Scavi - Villa dei Misteri'.",
                archaeologicalParkInfo: "Gli Scavi Archeologici sono aperti tutti i giorni dalle 9:00 alle 19:00 (ultimo ingresso alle 17:30).",
                travelTip1: "Scendi alla stazione 'Pompei Scavi - Villa dei Misteri', a soli 100m dall'ingresso principale degli scavi.",
                travelTip2: "Durante l'alta stagione, considera il Campania Express che fa meno fermate e ha posti garantiti.",
                travelTip3: "Porta con te acqua e protezione solare, poiché l'area archeologica offre poca ombra."
            },
            napoliErcolano: {
                specificInfo: "Il sito archeologico di Ercolano è a circa 700m dalla stazione 'Ercolano Scavi'.",
                attractionsInfo: "Oltre agli scavi, puoi visitare il MAV - Museo Archeologico Virtuale a poca distanza dalla stazione.",
                visitInfo: "Ercolano è generalmente meno affollato di Pompei e può essere visitato in circa 2-3 ore.",
                travelTip1: "Dalla stazione alla zona archeologica c'è una leggera discesa di circa 10 minuti a piedi.",
                travelTip2: "Considera un biglietto combinato Pompei+Ercolano se intendi visitare entrambi i siti.",
                travelTip3: "I primi treni del mattino sono i meno affollati, ideali per iniziare presto la visita."
            },
            sorrentoPompei: {
                specificInfo: "Il collegamento Sorrento-Pompei è ideale per chi soggiorna in Costiera e vuole visitare gli scavi.",
                attractionsInfo: "Da Pompei puoi facilmente proseguire verso Napoli o Ercolano nella stessa giornata.",
                visitDuration: "Considera almeno 4 ore per la visita degli scavi più i tempi di viaggio.",
                travelTip1: "Parti presto da Sorrento per evitare la folla e il caldo estivo a Pompei.",
                travelTip2: "Verifica gli orari dei treni di ritorno, specialmente per gli ultimi collegamenti della giornata.",
                travelTip3: "Durante l'alta stagione, considera il Campania Express per un viaggio più confortevole."
            }
        },

        // ========================================
        // TRAVEL TIME CALCULATOR
        // ========================================
        travelTimePage: {
            metaTitle: "Calcolo Tempi di Viaggio - Circumvesuviana e EAV",
            metaDescription: "Calcola il tempo di viaggio esatto tra tutte le stazioni della rete Circumvesuviana ed EAV. Confronta treni regionali ed espressi.",
            pageTitle: "⏱️ Calcolatore Tempi di Viaggio",
            intro: "Calcola e confronta i tempi di viaggio tra le stazioni della rete Circumvesuviana ed EAV. Utile per pianificare i tuoi spostamenti in Campania.",
            travelTimeCalculator: "Calcolatore Tempi di Viaggio",
            selectStations: "Seleziona le stazioni",
            calculateTime: "Calcola tempo",
            calculatingTime: "Calcolo in corso...",
            travelTimeResults: "Risultati tempo di viaggio",
            standardTrain: "Treno Regionale",
            expressTrain: "Treno Espresso",
            timeSaving: "Risparmio di tempo",
            timeDifference: "Differenza di tempo",
            regularTrainTime: "Tempo treno regionale",
            expressTrainTime: "Tempo treno espresso",
            averageWaitingTime: "Tempo medio di attesa",
            peakHoursDuration: "Durata ore di punta",
            offPeakDuration: "Durata ore non di punta",
            noExpressService: "Nessun servizio espresso disponibile su questa tratta",
            transfersRequired: "Cambi necessari",
            popularConnections: "Collegamenti popolari",
            travelTips: "Consigli di viaggio",
            tip1: "I tempi di viaggio possono variare in base all'orario e al giorno della settimana.",
            tip2: "I treni Campania Express effettuano meno fermate e sono più rapidi, ma hanno un supplemento di prezzo.",
            tip3: "Durante le ore di punta, considera di aggiungere 5-10 minuti al tempo di viaggio stimato.",
            tip4: "Considera il Campania Express per destinazioni turistiche",
            popularRoutes: "Tratte popolari",
            napoliSorrento: "Napoli - Sorrento",
            napoliPompei: "Napoli - Pompei",
            napoliErcolano: "Napoli - Ercolano",
            sorrentoPompei: "Sorrento - Pompei",
            effects: {
                title: "Fattori che influenzano i tempi di viaggio",
                trainType: "Tipo di treno (regionale/espresso)",
                timeOfDay: "Orario del giorno (punta/non di punta)",
                dayOfWeek: "Giorno della settimana (feriale/festivo)",
                season: "Stagionalità (alta/bassa stagione)",
                weatherConditions: "Condizioni meteorologiche"
            },
            howToReadTimes: "Come leggere i tempi",
            regularTime: "Tempo regolare",
            regularTimeDescription: "Treni normali con tutte le fermate",
            expressTime: "Tempo express",
            expressTimeDescription: "Treni turistici o con fermate limitate",
            variations: "Variazioni",
            variationsDescription: "I tempi possono variare per traffico e orari",
            stops: "Fermate",
            stations: "stazioni",
            note: "Nota",
            detailedGuide: "Guida dettagliata per questa tratta",
            optimalPlanning: "Pianificazione Ottimale",
            forTourists: "Per Turisti",
            touristTip1: "Pompei Scavi: pianifica almeno 3 ore per la visita",
            touristTip2: "Sorrento: consideralo come base per la Costiera Amalfitana",
            touristTip3: "Ercolano: visita più breve, ideale per mezza giornata",
            touristTip4: "Acquista i biglietti in anticipo durante l'estate",
            checkRealTimeSchedules: "Controlla Orari in Tempo Reale",
            peakHoursDescription: "Nelle ore di punta i treni possono essere più lenti a causa del maggior traffico",
            expressTrainsDescription: "I treni express saltano alcune fermate, riducendo significativamente i tempi",
            weatherDelaysDescription: "Ritardi, lavori in corso o condizioni meteo possono influenzare i tempi",
            faq: {
                title: "Domande frequenti sui tempi di viaggio",
                q1: "Quanto tempo ci vuole da Napoli a Sorrento?",
                a1: "Il tempo di viaggio medio da Napoli Porta Nolana a Sorrento è di circa 65-70 minuti con il treno regionale e 45-50 minuti con il Campania Express.",
                q2: "Qual è il treno più veloce per Pompei da Napoli?",
                a2: "Il Campania Express è il collegamento più veloce, con un tempo di percorrenza di circa 25 minuti da Napoli a Pompei Scavi.",
                q3: "Quanto dura il viaggio da Napoli a Ercolano Scavi?",
                a3: "Il viaggio da Napoli a Ercolano Scavi dura circa 20-25 minuti con la Circumvesuviana, ed è una delle destinazioni più veloci da raggiungere.",
                q4: "C'è differenza di tempo tra giorni feriali e festivi?",
                a4: "Sì, nei giorni festivi ci possono essere meno corse e tempi di attesa maggiori, con possibile aumento del tempo totale di viaggio."
            }
        },

        // ========================================
        // HOMEPAGE CONTENT
        // ========================================
        pageTitle: 'Orari Treni Napoli e Circumvesuviana',
        faqSectionTitle: 'Domande frequenti sui treni a Napoli e provincia',
        pricingDisclaimer: {
            title: 'ℹ️ Informazioni sui Prezzi',
            content: 'Per informazioni aggiornate sui prezzi dei biglietti EAV e Circumvesuviana, consulta i punti vendita ufficiali EAV o il sito web ufficiale. VesuviaSearch fornisce esclusivamente informazioni sugli orari dei treni.'
        },
        tourismCTA: {
            title: 'Pianifica il tuo viaggio a Napoli e provincia',
            description: 'Raggiungi facilmente Sorrento, Pompei, Ercolano e tutte le destinazioni turistiche della Campania con gli orari aggiornati della Circumvesuviana',
            buttonText: '🗺️ Esplora Destinazioni Turistiche'
        },
        homeFAQs: {
            trainSchedules: {
                question: 'Quali sono gli orari dei treni da Napoli a Sorrento?',
                answer: 'I treni della Circumvesuviana da Napoli a Sorrento partono ogni 30 minuti circa dalle 6:00 alle 21:40. Il viaggio dura circa 1 ora e 15 minuti. Il primo treno parte intorno alle 6:15 da Napoli Porta Nolana, l\'ultimo intorno alle 21:40.'
            },
            ticketPrices: {
                question: 'Quanto costa il biglietto da Napoli a Pompei?',
                answer: 'Il biglietto standard da Napoli a Pompei Scavi costa <strong>€2,80</strong>. Per il Campania Express (servizio turistico premium) il costo è di circa €8. I biglietti si acquistano presso le biglietterie automatiche o gli sportelli.'
            },
            stations: {
                question: 'Dove si prende la Circumvesuviana a Napoli?',
                answer: 'Le stazioni principali sono <strong>Napoli Porta Nolana</strong> (capolinea) e <strong>Napoli Piazza Garibaldi</strong> (collegata alla stazione centrale FS). Entrambe servono tutte le destinazioni della provincia.'
            },
            pompeiDirections: {
                question: 'Come arrivare agli Scavi di Pompei da Napoli?',
                answer: 'Prendi la Circumvesuviana da Napoli Porta Nolana verso Sorrento/Poggiomarino e scendi a <strong>Pompei Scavi - Villa dei Misteri</strong> dopo 35 minuti. L\'ingresso agli scavi è a 100 metri dalla stazione.'
            }
        },

        // Footer
        footerDisclaimer: 'Questo progetto non ha alcuna affiliazione con EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Questo è un progetto open source educativo creato solo a scopo didattico.',
        footerMadeWith: 'Realizzato con',
        footerBy: 'da',
        footerEducationalCopyright: 'Progetto Educativo',

        // ========================================
        // PWA INSTALLATION
        // ========================================
        installApp: 'Installa',
        installing: 'Installazione...',
        appInstalled: 'App installata con successo',
        offlineMode: 'Modalità offline',
        updateAvailable: 'Aggiornamento disponibile',
        updateApp: 'Aggiorna App',
        iosInstallTitle: 'Installa su iOS',
        iosInstallInstructions: 'Per installare questa app sul tuo dispositivo iOS:\n\n1. Tocca il pulsante Condividi (quadrato con freccia)\n2. Scorri verso il basso e tocca "Aggiungi alla schermata Home"\n3. Tocca "Aggiungi" nell\'angolo in alto a destra',
        addToHomeScreen: 'Aggiungi alla Home',

        // ========================================
        // ACCESSIBILITY PAGE
        // ========================================
        accessibilityPage: {
            name: "Informazioni Accessibilità",
            description:
                "Informazioni complete sull'accessibilità di VesuviaSearch e delle stazioni della Circumvesuviana",
            hero: {
                title: "♿ Accessibilità VesuviaSearch",
                description:
                    "VesuviaSearch è progettato per essere accessibile a tutti gli utenti, incluse le persone con disabilità. Ecco le informazioni complete sui nostri standard di accessibilità e sulle stazioni Circumvesuviana accessibili.",
            },
            webAccessibility: {
                title: "🌐 Accessibilità del Sito Web",
                standards: {
                    title: "Standard Seguiti",
                    wcag: "WCAG 2.1 Level AA - Conformità alle linee guida internazionali",
                    section508: "Section 508 - Standard di accessibilità federali USA",
                    en301: "EN 301 549 - Standard europeo per accessibilità ICT",
                    leggeStanca: "Legge Stanca - Normativa italiana sull'accessibilità",
                },
                features: {
                    title: "Funzionalità Accessibili",
                    keyboardNavigation: "Navigazione da tastiera - Tutti gli elementi sono navigabili con Tab",
                    screenReader: "Screen reader compatibile - Funziona con JAWS, NVDA, VoiceOver",
                    highContrast: "Alto contrasto - Testi ben leggibili su tutti gli sfondi",
                    focusVisible: "Focus visibile - Indicatori chiari per navigazione da tastiera",
                    altText: "Testi alternativi - Tutte le immagini hanno descrizioni",
                    descriptiveLabels: "Etichette descrittive - Form e controlli ben etichettati",
                },
                shortcuts: {
                    title: "Scorciatoie da Tastiera",
                    tab: "Naviga tra gli elementi",
                    enterSpace: "Attiva bottoni e link",
                    esc: "Chiude modal e menu",
                    arrows: "Naviga nelle liste e menu",
                },
            },
            legal: {
                title: "📋 Conformità Legale",
                accessibilityDeclaration: "Dichiarazione di Accessibilità:",
                description:
                    "VesuviaSearch si impegna a garantire l'accessibilità digitale per persone con disabilità in conformità alla",
                leggeStancaLink: "Legge Stanca",
                and: " e alle ",
                wcagLink: "WCAG 2.1",
                lastUpdate: "Ultimo aggiornamento:",
                nextReview: "Prossima revisione:",
            },
            faq1: {
                question: "Tutte le funzionalità del sito sono accessibili?",
                answer: "Sì, VesuviaSearch è progettato per essere completamente accessibile secondo gli standard WCAG 2.1 Livello AA. Tutte le funzionalità, inclusi la ricerca dei treni, gli orari e le pagine informative, sono accessibili agli utenti con disabilità e compatibili con le tecnologie assistive."
            },
            faq2: {
                question: "Quali caratteristiche di accessibilità sono disponibili nelle stazioni della Circumvesuviana?",
                answer: "L'accessibilità varia a seconda della stazione. Le stazioni principali come Napoli Porta Nolana, Napoli Garibaldi e Sorrento dispongono di accesso per sedie a rotelle, percorsi tattili e servizi accessibili. Per informazioni specifiche sulle stazioni, consultare il sito ufficiale EAV o contattare il loro servizio di accessibilità."
            },
        },
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
        findTrainsSubtitle: 'Simple and fast search for the EAV Circumvesuviana network in Campania',
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

        // ========================================
        // DYNAMIC ROUTE PAGES
        // ========================================
        routePages: {
            common: {
                metaTitle: "Train from {{from}} to {{to}} - Schedules, Duration and Complete Guide",
                metaDescription: "Discover schedules, duration and complete information about the train from {{from}} to {{to}}. Detailed guide with travel tips and transport options.",
                pageTitle: "🚆 From {{from}} to {{to}} by Train",
                intro: "Complete information about the train connection between {{from}} and {{to}}, updated schedules and travel tips.",
                trainSchedules: "Train Schedules",
                travelTime: "Travel Time",
                travelOptions: "Travel Options",
                fares: "Fares",
                travelTips: "Travel Tips",
                howToReach: "How To Reach",
                fromStation: "From {{station}} station",
                toDestination: "To {{destination}}",
                directConnection: "Direct connection",
                connectionWithTransfer: "Connection with transfer",
                regularTrains: "Regional Trains",
                expressTrains: "Campania Express Trains",
                mostPopularTimes: "Most Popular Times",
                lastTrains: "Last trains",
                earlyMorning: "Early morning",
                ticketPurchaseOptions: "Where to Buy Tickets",
                onboardFacilities: "Onboard Services",
                accessibility: "Accessibility",
                schedulesSubject: "Schedules are subject to change. Always check before traveling."
            },
            napoliSorrento: {
                specificInfo: "The Napoli-Sorrento line is the busiest on the Circumvesuviana network, with trains every 30 minutes during the high season.",
                attractionsOnRoute: "Attractions along the route: Pompeii, Herculaneum, Torre Annunziata, Castellammare di Stabia, Vico Equense.",
                peakTimeWarning: "During the summer high season, trains can be very crowded, especially during peak hours.",
                travelTip1: "Consider the Campania Express for a faster and more comfortable journey during the high season.",
                travelTip2: "Tickets can be purchased at the stations or through the official EAV app.",
                travelTip3: "Always carry a valid ID for onboard checks."
            },
            napoliPompei: {
                specificInfo: "The Napoli-Pompei connection is very popular with tourists heading to the archaeological excavations.",
                attractionsInfo: "The closest stop to the Archaeological Excavations is 'Pompei Scavi - Villa dei Misteri'.",
                archaeologicalParkInfo: "The Archaeological Excavations are open daily from 9:00 am to 7:00 pm (last entry at 5:30 pm).",
                travelTip1: "Get off at the 'Pompei Scavi - Villa dei Misteri' station, just 100m from the main entrance of the excavations.",
                travelTip2: "During the high season, consider the Campania Express which makes fewer stops and has guaranteed seats.",
                travelTip3: "Bring water and sunscreen, as the archaeological area offers little shade."
            },
            napoliErcolano: {
                specificInfo: "The archaeological site of Herculaneum is about 700m from the 'Ercolano Scavi' station.",
                attractionsInfo: "In addition to the excavations, you can visit the MAV - Virtual Archaeological Museum a short distance from the station.",
                visitInfo: "Herculaneum is generally less crowded than Pompeii and can be visited in about 2-3 hours.",
                travelTip1: "There is a slight descent of about 10 minutes on foot from the station to the archaeological area.",
                travelTip2: "Consider a combined Pompeii+Herculaneum ticket if you plan to visit both sites.",
                travelTip3: "The early morning trains are the least crowded, ideal for starting the visit early."
            },
            sorrentoPompei: {
                specificInfo: "The Sorrento-Pompei connection is ideal for those staying on the Coast and want to visit the excavations.",
                attractionsInfo: "From Pompei you can easily continue to Naples or Herculaneum on the same day.",
                visitDuration: "Allow at least 4 hours for the visit of the excavations plus travel time.",
                travelTip1: "Leave early from Sorrento to avoid the crowd and summer heat in Pompei.",
                travelTip2: "Check the return train times, especially for the last connections of the day.",
                travelTip3: "During the high season, consider the Campania Express for a more comfortable journey."
            }
        },

        // ========================================
        // TRAVEL TIME CALCULATOR
        // ========================================
        travelTimePage: {
            metaTitle: "Travel Time Calculation - Circumvesuviana and EAV",
            metaDescription: "Calculate the exact travel time between all stations of the Circumvesuviana and EAV networks. Compare regional and express trains.",
            pageTitle: "⏱️ Travel Time Calculator",
            intro: "Calculate and compare travel times between stations on the Circumvesuviana and EAV networks. Useful for planning your travels in Campania.",
            travelTimeCalculator: "Travel Time Calculator",
            selectStations: "Select stations",
            calculateTime: "Calculate time",
            calculatingTime: "Calculating...",
            travelTimeResults: "Travel time results",
            standardTrain: "Regional Train",
            expressTrain: "Express Train",
            timeSaving: "Time saving",
            timeDifference: "Time difference",
            regularTrainTime: "Regional train time",
            expressTrainTime: "Express train time",
            averageWaitingTime: "Average waiting time",
            peakHoursDuration: "Peak hours duration",
            offPeakDuration: "Off-peak duration",
            noExpressService: "No express service available on this route",
            transfersRequired: "Transfers required",
            popularConnections: "Popular connections",
            travelTips: "Travel tips",
            tip1: "Travel times may vary depending on the time and day of the week.",
            tip2: "Campania Express trains make fewer stops and are faster, but have an additional cost.",
            tip3: "During peak hours, consider adding 5-10 minutes to the estimated travel time.",
            tip4: "Consider the Campania Express for tourist destinations",
            popularRoutes: "Popular routes",
            napoliSorrento: "Napoli - Sorrento",
            napoliPompei: "Napoli - Pompei",
            napoliErcolano: "Napoli - Ercolano",
            sorrentoPompei: "Sorrento - Pompei",
            effects: {
                title: "Factors affecting travel times",
                trainType: "Type of train (regional/express)",
                timeOfDay: "Time of day (peak/off-peak)",
                dayOfWeek: "Day of the week (weekday/holiday)",
                season: "Seasonality (high/low season)",
                weatherConditions: "Weather conditions"
            },
            howToReadTimes: "How to read travel times",
            regularTime: "Regular time",
            regularTimeDescription: "Normal trains with all stops",
            expressTime: "Express time",
            expressTimeDescription: "Tourist trains or with limited stops",
            variations: "Variations",
            variationsDescription: "Times may vary due to traffic and schedules",
            stops: "Stops",
            stations: "stations",
            note: "Note",
            detailedGuide: "Detailed guide for this route",
            optimalPlanning: "Optimal Planning",
            forTourists: "For Tourists",
            touristTip1: "Pompei Scavi: plan at least 3 hours for the visit",
            touristTip2: "Sorrento: consider it as a base for the Amalfi Coast",
            touristTip3: "Herculaneum: shorter visit, ideal for half a day",
            touristTip4: "Buy tickets in advance during the summer",
            checkRealTimeSchedules: "Check Real-Time Schedules",
            peakHoursDescription: "During peak hours trains may be slower due to increased traffic",
            expressTrainsDescription: "Express trains skip some stops, significantly reducing travel time",
            weatherDelaysDescription: "Delays, maintenance work or weather conditions can affect times",
            faq: {
                title: "Frequently asked questions about travel times",
                q1: "How long does it take from Naples to Sorrento?",
                a1: "The average travel time from Napoli Porta Nolana to Sorrento is about 65-70 minutes by regional train and 45-50 minutes by Campania Express.",
                q2: "What is the fastest train to Pompeii from Naples?",
                a2: "The Campania Express is the fastest connection, with a travel time of about 25 minutes from Naples to Pompei Scavi.",
                q3: "How long does it take from Naples to Ercolano Scavi?",
                a3: "The journey from Naples to Ercolano Scavi takes about 20-25 minutes with the Circumvesuviana, and is one of the quickest destinations to reach.",
                q4: "Is there a difference in time between weekdays and holidays?",
                a4: "Yes, on holidays there may be fewer rides and longer waiting times, possibly increasing the total travel time."
            }
        },

        // ========================================
        // HOMEPAGE CONTENT
        // ========================================
        pageTitle: 'Naples and Circumvesuviana Train Schedules',
        faqSectionTitle: 'Frequently asked questions about trains in Naples and its province',
        pricingDisclaimer: {
            title: 'ℹ️ Price Information',
            content: 'For updated information on EAV and Circumvesuviana ticket prices, please consult the official EAV points of sale or the official website. VesuviaSearch provides information about train schedules exclusively.'
        },
        tourismCTA: {
            title: 'Plan your trip to Naples and its province',
            description: 'Easily reach Sorrento, Pompeii, Herculaneum, and all tourist destinations in Campania with updated Circumvesuviana schedules',
            buttonText: '🗺️ Explore Tourist Destinations'
        },
        homeFAQs: {
            trainSchedules: {
                question: 'What are the train schedules from Naples to Sorrento?',
                answer: 'Circumvesuviana trains from Naples to Sorrento depart approximately every 30 minutes from 6:00 AM to 9:40 PM. The journey takes about 1 hour and 15 minutes. The first train departs around 6:15 AM from Naples Porta Nolana, the last around 9:40 PM.'
            },
            ticketPrices: {
                question: 'How much does a ticket from Naples to Pompeii cost?',
                answer: 'The standard ticket from Naples to Pompeii Scavi costs <strong>€2.80</strong>. For the Campania Express (premium tourist service), the cost is about €8. Tickets can be purchased at automatic ticket machines or ticket counters.'
            },
            stations: {
                question: 'Where do I catch the Circumvesuviana in Naples?',
                answer: 'The main stations are <strong>Naples Porta Nolana</strong> (terminus) and <strong>Naples Piazza Garibaldi</strong> (connected to the central FS station). Both serve all destinations in the province.'
            },
            pompeiDirections: {
                question: 'How do I get to the Pompeii archaeological site from Naples?',
                answer: 'Take the Circumvesuviana from Naples Porta Nolana towards Sorrento/Poggiomarino and get off at <strong>Pompeii Scavi - Villa dei Misteri</strong> after 35 minutes. The entrance to the excavations is 100 meters from the station.'
            }
        },

        // Footer
        footerDisclaimer: 'This project has no affiliation with EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'This is an open source educational project created for learning purposes only.',
        footerMadeWith: 'Made with',
        footerBy: 'by',
        footerEducationalCopyright: 'Educational Project',

        // ========================================
        // PWA INSTALLATION
        // ========================================
        installApp: 'Install',
        installing: 'Installing...',
        appInstalled: 'App installed successfully',
        offlineMode: 'Offline mode',
        updateAvailable: 'Update available',
        updateApp: 'Update App',
        iosInstallTitle: 'Install on iOS',
        iosInstallInstructions: 'To install this app on your iOS device:\n\n1. Tap the Share button (square with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right corner',
        addToHomeScreen: 'Add to Home Screen',

        // ========================================
        // ACCESSIBILITY PAGE
        // ========================================
        accessibilityPage: {
            name: "Accessibility Information",
            description:
                "Complete information on the accessibility of VesuviaSearch and the Circumvesuviana stations",
            hero: {
                title: "♿ VesuviaSearch Accessibility",
                description:
                    "VesuviaSearch is designed to be accessible to all users, including people with disabilities. Here is complete information on our accessibility standards and accessible Circumvesuviana stations.",
            },
            webAccessibility: {
                title: "🌐 Website Accessibility",
                standards: {
                    title: "Standards Followed",
                    wcag: "WCAG 2.1 Level AA - Compliance with international guidelines",
                    section508: "Section 508 - US federal accessibility standards",
                    en301: "EN 301 549 - European standard for ICT accessibility",
                    leggeStanca: "Legge Stanca - Italian accessibility legislation",
                },
                features: {
                    title: "Accessible Features",
                    keyboardNavigation: "Keyboard navigation - All elements are navigable with Tab",
                    screenReader: "Screen reader compatible - Works with JAWS, NVDA, VoiceOver",
                    highContrast: "High contrast - Text is easily readable on all backgrounds",
                    focusVisible: "Visible focus - Clear indicators for keyboard navigation",
                    altText: "Alternative text - All images have descriptions",
                    descriptiveLabels: "Descriptive labels - Forms and controls properly labeled",
                },
                shortcuts: {
                    title: "Keyboard Shortcuts",
                    tab: "Navigate between elements",
                    enterSpace: "Activate buttons and links",
                    esc: "Close modals and menus",
                    arrows: "Navigate in lists and menus",
                },
            },
            legal: {
                title: "📋 Legal Compliance",
                accessibilityDeclaration: "Accessibility Declaration:",
                description:
                    "VesuviaSearch is committed to ensuring digital accessibility for people with disabilities in compliance with",
                leggeStancaLink: "Legge Stanca",
                and: " and ",
                wcagLink: "WCAG 2.1",
                lastUpdate: "Last update:",
                nextReview: "Next review:",
            },
            faq1: {
                question: "Are all features of the website accessible?",
                answer: "Yes, VesuviaSearch is designed to be fully accessible according to WCAG 2.1 Level AA standards. All features including train search, schedules, and information pages are accessible to users with disabilities and compatible with assistive technologies."
            },
            faq2: {
                question: "What accessibility features are available at Circumvesuviana stations?",
                answer: "Accessibility varies by station. Major stations like Napoli Porta Nolana, Napoli Garibaldi, and Sorrento have wheelchair access, tactile paths, and accessible facilities. For specific station information, please consult the EAV official website or contact their accessibility service."
            },
        },
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

        searchResults: 'Resultados de la búsqueda',
        train: 'tren',
        trains: 'trenes',
        departure: 'Salida',
        arrival: 'Llegada',
        duration: 'Duración',
        direction: 'Dirección',

        // ========================================
        // DYNAMIC ROUTE PAGES
        // ========================================
        routePages: {
            common: {
                metaTitle: "Tren de {{from}} a {{to}} - Horarios, Duración y Guía Completa",
                metaDescription: "Descubre horarios, duración e información completa sobre el tren de {{from}} a {{to}}. Guía detallada con consejos de viaje y opciones de transporte.",
                pageTitle: "🚆 De {{from}} a {{to}} en Tren",
                intro: "Información completa sobre la conexión ferroviaria entre {{from}} y {{to}}, horarios actualizados y consejos de viaje.",
                trainSchedules: "Horarios de Trenes",
                travelTime: "Tiempo de Viaje",
                travelOptions: "Opciones de Viaje",
                fares: "Tarifas",
                travelTips: "Consejos de Viaje",
                howToReach: "Cómo Llegar",
                fromStation: "Desde la estación de {{station}}",
                toDestination: "A {{destination}}",
                directConnection: "Conexión directa",
                connectionWithTransfer: "Conexión con transbordo",
                regularTrains: "Trenes Regionales",
                expressTrains: "Trenes Campania Express",
                mostPopularTimes: "Horarios más populares",
                lastTrains: "Últimos trenes",
                earlyMorning: "Primera hora de la mañana",
                ticketPurchaseOptions: "Dónde Comprar Billetes",
                onboardFacilities: "Servicios a Bordo",
                accessibility: "Accesibilidad",
                schedulesSubject: "Los horarios están sujetos a cambios. Compruebe siempre antes de viajar."
            },
            napoliSorrento: {
                specificInfo: "La línea Nápoles-Sorrento es la más transitada de la red Circumvesuviana, con trenes cada 30 minutos durante la temporada alta.",
                attractionsOnRoute: "Atracciones a lo largo de la ruta: Pompeya, Herculano, Torre Annunziata, Castellammare di Stabia, Vico Equense.",
                peakTimeWarning: "Durante la temporada alta de verano, los trenes pueden estar muy concurridos, especialmente en horas punta.",
                travelTip1: "Considere el Campania Express para un viaje más rápido y cómodo durante la temporada alta.",
                travelTip2: "Los billetes se pueden comprar en las estaciones o a través de la aplicación oficial de EAV.",
                travelTip3: "Lleve siempre consigo un documento de identidade válido para los controles a bordo."
            },
            napoliPompei: {
                specificInfo: "La conexión Nápoles-Pompeya es muy frecuentada por turistas que se dirigen a las excavaciones arqueológicas.",
                attractionsInfo: "La parada más cercana a las Excavaciones Arqueológicas es 'Pompei Scavi - Villa dei Misteri'.",
                archaeologicalParkInfo: "Las Excavaciones Arqueológicas están abiertas todos los días de 9:00 a 19:00 (última entrada a las 17:30).",
                travelTip1: "Baje en la estación 'Pompei Scavi - Villa dei Misteri', a sólo 100 m de la entrada principal de las excavaciones.",
                travelTip2: "Durante la temporada alta, considere el Campania Express que hace menos paradas y tiene asientos garantizados.",
                travelTip3: "Lleve agua y protección solar, ya que la zona arqueológica ofrece poca sombra."
            },
            napoliErcolano: {
                specificInfo: "El yacimiento arqueológico de Herculano está a unos 700 m de la estación 'Ercolano Scavi'.",
                attractionsInfo: "Además de las excavaciones, puede visitar el MAV - Museo Arqueológico Virtual a poca distancia de la estación.",
                visitInfo: "Herculano generalmente está menos concurrido que Pompeya y se puede visitar en unas 2-3 horas.",
                travelTip1: "Desde la estación hasta la zona arqueológica hay una ligera bajada de unos 10 minutos a pie.",
                travelTip2: "Considere un billete combinado Pompeya+Herculano si planea visitar ambos sitios.",
                travelTip3: "Los trenes de primera hora de la mañana son los menos concurridos, ideales para comenzar la visita temprano."
            },
            sorrentoPompei: {
                specificInfo: "La conexión Sorrento-Pompeya es ideal para aquellos que se alojan en la Costa y quieren visitar las excavaciones.",
                attractionsInfo: "Desde Pompeya puede continuar fácilmente hacia Nápoles o Herculano el mismo día.",
                visitDuration: "Considere al menos 4 horas para la visita de las excavaciones más el tiempo de viaje.",
                travelTip1: "Salga temprano de Sorrento para evitar la multitud y el calor estival en Pompeya.",
                travelTip2: "Compruebe los horarios de los trenes de regreso, especialmente para las últimas conexiones del día.",
                travelTip3: "Durante la temporada alta, considere el Campania Express para un viaje más cómodo."
            }
        },

        // ========================================
        // TRAVEL TIME CALCULATOR
        // ========================================
        travelTimePage: {
            metaTitle: "Cálculo de Tiempos de Viaje - Circumvesuviana y EAV",
            metaDescription: "Calcula el tiempo exacto de viaje entre todas las estaciones de la red Circumvesuviana y EAV. Compara trenes regionales y expresos.",
            pageTitle: "⏱️ Calculadora de Tiempos de Viaje",
            intro: "Calcula y compara los tiempos de viaje entre las estaciones de la red Circumvesuviana y EAV. Útil para planificar tus desplazamientos en Campania.",
            travelTimeCalculator: "Calculadora de Tiempos de Viaje",
            selectStations: "Seleccionar estaciones",
            calculateTime: "Calcular tiempo",
            calculatingTime: "Calculando...",
            travelTimeResults: "Resultados de tiempo de viaje",
            standardTrain: "Tren Regional",
            expressTrain: "Tren Expreso",
            timeSaving: "Ahorro de tiempo",
            timeDifference: "Diferencia de tiempo",
            regularTrainTime: "Tiempo de tren regional",
            expressTrainTime: "Tiempo de tren expreso",
            averageWaitingTime: "Tiempo medio de espera",
            peakHoursDuration: "Duración en horas de punta",
            offPeakDuration: "Duración en horas valle",
            noExpressService: "No hay servicio expreso disponible en esta ruta",
            transfersRequired: "Transbordos necesarios",
            popularConnections: "Conexiones populares",
            travelTips: "Consejos de viaje",
            tip1: "Los tiempos de viaje pueden variar según la hora y el día de la semana.",
            tip2: "Los trenes Campania Express hacen menos paradas y son más rápidos, pero tienen un suplemento de precio.",
            tip3: "Durante las horas punta, considere añadir 5-10 minutos al tiempo estimado de viaje.",
            tip4: "Considere el Campania Express para destinos turísticos",
            popularRoutes: "Rutas populares",
            napoliSorrento: "Nápoles - Sorrento",
            napoliPompei: "Nápoles - Pompeya",
            napoliErcolano: "Nápoles - Herculano",
            sorrentoPompei: "Sorrento - Pompeya",
            effects: {
                title: "Factores que influyen en los tiempos de viaje",
                trainType: "Tipo de tren (regional/expreso)",
                timeOfDay: "Hora del día (punta/valle)",
                dayOfWeek: "Día de la semana (laborable/festivo)",
                season: "Estacionalidad (temporada alta/baja)",
                weatherConditions: "Condiciones meteorológicas"
            },
            howToReadTimes: "Cómo leer los tiempos",
            regularTime: "Tiempo regular",
            regularTimeDescription: "Trenes normales con todas las paradas",
            expressTime: "Tiempo expreso",
            expressTimeDescription: "Trenes turísticos o con paradas limitadas",
            variations: "Variaciones",
            variationsDescription: "Los tiempos pueden variar por tráfico y horarios",
            stops: "Paradas",
            stations: "estaciones",
            note: "Nota",
            detailedGuide: "Guía detallada para esta ruta",
            optimalPlanning: "Planificación Óptima",
            forTourists: "Para Turistas",
            touristTip1: "Pompeya Scavi: planifique al menos 3 horas para la visita",
            touristTip2: "Sorrento: considérelo como base para la Costa Amalfitana",
            touristTip3: "Herculano: visita más breve, ideal para medio día",
            touristTip4: "Compre los billetes con antelación durante el verano",
            checkRealTimeSchedules: "Verificar Horarios en Tiempo Real",
            peakHoursDescription: "En horas punta los trenes pueden ser más lentos debido al mayor tráfico",
            expressTrainsDescription: "Los trenes expresos saltan algunas paradas, reduciendo significativamente los tiempos",
            weatherDelaysDescription: "Retrasos, obras en curso o condiciones meteorológicas pueden influir en los tiempos",
            faq: {
                title: "Preguntas frecuentes sobre tiempos de viaje",
                q1: "¿Cuánto se tarda de Nápoles a Sorrento?",
                a1: "El tiempo medio de viaje desde Nápoles Porta Nolana hasta Sorrento es de aproximadamente 65-70 minutos con el tren regional y 45-50 minutos con el Campania Express.",
                q2: "¿Cuál es el tren más rápido para Pompeya desde Nápoles?",
                a2: "El Campania Express es la conexión más rápida, con un tiempo de viaje de aproximadamente 25 minutos desde Nápoles hasta Pompeya Scavi.",
                q3: "¿Cuánto dura el viaje de Nápoles a Ercolano Scavi?",
                a3: "El viaje de Nápoles a Ercolano Scavi dura aproximadamente 20-25 minutos con la Circumvesuviana, y es uno de los destinos más rápidos de alcanzar.",
                q4: "¿Hay diferencia de tiempo entre días laborables e festivos?",
                a4: "Sí, en los días festivos puede haber menos servicios y mayores tiempos de espera, con un posible aumento del tiempo total de viaje."
            }
        },

        // ========================================
        // HOMEPAGE CONTENT
        // ========================================
        pageTitle: 'Horarios de Trenes de Nápoles y Circumvesuviana',
        faqSectionTitle: 'Preguntas frecuentes sobre trenes en Nápoles y provincia',
        pricingDisclaimer: {
            title: 'ℹ️ Información sobre Precios',
            content: 'Para información actualizada sobre los precios de los billetes EAV y Circumvesuviana, consulte los puntos de venta oficiales de EAV o el sitio web oficial. VesuviaSearch proporciona exclusivamente información sobre los horarios de los trenes.'
        },
        tourismCTA: {
            title: 'Planea tu viaje a Nápoles y provincia',
            description: 'Llega fácilmente a Sorrento, Pompeya, Herculano y todos los destinos turísticos de Campania con los horarios actualizados de Circumvesuviana',
            buttonText: '🗺️ Explorar Destinos Turísticos'
        },
        homeFAQs: {
            trainSchedules: {
                question: '¿Cuáles son los horarios de los trenes de Nápoles a Sorrento?',
                answer: 'Los trenes Circumvesuviana de Nápoles a Sorrento parten aproximadamente cada 30 minutos desde las 6:00 hasta las 21:40. El viaje dura aproximadamente 1 hora y 15 minutos. El primer tren sale alrededor de las 6:15 de Nápoles Porta Nolana, el último alrededor de las 21:40.'
            },
            ticketPrices: {
                question: '¿Cuánto cuesta el billete de Nápoles a Pompeya?',
                answer: 'El billete estándar de Nápoles a Pompeya Scavi cuesta <strong>€2,80</strong>. Para el Campania Express (servicio turístico premium), el costo es de aproximadamente €8. Los billetes se pueden adquirir en las máquinas expendedoras automáticas o en las taquillas.'
            },
            stations: {
                question: '¿Dónde se toma el Circumvesuviana en Nápoles?',
                answer: 'Las estaciones principales son <strong>Nápoles Porta Nolana</strong> (terminal) y <strong>Nápoles Piazza Garibaldi</strong> (conectada a la estación central FS). Ambas sirven a todos los destinos de la provincia.'
            },
            pompeiDirections: {
                question: '¿Cómo llegar a las excavaciones de Pompeya desde Nápoles?',
                answer: 'Toma el Circumvesuviana desde Nápoles Porta Nolana hacia Sorrento/Poggiomarino y baja en <strong>Pompeya Scavi - Villa dei Misteri</strong> después de 35 minutos. La entrada a las excavaciones está a 100 metros de la estación.'
            }
        },

        // Footer
        footerDisclaimer: 'Este proyecto no tiene ninguna afiliación con EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Este es un proyecto educativo de código abierto creado solo con fines de aprendizaje.',
        footerMadeWith: 'Hecho con',
        footerBy: 'por',
        footerEducationalCopyright: 'Proyecto Educativo',

        // ========================================
        // PWA INSTALLATION
        // ========================================
        installApp: 'Instalar',
        installing: 'Instalando...',
        appInstalled: 'Aplicación instalada con éxito',
        offlineMode: 'Modo sin conexión',
        updateAvailable: 'Actualización disponible',
        updateApp: 'Actualizar Aplicación',
        iosInstallTitle: 'Instalar en iOS',
        iosInstallInstructions: 'Para instalar esta aplicación en tu dispositivo iOS:\n\n1. Toca el botón Compartir (cuadrado con flecha)\n2. Desplázate hacia abajo y toca "Añadir a la pantalla de inicio"\n3. Toca "Añadir" en la esquina superior derecha',
        addToHomeScreen: 'Añadir a la pantalla de inicio',

        // ========================================
        // ACCESSIBILITY PAGE
        // ========================================
        accessibilityPage: {
            name: "Información sobre Accesibilidad",
            description:
                "Información completa sobre la accesibilidad de VesuviaSearch y las estaciones de Circumvesuviana",
            faq1: {
                question: "¿Todas las funciones del sitio son accesibles?",
                answer: "Sí, VesuviaSearch está diseñado para ser completamente accesible según los estándares WCAG 2.1 Nivel AA. Todas las funcionalidades, incluyendo la búsqueda de trenes, horarios y páginas informativas, son accesibles para usuarios con discapacidades y compatibles con tecnologías de asistencia."
            },
            faq2: {
                question: "¿Qué características de accesibilidad están disponibles en las estaciones de Circumvesuviana?",
                answer: "La accesibilidad varía según la estación. Las estaciones principales como Nápoles Porta Nolana, Nápoles Garibaldi y Sorrento cuentan con acceso para sillas de ruedas, caminos táctiles e instalaciones accesibles. Para información específica sobre estaciones, consulte el sitio web oficial de EAV o contacte con su servicio de accesibilidad."
            },
            hero: {
                title: "♿ Accesibilidad de VesuviaSearch",
                description:
                    "VesuviaSearch está diseñado para ser accesible a todos los usuarios, incluidas las personas con discapacidades. Aquí encontrará información completa sobre nuestros estándares de accesibilidad y las estaciones accesibles de Circumvesuviana.",
            },
            webAccessibility: {
                title: "🌐 Accesibilidad del Sitio Web",
                standards: {
                    title: "Estándares Seguidos",
                    wcag: "WCAG 2.1 Level AA - Conformidad con las directrices internacionales",
                    section508: "Section 508 - Estándares federales de accesibilidad de EE.UU.",
                    en301: "EN 301 549 - Estándar europeo para accesibilidad TIC",
                    leggeStanca: "Legge Stanca - Normativa italiana sobre accesibilidad",
                },
                features: {
                    title: "Características Accesibles",
                    keyboardNavigation: "Navegación por teclado - Todos los elementos son navegables con Tab",
                    screenReader: "Compatible con lectores de pantalla - Funciona con JAWS, NVDA, VoiceOver",
                    highContrast: "Alto contraste - Textos bien legibles en todos los fondos",
                    focusVisible: "Foco visible - Indicadores claros para navegación por teclado",
                    altText: "Textos alternativos - Todas las imágenes tienen descripciones",
                    descriptiveLabels: "Etiquetas descriptivas - Formularios y controles bien etiquetados",
                },
                shortcuts: {
                    title: "Atajos de Teclado",
                    tab: "Navegar entre elementos",
                    enterSpace: "Activar botones y enlaces",
                    esc: "Cerrar modales y menús",
                    arrows: "Navegar en listas y menús",
                },
            },
            legal: {
                title: "📋 Conformidad Legal",
                accessibilityDeclaration: "Declaración de Accesibilidad:",
                description:
                    "VesuviaSearch se compromete a garantizar la accesibilidad digital para personas con discapacidades de acuerdo con",
                leggeStancaLink: "Legge Stanca",
                and: " y ",
                wcagLink: "WCAG 2.1",
                lastUpdate: "Última actualización:",
                nextReview: "Próxima revisión:",
            },
        },

        tab: "Navegar entre elementos",
        enterSpace: "Ativar botões e ligações",
        esc: "Fechar modais e menus",
        arrows: "Navegar em listas e menus",

        legal: {
            title: "📋 Conformidade Legal",
            accessibilityDeclaration: "Declaração de Acessibilidade:",
            description:
                "O VesuviaSearch compromete-se a garantir a acessibilidade digital para pessoas com deficiência em conformidade com a",
            leggeStancaLink: "Legge Stanca",
            and: " e as ",
            wcagLink: "WCAG 2.1",
            lastUpdate: "Última atualização:",
            nextReview: "Próxima revisão:",
        },
        faq1: {
            question: "Todas as funcionalidades do site são acessíveis?",
            answer: "Sim, o VesuviaSearch foi concebido para ser totalmente acessível de acordo com as normas WCAG 2.1 Nível AA. Todas as funcionalidades, incluindo pesquisa de comboios, horários e páginas informativas, são acessíveis a utilizadores com deficiência e compatíveis com tecnologias de assistência."
        },
        faq2: {
            question: "¿Qué características de accesibilidad están disponibles en las estaciones de Circumvesuviana?",
            answer: "La accesibilidad varía según la estación. Las estaciones principales como Nápoles Porta Nolana, Nápoles Garibaldi y Sorrento cuentan con acceso para sillas de ruedas, caminos táctiles e instalaciones accesibles. Para información específica sobre estaciones, consulte el sitio web oficial de EAV o contacte con su servicio de accesibilidad."
        },
    },


    pt: {
        // Header/Navigation
        findTrains: 'Encontrar Comboios',
        searchSchedules: 'Pesquise horários de comboio e reserve a sua viagem',

        // Form labels
        from: 'De',
        to: 'Para',
        departureTime: 'Hora de Partida',
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
        searchingTrains: 'A pesquisar comboios...',

        // Error messages
        departureRequired: 'A estação de partida é obrigatória',
        arrivalRequired: 'A estação de chegada é obrigatória',
        stationsDifferent: 'A estação de chegada deve ser diferente da de partida',
        timeRequired: 'A hora de partida é obrigatória',

        // ========================================
        // HOMEPAGE CONTENT
        // ========================================
        pageTitle: 'Horários de Comboios de Nápoles e Circumvesuviana',
        faqSectionTitle: 'Perguntas frequentes sobre comboios em Nápoles e província',
        pricingDisclaimer: {
            title: 'ℹ️ Informações sobre Preços',
            content: 'Para informações atualizadas sobre os preços dos bilhetes EAV e Circumvesuviana, consulte os pontos de venda oficiais da EAV ou o site oficial. VesuviaSearch fornece exclusivamente informações sobre os horários dos comboios.'
        },
        tourismCTA: {
            title: 'Planeje sua viagem para Nápoles e província',
            description: 'Chegue facilmente a Sorrento, Pompeia, Herculano e todos os destinos turísticos da Campânia com os horários atualizados da Circumvesuviana',
            buttonText: '🗺️ Explore Destinos Turísticos'
        },
        homeFAQs: {
            trainSchedules: {
                question: 'Quais são os horários dos comboios de Nápoles para Sorrento?',
                answer: 'Os comboios da Circumvesuviana de Nápoles para Sorrento partem aproximadamente a cada 30 minutos das 6h00 às 21h40. A viagem dura cerca de 1 hora e 15 minutos. O primeiro comboio parte por volta das 6h15 de Nápoles Porta Nolana, o último por volta das 21h40.'
            },
            ticketPrices: {
                question: 'Quanto custa o bilhete de Nápoles para Pompeia?',
                answer: 'O bilhete padrão de Nápoles para Pompeia Scavi custa <strong>€2,80</strong>. Para o Campania Express (serviço turístico premium), o custo é de aproximadamente €8. Os bilhetes podem ser adquiridos nas máquinas de venda automática ou nos guichês.'
            },
            stations: {
                question: 'Onde se pega o Circumvesuviana em Nápoles?',
                answer: 'As principais estações são <strong>Nápoles Porta Nolana</strong> (terminal) e <strong>Nápoles Piazza Garibaldi</strong> (conectada à estação central FS). Ambas servem todos os destinos da província.'
            },
            pompeiDirections: {
                question: 'Como chegar às escavações de Pompeia a partir de Nápoles?',
                answer: 'Pegue o Circumvesuviana de Nápoles Porta Nolana em direção a Sorrento/Poggiomarino e desça em <strong>Pompeia Scavi - Villa dei Misteri</strong> após 35 minutos. A entrada para as escavações fica a 100 metros da estação.'
            }
        },

        // Footer
        footerDisclaimer: 'Este projeto não tem qualquer afiliação com EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Este é um projeto educativo de código aberto criado apenas para fins de aprendizagem.',
        footerMadeWith: 'Feito com',
        footerBy: 'por',
        footerEducationalCopyright: 'Projeto Educativo',
        // ========================================
        // PWA INSTALLATION
        // ========================================
        installApp: 'Instalar',
        installing: 'Instalando...',
        appInstalled: 'Aplicação instalada com sucesso',
        offlineMode: 'Modo offline',
        updateAvailable: 'Atualização disponível',
        updateApp: 'Atualizar Aplicação',
        iosInstallTitle: 'Instalar no iOS',
        iosInstallInstructions: 'Para instalar esta aplicação no seu dispositivo iOS:\n\n1. Toque no botão Partilhar (quadrado com seta)\n2. Deslize para baixo e toque em "Adicionar ao Ecrã Principal"\n3. Toque em "Adicionar" no canto superior direito',
        addToHomeScreen: 'Adicionar ao Ecrã Principal',

        // ========================================
        // ACCESSIBILITY PAGE
        // ========================================
        accessibilityPage: {
            name: "Informações de Acessibilidade",
            description:
                "Informações completas sobre acessibilidade do VesuviaSearch e estações da Circumvesuviana",
            hero: {
                title: "♿ Acessibilidade VesuviaSearch",
                description:
                    "O VesuviaSearch foi concebido para ser acessível a todos os utilizadores, incluindo pessoas com deficiência. Aqui estão as informações completas sobre os nossos padrões de acessibilidade e estações acessíveis da Circumvesuviana.",
            },
            webAccessibility: {
                title: "🌐 Acessibilidade do Website",
                standards: {
                    title: "Padrões Seguidos",
                    wcag: "WCAG 2.1 Level AA - Conformidade com diretrizes internacionais",
                    section508: "Section 508 - Padrões federais de acessibilidade dos EUA",
                    en301: "EN 301 549 - Padrão europeu para acessibilidade TIC",
                    leggeStanca: "Legge Stanca - Regulamentação italiana sobre acessibilidade",
                },
                features: {
                    title: "Funcionalidades Acessíveis",
                    keyboardNavigation: "Navegação por teclado - Todos os elementos são navegáveis com Tab",
                    screenReader: "Compatível com leitor de ecrã - Funciona com JAWS, NVDA, VoiceOver",
                    highContrast: "Alto contraste - Textos bem legíveis em todos os fundos",
                    focusVisible: "Foco visível - Indicadores claros para navegação por teclado",
                    altText: "Textos alternativos - Todas as imagens têm descrições",
                    descriptiveLabels: "Etiquetas descritivas - Formulários e controlos bem etiquetados",
                },
                shortcuts: {
                    title: "Atalhos de Teclado",
                    tab: "Navegar entre elementos",
                    enterSpace: "Ativar botões e ligações",
                    esc: "Fechar modais e menus",
                    arrows: "Navegar em listas e menus",
                },
            },
            legal: {
                title: "📋 Conformidade Legal",
                accessibilityDeclaration: "Declaração de Acessibilidade:",
                description:
                    "O VesuviaSearch compromete-se a garantir a acessibilidade digital para pessoas com deficiência em conformidade com a",
                leggeStancaLink: "Legge Stanca",
                and: " e as ",
                wcagLink: "WCAG 2.1",
                lastUpdate: "Última atualização:",
                nextReview: "Próxima revisão:",
            },
            faq1: {
                question: "Todas as funcionalidades do site são acessíveis?",
                answer: "Sim, o VesuviaSearch foi concebido para ser totalmente acessível de acordo com as normas WCAG 2.1 Nível AA. Todas as funcionalidades, incluindo pesquisa de comboios, horários e páginas informativas, são acessíveis a utilizadores com deficiência e compatíveis com tecnologias de assistência."
            },
            faq2: {
                question: "Que características de acessibilidade estão disponíveis nas estações da Circumvesuviana?",
                answer: "A acessibilidade varia de estação para estação. As principais estações como Napoli Porta Nolana, Napoli Garibaldi e Sorrento têm acesso para cadeiras de rodas, percursos táteis e instalações acessíveis. Para informações específicas sobre estações, consulte o site oficial da EAV ou contacte o seu serviço de acessibilidade."
            },
        },
    },

    fr: {
        // Header/Navigation
        findTrains: 'Trouver des Trains',
        searchSchedules: 'Rechercher les horaires des trains et réserver votre voyage',

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
        searchTrains: 'Rechercher Trains',
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
        selectDate: 'Sélectionner date',

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchingTrainsInProgress: 'Recherche de trains en cours...',
        noTrainsFound: 'Aucun train trouvé',
        noTrainsFoundDescription: 'Essayez de modifier vos critères de recherche ou vérifiez que les gares sont correctes.',
        searchResults: 'Résultats de recherche',
        train: 'train',
        trains: 'trains',
        departure: 'Départ',
        arrival: 'Arrivée',
        duration: 'Durée',
        direction: 'Direction',
        intermediateStops: 'arrêts intermédiaires',
        showAllStops: 'Afficher tous les arrêts',
        apiError: 'Service temporairement indisponible',
        apiErrorDescription: 'Veuillez réessayer dans quelques instants. Si le problème persiste, contactez le support.',
        networkError: 'Erreur de connexion',
        networkErrorDescription: 'Vérifiez votre connexion internet et réessayez.',
        invalidStationError: 'Gare invalide',
        invalidStationErrorDescription: 'Veuillez sélectionner une gare valide dans la liste.',
        searchError: 'Erreur de recherche',
        searchErrorDescription: 'Une erreur s\'est produite pendant la recherche. Veuillez réessayer.',

        // ========================================
        // TRAIN RESULTS AND STATUS
        // ========================================
        delayed: 'En retard',
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
        showDetails: 'Afficher détails',
        hideDetails: 'Masquer détails',
        journeyDetails: 'Détails du voyage',

        // Page content
        findTrainsTitle: 'Trouvez vos trains Circumvesuviana',
        findTrainsSubtitle: 'Recherche simple et rapide pour le réseau EAV en Campanie',
        loading: 'Chargement...',
        swapStations: 'Échanger les gares',
        filters: 'Filtres',
        campaniaExpressOnly: 'Seulement Campania Express',
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
        selectDepartureStation: 'Sélectionner gare de départ',
        departureTimeLabel: 'Heure de Départ',
        filtersLabel: 'Filtres',

        // Button labels for departure searches
        searchingNextDepartures: 'Recherche prochains départs...',
        searchNextDepartures: 'Rechercher Prochains Départs',

        // Departures results
        nextDeparturesFrom: 'Prochains départs de',
        nextArrivalsTo: 'Prochaines arrivées à',
        searchingArrivals: 'Recherche arrivées...',
        noDeparturesFound: 'Aucun départ trouvé',
        noArrivalsFound: 'Aucune arrivée trouvée',
        noDeparturesFromStation: 'Aucun départ trouvé de',
        noArrivalsToStation: 'Aucune arrivée trouvée pour',
        departuresFromStation: 'Départs de la gare',
        arrivalsToStation: 'Arrivées à la gare',
        departuresFound: 'départs trouvés',
        arrivalsFound: 'arrivées trouvées',
        platform: 'Quai',

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

        // ========================================
        // DYNAMIC ROUTE PAGES
        // ========================================
        routePages: {
            common: {
                metaTitle: "Train de {{from}} à {{to}} - Horaires, Durée et Guide Complet",
                metaDescription: "Découvrez horaires, durée et informations complètes sur le train de {{from}} à {{to}}. Guide détaillé avec conseils de voyage et options de transport.",
                pageTitle: "🚆 De {{from}} à {{to}} en Train",
                intro: "Informations complètes sur la liaison ferroviaire entre {{from}} et {{to}}, horaires mis à jour et conseils de voyage.",
                trainSchedules: "Horaires des Trains",
                travelTime: "Temps de Voyage",
                travelOptions: "Options de Voyage",
                fares: "Tarifs",
                travelTips: "Conseils de Voyage",
                howToReach: "Comment Atteindre",
                fromStation: "De la gare de {{station}}",
                toDestination: "À {{destination}}",
                directConnection: "Liaison directe",
                connectionWithTransfer: "Liaison avec correspondance",
                regularTrains: "Trains Régionaux",
                expressTrains: "Trains Campania Express",
                mostPopularTimes: "Horaires les plus populaires",
                lastTrains: "Derniers trains",
                earlyMorning: "Tôt le matin",
                ticketPurchaseOptions: "Où Acheter les Billets",
                onboardFacilities: "Services à Bord",
                accessibility: "Accessibilité",
                schedulesSubject: "Les horaires sont sujets à modification. Vérifiez toujours avant de voyager."
            },
            napoliSorrento: {
                specificInfo: "La ligne Naples-Sorrente est la plus fréquentée du réseau Circumvesuviana, avec des trains toutes les 30 minutes pendant la haute saison.",
                attractionsOnRoute: "Attractions le long du parcours : Pompéi, Herculanum, Torre Annunziata, Castellammare di Stabia, Vico Equense.",
                peakTimeWarning: "Pendant la haute saison estivale, les trains peuvent être très bondés, surtout aux heures de pointe.",
                travelTip1: "Considérez le Campania Express pour un voyage plus rapide et confortable pendant la haute saison.",
                travelTip2: "Les billets peuvent être achetés dans les gares ou via l'application officielle EAV.",
                travelTip3: "Apportez toujours une pièce d'identité valide pour les contrôles à bord."
            },
            napoliPompei: {
                specificInfo: "La liaison Naples-Pompéi est très fréquentée par les touristes se dirigeant vers les fouilles archéologiques.",
                attractionsInfo: "L'arrêt le plus proche des Fouilles Archéologiques est 'Pompei Scavi - Villa dei Misteri'.",
                archaeologicalParkInfo: "Les Fouilles Archéologiques sont ouvertes tous les jours de 9h00 à 19h00 (dernière entrée à 17h30).",
                travelTip1: "Descendez à la gare 'Pompei Scavi - Villa dei Misteri', à seulement 100m de l'entrée principale des fouilles.",
                travelTip2: "Pendant la haute saison, considérez le Campania Express qui fait moins d'arrêts et a des places garanties.",
                travelTip3: "Apportez de l'eau et une protection solaire, car la zone archéologique offre peu d'ombre."
            },
            napoliErcolano: {
                specificInfo: "Le site archéologique d'Herculanum se trouve à environ 700m de la gare 'Ercolano Scavi'.",
                attractionsInfo: "En plus des fouilles, vous pouvez visiter le MAV - Musée Archéologique Virtuel à courte distance de la gare.",
                visitInfo: "Herculanum est généralement moins bondé que Pompeji et peut être visité en environ 2-3 heures.",
                travelTip1: "De la gare à la zone archéologique, il y a une légère descente d'environ 10 minutes à pied.",
                travelTip2: "Considérez un billet combiné Pompéi+Herculanum si vous prévoyez de visiter les deux sites.",
                travelTip3: "Les premiers trains du matin sont les moins bondés, idéaux pour commencer la visite tôt."
            },
            sorrentoPompei: {
                specificInfo: "La liaison Sorrente-Pompeji est idéale pour ceux qui séjournent sur la Côte et veulent visiter les fouilles.",
                attractionsInfo: "De Pompéi, vous pouvez facilement continuer vers Naples ou Herculanum le même jour.",
                visitDuration: "Comptez au moins 4 heures pour la visite des fouilles plus le temps de voyage.",
                travelTip1: "Partez tôt de Sorrente pour éviter la foule et la chaleur estivale à Pompéi.",
                travelTip2: "Vérifiez les horaires des trains de retour, surtout pour les dernières liaisons de la journée.",
                travelTip3: "Pendant la haute saison, considérez le Campania Express pour un voyage plus confortable."
            }
        },

        // ========================================
        // TRAVEL TIME CALCULATOR
        // ========================================
        travelTimePage: {
            metaTitle: "Calcul des Temps de Voyage - Circumvesuviana et EAV",
            metaDescription: "Calculez le temps exact de voyage entre toutes les gares du réseau Circumvesuviana et EAV. Comparez trains régionaux et express.",
            pageTitle: "⏱️ Calculateur de Temps de Voyage",
            intro: "Calculez et comparez les temps de voyage entre les gares du réseau Circumvesuviana et EAV. Utile pour planifier vos déplacements en Campanie.",
            travelTimeCalculator: "Calculateur de Temps de Voyage",
            selectStations: "Sélectionner gares",
            calculateTime: "Calculer temps",
            calculatingTime: "Calcul en cours...",
            travelTimeResults: "Résultats temps de voyage",
            standardTrain: "Train Régional",
            expressTrain: "Train Express",
            timeSaving: "Gain de temps",
            timeDifference: "Différence de temps",
            regularTrainTime: "Temps train régional",
            expressTrainTime: "Temps train express",
            averageWaitingTime: "Temps d'attente moyen",
            peakHoursDuration: "Durée heures de pointe",
            offPeakDuration: "Durée heures creuses",
            noExpressService: "Aucun service express disponible sur cette ligne",
            transfersRequired: "Correspondances nécessaires",
            popularConnections: "Liaisons populaires",
            travelTips: "Conseils de voyage",
            tip1: "Les temps de voyage peuvent varier selon l'heure et le jour de la semaine.",
            tip2: "Les trains Campania Express font moins d'arrêts et sont plus rapides, mais ont un supplément de prix.",
            tip3: "Pendant les heures de pointe, considérez ajouter 5-10 minutes au temps estimé de voyage.",
            tip4: "Envisagez le Campania Express pour les destinations touristiques",
            popularRoutes: "Lignes populaires",
            napoliSorrento: "Naples - Sorrente",
            napoliPompei: "Naples - Pompeji",
            napoliErcolano: "Naples - Herculanum",
            sorrentoPompei: "Sorrente - Pompeji",
            effects: {
                title: "Facteurs affectant les temps de voyage",
                trainType: "Type de train (régional/express)",
                timeOfDay: "Heure de la journée (pointe/creuse)",
                dayOfWeek: "Jour de la semaine (ouvrable/férié)",
                season: "Saisonnalité (haute/basse saison)",
                weatherConditions: "Conditions météorologiques"
            },
            howToReadTimes: "Comment lire les temps",
            regularTime: "Temps régulier",
            regularTimeDescription: "Normale Züge mit allen Haltestellen",
            expressTime: "Temps express",
            expressTimeDescription: "Touristenzüge oder mit begrenzten Haltestellen",
            variations: "Variationen",
            variationsDescription: "Die Zeiten können aufgrund von Verkehr und Fahrplänen variieren",
            stops: "Haltestellen",
            stations: "Bahnhöfe",
            note: "Hinweis",
            detailedGuide: "Detaillierter Leitfaden für diese Strecke",
            optimalPlanning: "Optimale Planung",
            forTourists: "Für Touristen",
            touristTip1: "Pompeji Scavi: Planen Sie mindestens 3 Stunden für den Besuch ein",
            touristTip2: "Sorrent: Betrachten Sie es als Basis für die Amalfiküste",
            touristTip3: "Herculaneum: Kürzerer Besuch, ideal für einen halben Tag",
            touristTip4: "Kaufen Sie Tickets im Sommer im Voraus",
            checkRealTimeSchedules: "Echtzeit-Fahrpläne prüfen",
            peakHoursDescription: "Zu Stoßzeiten können Züge aufgrund erhöhten Verkehrs langsamer sein",
            expressTrainsDescription: "Expresszüge überspringen einige Haltestellen und reduzieren die Reisezeit erheblich",
            weatherDelaysDescription: "Verspätungen, laufende Arbeiten oder Wetterbedingungen können die Zeiten beeinflussen",
            faq: {
                title: "Häufig gestellte Fragen zu Reisezeiten",
                q1: "Wie lange dauert es von Neapel nach Sorrento?",
                a1: "Die durchschnittliche Reisezeit von Napoli Porta Nolana nach Sorrente ist von etwa 65-70 Minuten mit dem Regionalzug und 45-50 Minuten mit dem Campania Express.",
                q2: "Welcher ist der schnellste Zug nach Pompeji von Neapel?",
                a2: "Der Campania Express ist die schnellste Verbindung mit einer Reisezeit von etwa 25 Minuten von Neapel nach Pompei Scavi.",
                q3: "Wie lange dauert die Fahrt von Neapel nach Ercolano Scavi?",
                a3: "Die Fahrt von Neapel nach Ercolano Scavi dauert etwa 20-25 Minuten mit der Circumvesuviana und ist eines der am schnellsten zu erreichenden Ziele.",
                q4: "Gibt es einen Zeitunterschied zwischen Werktagen und Feiertagen?",
                a4: "Ja, an Feiertagen kann es weniger Fahrten und längere Wartezeiten geben, was möglicherweise die Gesamtreisezeit verlängert."
            }
        },

        // ========================================
        // HOMEPAGE CONTENT
        // ========================================
        pageTitle: 'Horaires des Trains de Naples et Circumvesuviana',
        faqSectionTitle: 'Questions fréquentes sur les trains à Naples et dans sa province',
        pricingDisclaimer: {
            title: 'ℹ️ Informations sur les Prix',
            content: 'Pour des informations à jour sur les prix des billets EAV et Circumvesuviana, veuillez consulter les points de vente officiels EAV ou le site web officiel. VesuviaSearch fournit exclusivement des informations sur les horaires des trains.'
        },
        tourismCTA: {
            title: 'Planifiez votre voyage à Naples et sa province',
            description: 'Rejoignez facilement Sorrente, Pompéi, Herculanum et toutes les destinations touristiques de Campanie avec les horaires actualisés de la Circumvesuviana',
            buttonText: '🗺️ Explorer les Destinations Touristiques'
        },
        homeFAQs: {
            trainSchedules: {
                question: 'Quels sont les horaires des trains de Naples à Sorrente?',
                answer: 'Les trains de la Circumvesuviana de Naples à Sorrente partent environ toutes les 30 minutes de 6h00 à 21h40. Le voyage dure environ 1 heure et 15 minutes. Le premier train part vers 6h15 de Naples Porta Nolana, le dernier vers 21h40.'
            },
            ticketPrices: {
                question: 'Combien coûte le billet de Naples à Pompéi?',
                answer: 'Le billet standard de Naples à Pompei Scavi coûte <strong>€2,80</strong>. Pour le Campania Express (service touristique premium), le coût est d\'environ €8. Les billets peuvent être achetés aux distributeurs automatiques ou aux guichets.'
            },
            stations: {
                question: 'Où prendre la Circumvesuviana à Naples?',
                answer: 'Les principales stations sont <strong>Naples Porta Nolana</strong> (terminus) et <strong>Naples Piazza Garibaldi</strong> (reliée à la gare centrale FS). Les deux desservent toutes les destinations de la province.'
            },
            pompeiDirections: {
                question: 'Comment se rendre aux fouilles de Pompéi depuis Naples?',
                answer: 'Prenez la Circumvesuviana depuis Naples Porta Nolana vers Sorrente/Poggiomarino et descendez à <strong>Pompei Scavi - Villa dei Misteri</strong> après 35 minutes. L\'entrée des fouilles est à 100 mètres de la station.'
            }
        },

        // Footer
        footerDisclaimer: 'Ce projet n\'a aucune affiliation avec EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Il s\'agit d\'un projet éducatif open source créé à des fins d\'apprentissage uniquement.',
        footerMadeWith: 'Fait avec',
        footerBy: 'par',
        footerEducationalCopyright: 'Projet Éducatif',

        // ========================================
        // PWA INSTALLATION
        // ========================================
        installApp: 'Installer',
        installing: 'Installation...',
        appInstalled: 'Application installée avec succès',
        offlineMode: 'Mode hors ligne',
        updateAvailable: 'Mise à jour disponible',
        updateApp: 'Mettre à jour l\'application',
        iosInstallTitle: 'Installer sur iOS',
        iosInstallInstructions: 'Pour installer cette application sur votre appareil iOS :\n\n1. Appuyez sur le bouton Partager (carré avec flèche)\n2. Faites défiler vers le bas et appuyez sur "Ajouter à l\'écran d\'accueil"\n3. Appuyez sur "Ajouter" dans le coin supérieur droit',
        addToHomeScreen: 'Ajouter à l\'écran d\'accueil',

        // ========================================
        // ACCESSIBILITY PAGE
        // ========================================
        accessibilityPage: {
            name: "Informations sur l'Accessibilité",
            description:
                "Informations complètes sur l'accessibilité de VesuviaSearch et des stations Circumvesuviana",
            faq1: {
                question: "Toutes les fonctionnalités du site sont-elles accessibles ?",
                answer: "Oui, VesuviaSearch est conçu pour être entièrement accessible selon les normes WCAG 2.1 Niveau AA. Toutes les fonctionnalités, y compris la recherche de trains, les horaires et les pages d'information, sont accessibles aux utilisateurs handicapés et compatibles avec les technologies d'assistance.",
            },
            faq2: {
                question: "Quelles fonctionnalités d'accessibilité sont disponibles dans les stations Circumvesuviana ?",
                answer: "L'accessibilité varie selon la station. Les principales gares comme Napoli Porta Nolana, Napoli Garibaldi et Sorrento disposent d'un accès pour fauteuils roulants, de chemins tactiles et d'installations accessibles. Pour des informations spécifiques sur les stations, consultez le site officiel d'EAV ou contactez leur service d'accessibilité.",
            },
            hero: {
                title: "♿ Accessibilité VesuviaSearch",
                description:
                    "VesuviaSearch est conçu pour être accessible à tous les utilisateurs, y compris les personnes handicapées. Voici des informations complètes sur nos normes d'accessibilité et les stations Circumvesuviana accessibles.",
            },
            webAccessibility: {
                title: "🌐 Accessibilité du Site Web",
                standards: {
                    title: "Standards Suivis",
                    wcag: "WCAG 2.1 Level AA - Conformité avec les directives internationales",
                    section508: "Section 508 - Standards d'accessibilité fédéraux américains",
                    en301: "EN 301 549 - Standard européen pour l'accessibilité des TIC",
                    leggeStanca: "Legge Stanca - Réglementation italienne sur l'accessibilité",
                },
                features: {
                    title: "Fonctionnalités Accessibles",
                    keyboardNavigation: "Navigation au clavier - Tous les éléments sont navigables avec Tab",
                    screenReader: "Compatible avec les lecteurs d'écran - Fonctionne avec JAWS, NVDA, VoiceOver",
                    highContrast: "Contraste élevé - Textes bien lisibles sur tous les fonds",
                    focusVisible: "Focus visible - Indicateurs clairs pour la navigation au clavier",
                    altText: "Textes alternatifs - Toutes les images ont des descriptions",
                    descriptiveLabels: "Étiquettes descriptives - Formulaires et contrôles bien étiquetés",
                },
                shortcuts: {
                    title: "Raccourcis Clavier",
                    tab: "Naviguer entre les éléments",
                    enterSpace: "Activer les boutons et les liens",
                    esc: "Fermer les modales et les menus",
                    arrows: "Naviguer dans les listes et les menus",
                },
            },
            legal: {
                title: "📋 Conformité Légale",
                accessibilityDeclaration: "Déclaration d'Accessibilité :",
                description:
                    "VesuviaSearch s'engage à garantir l'accessibilité numérique pour les personnes handicapées conformément à la",
                leggeStancaLink: "Legge Stanca",
                and: " et aux ",
                wcagLink: "WCAG 2.1",
                lastUpdate: "Dernière mise à jour :",
                nextReview: "Prochaine révision :",
            },
        },
    },

    de: {
        // Header/Navigation
        findTrains: 'Züge Finden',
        searchSchedules: 'Zugfahrpläne suchen und Ihre Reise buchen',

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
        searchingTrains: 'Züge werden gesucht...',

        // Error messages
        departureRequired: 'Der Abfahrtsbahnhof ist erforderlich',
        arrivalRequired: 'Der Ankunftsbahnhof ist erforderlich',
        stationsDifferent: 'Der Ankunftsbahnhof muss sich vom Abfahrtsbahnhof unterscheiden',
        timeRequired: 'Die Abfahrtszeit ist erforderlich',

        // Date picker
        selectDateTime: 'Datum und Uhrzeit auswählen',
        date: 'Datum',
        time: 'Uhrzeit',
        selectDate: 'Datum auswählen',

        // SEARCH RESULTS AND TRAIN INFORMATION
        searchingTrainsInProgress: 'Züge werden gesucht...',
        noTrainsFound: 'Keine Züge gefunden',
        noTrainsFoundDescription: 'Versuchen Sie, Ihre Suchkriterien zu ändern oder überprüfen Sie, ob die Bahnhöfe korrekt sind.',
        searchResults: 'Suchergebnisse',
        train: 'Zug',
        trains: 'Züge',
        departure: 'Abfahrt',
        arrival: 'Ankunft',
        duration: 'Dauer',
        direction: 'Richtung',
        intermediateStops: 'Zwischenstopps',
        showAllStops: 'Alle Haltestellen anzeigen',
        apiError: 'Service vorübergehend nicht verfügbar',
        apiErrorDescription: 'Bitte versuchen Sie es in wenigen Augenblicken erneut. Wenn das Problem bestehen bleibt, wenden Sie sich an den Support.',
        networkError: 'Verbindungsfehler',
        networkErrorDescription: 'Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
        invalidStationError: 'Ungültiger Bahnhof',
        invalidStationErrorDescription: 'Bitte wählen Sie einen gültigen Bahnhof aus der Liste.',
        searchError: 'Suchfehler',
        searchErrorDescription: 'Ein Fehler ist während der Suche aufgetreten. Bitte versuchen Sie es erneut.',

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
        journeyDetails: 'Reisedetails',

        // Page content
        findTrainsTitle: 'Finden Sie Ihre Circumvesuviana-Züge',
        findTrainsSubtitle: 'Einfache und schnelle Suche für das EAV-Netz in Kampanien',
        loading: 'Laden...',
        swapStations: 'Bahnhöfe tauschen',
        filters: 'Filter',
        campaniaExpressOnly: 'Nur Campania Express',
        campaniaExpressLabel: 'Campania Express',

        // Additional useful translations
        error: 'Fehler',
        retry: 'Erneut versuchen',
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
        searchingNextDepartures: 'Nächste Abfahrten werden gesucht...',
        searchNextDepartures: 'Nächste Abfahrten Suchen',

        // Departures results
        nextDeparturesFrom: 'Nächste Abfahrten von',
        nextArrivalsTo: 'Nächste Ankünfte nach',
        searchingArrivals: 'Ankünfte werden gesucht...',
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
        directionSorrento: 'Sorrent',

        // Operating days
        operatingDaysWeekdaysOnly: 'Nur Werktage',
        operatingDaysWeekendsOnly: 'Nur Wochenenden',
        operatingDaysDaily: 'Täglich',
        operatingDaysWeekdaysAndSaturday: 'Werktage und Samstag',

        // ========================================
        // DYNAMIC ROUTE PAGES
        // ========================================
        routePages: {
            common: {
                metaTitle: "Zug von {{from}} nach {{to}} - Fahrpläne, Dauer und Vollständiger Leitfaden",
                metaDescription: "Entdecken Sie Fahrpläne, Dauer und vollständige Informationen über den Zug von {{from}} nach {{to}}. Detaillierter Leitfaden mit Reisetipps und Transportoptionen.",
                pageTitle: "🚆 Von {{from}} nach {{to}} mit dem Zug",
                intro: "Vollständige Informationen über die Zugverbindung zwischen {{from}} und {{to}}, aktuelle Fahrpläne und Reisetipps.",
                trainSchedules: "Zugfahrpläne",
                travelTime: "Reisezeit",
                travelOptions: "Reiseoptionen",
                fares: "Tarife",
                travelTips: "Reisetipps",
                howToReach: "Wie Erreichen",
                fromStation: "Vom Bahnhof {{station}}",
                toDestination: "Nach {{destination}}",
                directConnection: "Direkte Verbindung",
                connectionWithTransfer: "Verbindung mit Umstieg",
                regularTrains: "Regionalzüge",
                expressTrains: "Campania Express Züge",
                mostPopularTimes: "Beliebteste Zeiten",
                lastTrains: "Letzte Züge",
                earlyMorning: "Früher Morgen",
                ticketPurchaseOptions: "Wo Tickets Kaufen",
                onboardFacilities: "Bordservice",
                accessibility: "Barrierefreiheit",
                schedulesSubject: "Fahrpläne können sich ändern. Immer vor der Reise überprüfen."
            },
            napoliSorrento: {
                specificInfo: "Die Linie Neapel-Sorrento ist die verkehrsreichste im Circumvesuviana-Netz, mit Zügen alle 30 Minuten während der Hochsaison.",
                attractionsOnRoute: "Sehenswürdigkeiten entlang der Strecke: Pompeji, Herculaneum, Torre Annunziata, Castellammare di Stabia, Vico Equense.",
                peakTimeWarning: "Während der Sommer-Hochsaison können die Züge sehr überfüllt sein, besonders zu Stoßzeiten.",
                travelTip1: "Erwägen Sie den Campania Express für eine schnellere und komfortablere Reise während der Hochsaison.",
                travelTip2: "Tickets können an den Bahnhöfen oder über die offizielle EAV-App gekauft werden.",
                travelTip3: "Führen Sie immer einen gültigen Ausweis für Kontrollen an Bord mit."
            },
            napoliPompei: {
                specificInfo: "Die Verbindung Neapel-Pompeji wird von Touristen, die zu den archäologischen Ausgrabungen fahren, stark frequentiert.",
                attractionsInfo: "Die nächste Haltestelle zu den Archäologischen Ausgrabungen ist 'Pompei Scavi - Villa dei Misteri'.",
                archaeologicalParkInfo: "Die Archäologischen Ausgrabungen sind täglich von 9:00 bis 19:00 Uhr geöffnet (letzter Einlass um 17:30).",
                travelTip1: "Steigen Sie am Bahnhof 'Pompei Scavi - Villa dei Misteri' aus, nur 100m vom Haupteingang der Ausgrabungen entfernt.",
                travelTip2: "Während der Hochsaison erwägen Sie den Campania Express, der weniger Haltestellen hat und garantierte Plätze bietet.",
                travelTip3: "Bringen Sie Wasser und Sonnenschutz mit, da das archäologische Gebiet wenig Schatten bietet."
            },
            napoliErcolano: {
                specificInfo: "Die archäologische Stätte von Herculaneum liegt etwa 700m vom Bahnhof 'Ercolano Scavi' entfernt.",
                attractionsInfo: "Zusätzlich zu den Ausgrabungen können Sie das MAV - Virtuelles Archäologisches Museum in kurzer Entfernung vom Bahnhof besuchen.",
                visitInfo: "Herculaneum ist im Allgemeinen weniger überfüllt als Pompeji und kann in etwa 2-3 Stunden besichtigt werden.",
                travelTip1: "Vom Bahnhof zum archäologischen Gebiet gibt es einen leichten Abstieg von etwa 10 Minuten zu Fuß.",
                travelTip2: "Erwägen Sie ein Kombi-Ticket Pompeji+Herculaneum, wenn Sie beide Stätten besuchen möchten.",
                travelTip3: "Die frühen Morgenzüge sind am wenigsten überfüllt, ideal um den Besuch früh zu beginnen."
            },
            sorrentoPompei: {
                specificInfo: "Die Verbindung Sorrento-Pompeji ist ideal für diejenigen, die an der Küste übernachten und die Ausgrabungen besuchen möchten.",
                attractionsInfo: "Von Pompeji können Sie am selben Tag leicht nach Neapel oder Herculaneum weiterfahren.",
                visitDuration: "Planen Sie mindestens 4 Stunden für den Besuch der Ausgrabungen ein",
                travelTip1: "Fahren Sie früh von Sorrent ab, um Menschenmassen und Sommerhitze in Pompeji zu vermeiden.",
                travelTip2: "Überprüfen Sie die Rückfahrzeiten, besonders für die letzten Verbindungen des Tages.",
                travelTip3: "Während der Hochsaison erwägen Sie den Campania Express für eine komfortablere Reise."
            }
        },

        // ========================================
        // TRAVEL TIME CALCULATOR
        // ========================================
        travelTimePage: {
            metaTitle: "Reisezeit-Berechnung - Circumvesuviana und EAV",
            metaDescription: "Berechnen Sie die exakte Reisezeit zwischen allen Bahnhöfen des Circumvesuviana- und EAV-Netzes. Vergleichen Sie Regional- und Expresszüge.",
            pageTitle: "⏱️ Reisezeit-Rechner",
            intro: "Berechnen und vergleichen Sie Reisezeiten zwischen Bahnhöfen des Circumvesuviana- und EAV-Netzes. Nützlich für die Planung Ihrer Reisen in Kampanien.",
            travelTimeCalculator: "Reisezeit-Rechner",
            selectStations: "Bahnhöfe auswählen",
            calculateTime: "Zeit berechnen",
            calculatingTime: "Berechnung läuft...",
            travelTimeResults: "Reisezeit-Ergebnisse",
            standardTrain: "Regionalzug",
            expressTrain: "Expresszug",
            timeSaving: "Zeitersparnis",
            timeDifference: "Zeitunterschied",
            regularTrainTime: "Regionalzug-Zeit",
            expressTrainTime: "Expresszug-Zeit",
            averageWaitingTime: "Durchschnittliche Wartezeit",
            peakHoursDuration: "Dauer zu Stoßzeiten",
            offPeakDuration: "Dauer außerhalb der Stoßzeiten",
            noExpressService: "Kein Expressservice auf dieser Strecke verfügbar",
            transfersRequired: "Erforderliche Umstiege",
            popularConnections: "Beliebte Verbindungen",
            travelTips: "Reisetipps",
            tip1: "Reisezeiten können je nach Uhrzeit und Wochentag variieren.",
            tip2: "Campania Express Züge haben weniger Haltestellen und sind schneller, kosten aber einen Aufpreis.",
            tip3: "Während der Stoßzeiten sollten Sie 5-10 Minuten zur geschätzten Reisezeit hinzufügen.",
            tip4: "Erwägen Sie den Campania Express für touristische Ziele",
            popularRoutes: "Beliebte Strecken",
            napoliSorrento: "Neapel - Sorrento",
            napoliPompei: "Neapel - Pompeji",
            napoliErcolano: "Neapel - Herculanum",
            sorrentoPompei: "Sorrente - Pompeji",
            effects: {
                title: "Faktoren, die Reisezeiten beeinflussen",
                trainType: "Zugtyp (Regional/Express)",
                timeOfDay: "Tageszeit (Stoßzeit/Nebenzeit)",
                dayOfWeek: "Wochentag (Werktag/Feiertag)",
                season: "Saisonalität (Hoch-/Nebensaison)",
                weatherConditions: "Wetterbedingungen"
            },
            howToReadTimes: "Wie man die Zeiten liest",
            regularTime: "Reguläre Zeit",
            regularTimeDescription: "Normale Züge mit allen Haltestellen",
            expressTime: "Express-Zeit",
            expressTimeDescription: "Touristenzüge überspringen einige Haltestellen und reduzieren die Reisezeit erheblich",
            variations: "Variationen",
            variationsDescription: "Die Zeiten können aufgrund von Verkehr und Fahrplänen variieren",
            stops: "Haltestellen",
            stations: "Bahnhöfe",
            note: "Hinweis",
            detailedGuide: "Detaillierter Leitfaden für diese Strecke",
            optimalPlanning: "Optimale Planung",
            forTourists: "Für Touristen",
            touristTip1: "Pompeji Scavi: Planen Sie mindestens 3 Stunden für den Besuch ein",
            touristTip2: "Sorrent: Betrachten Sie es als Basis für die Amalfiküste",
            touristTip3: "Herculaneum: Kürzerer Besuch, ideal für einen halben Tag",
            touristTip4: "Kaufen Sie Tickets im Sommer im Voraus",
            checkRealTimeSchedules: "Echtzeit-Fahrpläne prüfen",
            peakHoursDescription: "Zu Stoßzeiten können Züge aufgrund erhöhten Verkehrs langsamer sein",
            expressTrainsDescription: "Expresszüge überspringen einige Haltestellen und reduzieren die Reisezeit erheblich",
            weatherDelaysDescription: "Verspätungen, laufende Arbeiten oder Wetterbedingungen können die Zeiten beeinflussen",
            faq: {
                title: "Häufig gestellte Fragen zu Reisezeiten",
                q1: "Wie lange dauert es von Neapel nach Sorrento?",
                a1: "Die durchschnittliche Reisezeit von Napoli Porta Nolana nach Sorrente ist von etwa 65-70 Minuten mit dem Regionalzug und 45-50 Minuten mit dem Campania Express.",
                q2: "Welcher ist der schnellste Zug nach Pompeji von Neapel?",
                a2: "Der Campania Express ist die schnellste Verbindung mit einer Reisezeit von etwa 25 Minuten von Neapel nach Pompei Scavi.",
                q3: "Wie lange dauert die Fahrt von Neapel nach Ercolano Scavi?",
                a3: "Die Fahrt von Neapel nach Ercolano Scavi dauert etwa 20-25 Minuten mit der Circumvesuviana und ist eines der am schnellsten zu erreichenden Ziele.",
                q4: "Gibt es einen Zeitunterschied zwischen Werktagen und Feiertagen?",
                a4: "Ja, an Feiertagen kann es weniger Fahrten und längere Wartezeiten geben, was möglicherweise die Gesamtreisezeit verlängert."
            }
        },

        // ========================================
        // HOMEPAGE CONTENT
        // ========================================
        pageTitle: 'Fahrpläne für Neapel und Circumvesuviana Züge',
        faqSectionTitle: 'Häufig gestellte Fragen zu Zügen in Neapel und Umgebung',
        pricingDisclaimer: {
            title: 'ℹ️ Preisinformationen',
            content: 'Für aktuelle Informationen zu den Preisen von EAV- und Circumvesuviana-Tickets wenden Sie sich bitte an die offiziellen EAV-Verkaufsstellen oder die offizielle Website. VesuviaSearch bietet ausschließlich Informationen zu den Zugfahrplänen.'
        },
        tourismCTA: {
            title: 'Planen Sie Ihre Reise nach Neapel und Umgebung',
            description: 'Erreichen Sie Sorrent, Pompeji, Herculaneum und alle touristischen Ziele in Kampanien ganz einfach mit den aktualisierten Fahrplänen der Circumvesuviana',
            buttonText: '🗺️ Touristische Ziele erkunden'
        },
        homeFAQs: {
            trainSchedules: {
                question: 'Wie sind die Zugfahrpläne von Neapel nach Sorrento?',
                answer: 'Die Circumvesuviana-Züge von Neapel nach Sorrento fahren etwa alle 30 Minuten von 6:00 bis 21:40 Uhr. Die Fahrt dauert etwa 1 Stunde und 15 Minuten. Der erste Zug fährt gegen 6:15 Uhr von Neapel Porta Nolana ab, der letzte gegen 21:40 Uhr.'
            },
            ticketPrices: {
                question: 'Wie viel kostet eine Fahrkarte von Neapel nach Pompeji?',
                answer: 'Die Standard-Fahrkarte von Neapel nach Pompeji Scavi kostet <strong>€2,80</strong>. Für den Campania Express (Premium-Touristenservice) beträgt der Preis etwa €8. Fahrkarten können an Fahrkartenautomaten oder Schaltern gekauft werden.'
            },
            stations: {
                question: 'Wo nimmt man die Circumvesuviana in Neapel?',
                answer: 'Die Hauptbahnhöfe sind <strong>Neapel Porta Nolana</strong> (Endstation) und <strong>Neapel Piazza Garibaldi</strong> (verbunden mit dem FS-Hauptbahnhof). Beide bedienen alle Ziele in der Provinz.'
            },
            pompeiDirections: {
                question: 'Wie komme ich von Neapel zu den Ausgrabungen von Pompeji?',
                answer: 'Nehmen Sie die Circumvesuviana von Neapel Porta Nolana in Richtung Sorrent/Poggiomarino und steigen Sie nach 35 Minuten an der Station <strong>Pompeji Scavi - Villa dei Misteri</strong> aus. Der Eingang zu den Ausgrabungen ist 100 Meter vom Bahnhof entfernt.'
            }
        },

        // Footer
        footerDisclaimer: 'Dieses Projekt hat keine Affiliation mit EAV (Ente Autonomo Volturno).',
        footerEducationalProject: 'Dies ist ein Open-Source-Bildungsprojekt, das nur zu Lernzwecken erstellt wurde.',
        footerMadeWith: 'Hergestellt mit',
        footerBy: 'von',
        footerEducationalCopyright: 'Bildungsprojekt',

        // PWA Installation
        installApp: 'Installieren',
        installing: 'Wird installiert...',
        appInstalled: 'App erfolgreich installiert',
        offlineMode: 'Offline-Modus',
        updateAvailable: 'Update verfügbar',
        updateApp: 'App aktualisieren',
        iosInstallTitle: 'Auf iOS installieren',
        iosInstallInstructions: 'Um diese App auf Ihrem iOS-Gerät zu installieren:\n\n1. Tippen Sie auf die Teilen-Schaltfläche (Quadrat mit Pfeil)\n2. Blättern Sie nach unten und tippen Sie auf "Zum Home-Bildschirm hinzufügen"\n3. Tippen Sie auf "Hinzufügen" in der oberen rechten Ecke',
        addToHomeScreen: 'Zum Home-Bildschirm hinzufügen',

        // ========================================
        // ACCESSIBILITY PAGE
        // ========================================
        accessibilityPage: {
            name: "Zugänglichkeit Informationen",
            description:
                "Vollständige Informationen zur Barrierefreiheit von VesuviaSearch und den Circumvesuviana-Stationen",
            faq1: {
                question: "Sind alle Funktionen der Website barrierefrei?",
                answer: "Ja, VesuviaSearch ist so konzipiert, dass es vollständig zugänglich gemäß den WCAG 2.1 Level AA-Standards ist. Alle Funktionen, einschließlich Zugsuche, Fahrpläne und Informationsseiten, sind für Benutzer mit Behinderungen zugänglich und mit Hilfstechnologien kompatibel.",
            },
            faq2: {
                question: "Welche Barrierefreiheit-Funktionen sind in den Circumvesuviana-Stationen verfügbar?",
                answer: "Die Barrierefreiheit variiert je nach Station. Hauptbahnhöfe wie Napoli Porta Nolana, Napoli Garibaldi und Sorrento verfügen über Rollstuhlzugang, taktile Wege und barrierefreie Einrichtungen. Für spezifische Stationsinformationen konsultieren Sie bitte die offizielle EAV-Website oder kontaktieren Sie deren Barrierefreiheitsdienst.",
            },
            hero: {
                title: "♿ Zugänglichkeit VesuviaSearch",
                description:
                    "VesuviaSearch ist so konzipiert, dass es für alle Benutzer, einschließlich Menschen mit Behinderungen, zugänglich ist. Hier sind vollständige Informationen zu unseren Zugänglichkeitsstandards und den barrierefreien Circumvesuviana-Stationen.",
            },
            webAccessibility: {
                title: "🌐 Barrierefreiheit der Website",
                standards: {
                    title: "Einhaltung von Standards",
                    wcag: "WCAG 2.1 Level AA - Einhaltung internationaler Richtlinien",
                    section508: "Section 508 - US-Bundesstandards für Barrierefreiheit",
                    en301: "EN 301 549 - Europäischer Standard für die Barrierefreiheit von IKT",
                    leggeStanca: "Legge Stanca - Italienische Vorschriften zur Barrierefreiheit",
                },
                features: {
                    title: "Zugängliche Funktionen",
                    keyboardNavigation: "Tastaturnavigation - Alle Elemente sind mit Tab navigierbar",
                    screenReader: "Kompatibel mit Screenreadern - Funktioniert mit JAWS, NVDA, VoiceOver",
                    highContrast: "Hoher Kontrast - Texte sind auf allen Hintergründen gut lesbar",
                    focusVisible: "Sichtbarer Fokus - Klare Indikatoren für die Tastaturnavigation",
                    altText: "Alternativtexte - Alle Bilder haben Beschreibungen",
                    descriptiveLabels: "Beschreibende Etiketten - Formulare und Steuerelemente sind gut beschriftet",
                },
                shortcuts: {
                    title: "Tastenkombinationen",
                    tab: "Zwischen den Elementen navigieren",
                    enterSpace: "Schaltflächen und Links aktivieren",
                    esc: "Modal- und Menüfenster schließen",
                    arrows: "In Listen und Menüs navigieren",
                },
            },
            legal: {
                title: "📋 Rechtliche Konformität",
                accessibilityDeclaration: "Erklärung zur Barrierefreiheit:",
                description: "VesuviaSearch verpflichtet sich, die digitale Barrierefreiheit für Menschen mit Behinderungen gemäß der",
                leggeStancaLink: "Legge Stanca",
                and: " und ",
                wcagLink: "WCAG 2.1",
                lastUpdate: "Letzte Aktualisierung:",
                nextReview: "Nächste Überprüfung:"
            }
        }
    },
};

/**
 * Type for translation keys based on the translations structure
 * Supports both direct keys and nested keys with dot notation (e.g., 'routePages.common.metaTitle')
 */
/**
 * Translation key type - defines all possible keys that can be used with the t() function
 * This type ensures type safety when accessing translations
 */
export type TranslationKey = string |
    "pageTitle" |
    "findTrainsSubtitle" |
    "faqSectionTitle" |
    "pricingDisclaimer.title" |
    "pricingDisclaimer.content" |
    "tourismCTA.title" |
    "tourismCTA.description" |
    "tourismCTA.buttonText" |
    "homeFAQs.trainSchedules.question" |
    "homeFAQs.trainSchedules.answer" |
    "homeFAQs.ticketPrices.question" |
    "homeFAQs.ticketPrices.answer" |
    "homeFAQs.stations.question" |
    "homeFAQs.stations.answer" |
    "homeFAQs.pompeiDirections.question" |
    "homeFAQs.pompeiDirections.answer";