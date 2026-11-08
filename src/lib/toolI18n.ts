import type { AnagramMode, LangCode } from "@/lib/anagram";

export type ToolCopy = {
  workspaceTitle: string;
  readGuides: string;
  moreOptions: string;
  about: string;
  contact: string;
  allGuides: string;
  modesMenu: string;
  brandSub: string;
  modes: string;
  actions: string;
  clearBoard: string;
  copyAll: string;
  copiedList: string;
  tryWord: (word: string) => string;
  morning: string;
  afternoon: string;
  evening: string;
  puzzler: string;
  loadingDict: string;
  dictError: string;
  searching: string;
  placeholder: string;
  generate: string;
  language: string;
  minLength: string;
  maxWords: string;
  sortBy: string;
  lettersN: string;
  results: string;
  exactHits: string;
  topScore: string;
  myResults: string;
  found: string;
  waiting: string;
  startTitle: string;
  startBody: string;
  noMatches: string;
  letterWords: string;
  letterSet: string;
  resultCap: string;
  upcomingTips: string;
  tipExactTitle: string;
  tipExactBody: string;
  tipNamesTitle: string;
  tipNamesBody: string;
  tipBlanksTitle: string;
  tipBlanksBody: string;
  topFind: string;
  copy: string;
  copied: string;
  speak: string;
  speaking: string;
  pts: string;
  upTo2: string;
  upTo3: string;
  sortLength: string;
  sortScore: string;
  sortAlpha: string;
  copyFailed: string;
  copyFailedManual: string;
  mode: Record<
    AnagramMode,
    { label: string; short: string; hint: string }
  >;
  locale: string;
};

export const TOOL_I18N: Record<LangCode, ToolCopy> = {
  en: {
    workspaceTitle: "Anagram Generator — Workspace",
    readGuides: "Read guides",
    moreOptions: "More options",
    about: "About",
    contact: "Contact",
    allGuides: "All guides",
    modesMenu: "Modes menu",
    brandSub: "Workspace",
    modes: "Modes",
    actions: "Actions",
    clearBoard: "Clear board",
    copyAll: "Copy all",
    copiedList: "Copied list",
    tryWord: (w) => `Try ${w}`,
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    puzzler: "puzzler",
    loadingDict: "Loading dictionary…",
    dictError: "Could not load the word list. Refresh and try again.",
    searching: "Searching…",
    placeholder: "Find anagrams — type letters, a name, or a phrase. Use ? for blanks",
    generate: "Generate",
    language: "Language",
    minLength: "Min length",
    maxWords: "Max words",
    sortBy: "Sort by",
    lettersN: "Letters",
    results: "Results",
    exactHits: "Exact hits",
    topScore: "Top score",
    myResults: "My results",
    found: "found",
    waiting: "Waiting",
    startTitle: "Start rearranging",
    startBody:
      "Type a jumble above. Exact finds full-letter anagrams; All words lists every shorter play; Multi-word builds phrases like dormitory → dirty room.",
    noMatches: "No matches yet. Try All words, lower min length, or add a ? wildcard.",
    letterWords: "words",
    letterSet: "set",
    resultCap: "Result cap reached — raise min length or switch modes to refine.",
    upcomingTips: "Upcoming tips",
    tipExactTitle: "Full-letter rearrangements only",
    tipExactBody: "Best when you know the answer uses every tile once.",
    tipNamesTitle: "Switch to Multi-word",
    tipNamesBody: "Set min length to 3–4 for cleaner phrase anagrams of longer names.",
    tipBlanksTitle: "Use ? for wildcards",
    tipBlanksBody: "Up to two blank tiles — perfect for Scrabble-style racks.",
    topFind: "Top find",
    copy: "Copy",
    copied: "copied",
    speak: "Speak",
    speaking: "Speaking…",
    pts: "pts",
    upTo2: "Up to 2 words",
    upTo3: "Up to 3 words",
    sortLength: "Length",
    sortScore: "Scrabble score",
    sortAlpha: "A–Z",
    copyFailed: "Copy failed.",
    copyFailedManual: "Copy failed — select the word manually.",
    mode: {
      subset: {
        label: "All words",
        short: "Unscramble every playable word from your letters.",
        hint: "Every valid word you can spell — including shorter ones.",
      },
      exact: {
        label: "Exact",
        short: "True anagrams that use every letter once.",
        hint: "Only words that use every letter exactly once.",
      },
      multi: {
        label: "Multi-word",
        short: "Phrase anagrams of 2–3 real words.",
        hint: "Phrases of 2–3 real words that together use every letter.",
      },
    },
    locale: "en-US",
  },
  es: {
    workspaceTitle: "Generador de anagramas — Espacio",
    readGuides: "Leer guías",
    moreOptions: "Más opciones",
    about: "Acerca de",
    contact: "Contacto",
    allGuides: "Todas las guías",
    modesMenu: "Menú de modos",
    brandSub: "Espacio",
    modes: "Modos",
    actions: "Acciones",
    clearBoard: "Limpiar",
    copyAll: "Copiar todo",
    copiedList: "Lista copiada",
    tryWord: (w) => `Probar ${w}`,
    morning: "Buenos días",
    afternoon: "Buenas tardes",
    evening: "Buenas noches",
    puzzler: "jugador",
    loadingDict: "Cargando diccionario…",
    dictError: "No se pudo cargar el diccionario. Actualiza e inténtalo de nuevo.",
    searching: "Buscando…",
    placeholder: "Busca anagramas — escribe letras, un nombre o una frase. Usa ? para comodines",
    generate: "Generar",
    language: "Idioma",
    minLength: "Long. mín.",
    maxWords: "Máx. palabras",
    sortBy: "Ordenar por",
    lettersN: "Letras",
    results: "Resultados",
    exactHits: "Exactos",
    topScore: "Mejor puntuación",
    myResults: "Mis resultados",
    found: "encontrados",
    waiting: "Esperando",
    startTitle: "Empieza a reordenar",
    startBody:
      "Escribe un revoltijo arriba. Exacto encuentra anagramas completos; Todas las palabras lista jugadas más cortas; Multipalabra crea frases.",
    noMatches: "Sin coincidencias. Prueba Todas las palabras, baja la longitud mínima o añade ?.",
    letterWords: "palabras",
    letterSet: "conjunto",
    resultCap: "Límite alcanzado — sube la longitud mínima o cambia de modo.",
    upcomingTips: "Consejos",
    tipExactTitle: "Solo reordenaciones completas",
    tipExactBody: "Ideal cuando la respuesta usa todas las letras una vez.",
    tipNamesTitle: "Cambia a Multipalabra",
    tipNamesBody: "Usa longitud mínima 3–4 para anagramas de nombres más limpios.",
    tipBlanksTitle: "Usa ? como comodín",
    tipBlanksBody: "Hasta dos comodines — perfecto para racks tipo Scrabble.",
    topFind: "Mejor hallazgo",
    copy: "Copiar",
    copied: "copiado",
    speak: "Escuchar",
    speaking: "Hablando…",
    pts: "pts",
    upTo2: "Hasta 2 palabras",
    upTo3: "Hasta 3 palabras",
    sortLength: "Longitud",
    sortScore: "Puntos Scrabble",
    sortAlpha: "A–Z",
    copyFailed: "Error al copiar.",
    copyFailedManual: "Error al copiar — selecciona la palabra manualmente.",
    mode: {
      subset: {
        label: "Todas",
        short: "Descrifra cada palabra jugable con tus letras.",
        hint: "Todas las palabras válidas, incluidas las más cortas.",
      },
      exact: {
        label: "Exacto",
        short: "Anagramas verdaderos que usan cada letra una vez.",
        hint: "Solo palabras que usan todas las letras exactamente una vez.",
      },
      multi: {
        label: "Multipalabra",
        short: "Anagramas de frases de 2–3 palabras reales.",
        hint: "Frases de 2–3 palabras reales que usan todas las letras.",
      },
    },
    locale: "es-ES",
  },
  fr: {
    workspaceTitle: "Générateur d’anagrammes — Espace",
    readGuides: "Lire les guides",
    moreOptions: "Plus d’options",
    about: "À propos",
    contact: "Contact",
    allGuides: "Tous les guides",
    modesMenu: "Menu des modes",
    brandSub: "Espace",
    modes: "Modes",
    actions: "Actions",
    clearBoard: "Effacer",
    copyAll: "Tout copier",
    copiedList: "Liste copiée",
    tryWord: (w) => `Essayer ${w}`,
    morning: "Bonjour",
    afternoon: "Bon après-midi",
    evening: "Bonsoir",
    puzzler: "joueur",
    loadingDict: "Chargement du dictionnaire…",
    dictError: "Impossible de charger le dictionnaire. Actualisez et réessayez.",
    searching: "Recherche…",
    placeholder: "Trouvez des anagrammes — lettres, nom ou phrase. Utilisez ? pour les jokers",
    generate: "Générer",
    language: "Langue",
    minLength: "Long. min.",
    maxWords: "Mots max",
    sortBy: "Trier par",
    lettersN: "Lettres",
    results: "Résultats",
    exactHits: "Exactes",
    topScore: "Meilleur score",
    myResults: "Mes résultats",
    found: "trouvés",
    waiting: "En attente",
    startTitle: "Commencez à réorganiser",
    startBody:
      "Tapez un mélange ci-dessus. Exact trouve les anagrammes complets ; Tous les mots liste les plus courts ; Multi-mots crée des phrases.",
    noMatches: "Aucun résultat. Essayez Tous les mots, baissez la longueur min. ou ajoutez ?.",
    letterWords: "mots",
    letterSet: "ensemble",
    resultCap: "Limite atteinte — augmentez la longueur min. ou changez de mode.",
    upcomingTips: "Astuces",
    tipExactTitle: "Réarrangements complets uniquement",
    tipExactBody: "Idéal quand la réponse utilise chaque lettre une fois.",
    tipNamesTitle: "Passez en Multi-mots",
    tipNamesBody: "Longueur min. 3–4 pour des anagrammes de noms plus lisibles.",
    tipBlanksTitle: "Utilisez ? comme joker",
    tipBlanksBody: "Jusqu’à deux jokers — parfait pour un rack Scrabble.",
    topFind: "Meilleure trouvaille",
    copy: "Copier",
    copied: "copié",
    speak: "Écouter",
    speaking: "Lecture…",
    pts: "pts",
    upTo2: "Jusqu’à 2 mots",
    upTo3: "Jusqu’à 3 mots",
    sortLength: "Longueur",
    sortScore: "Score Scrabble",
    sortAlpha: "A–Z",
    copyFailed: "Échec de la copie.",
    copyFailedManual: "Échec de la copie — sélectionnez le mot manuellement.",
    mode: {
      subset: {
        label: "Tous les mots",
        short: "Déchiffrez chaque mot jouable avec vos lettres.",
        hint: "Tous les mots valides, y compris les plus courts.",
      },
      exact: {
        label: "Exact",
        short: "Vraies anagrammes utilisant chaque lettre une fois.",
        hint: "Uniquement les mots qui utilisent toutes les lettres une fois.",
      },
      multi: {
        label: "Multi-mots",
        short: "Anagrammes de phrases de 2–3 mots réels.",
        hint: "Phrases de 2–3 mots réels utilisant toutes les lettres.",
      },
    },
    locale: "fr-FR",
  },
  de: {
    workspaceTitle: "Anagramm-Generator — Arbeitsbereich",
    readGuides: "Ratgeber lesen",
    moreOptions: "Mehr Optionen",
    about: "Über uns",
    contact: "Kontakt",
    allGuides: "Alle Ratgeber",
    modesMenu: "Modus-Menü",
    brandSub: "Arbeitsbereich",
    modes: "Modi",
    actions: "Aktionen",
    clearBoard: "Leeren",
    copyAll: "Alles kopieren",
    copiedList: "Liste kopiert",
    tryWord: (w) => `${w} testen`,
    morning: "Guten Morgen",
    afternoon: "Guten Tag",
    evening: "Guten Abend",
    puzzler: "Rätsler",
    loadingDict: "Wörterbuch wird geladen…",
    dictError: "Wörterbuch konnte nicht geladen werden. Bitte neu laden.",
    searching: "Suche…",
    placeholder: "Anagramme finden — Buchstaben, Name oder Phrase. ? für Joker",
    generate: "Generieren",
    language: "Sprache",
    minLength: "Min. Länge",
    maxWords: "Max. Wörter",
    sortBy: "Sortieren",
    lettersN: "Buchstaben",
    results: "Ergebnisse",
    exactHits: "Exakte Treffer",
    topScore: "Top-Score",
    myResults: "Meine Ergebnisse",
    found: "gefunden",
    waiting: "Wartet",
    startTitle: "Jetzt umordnen",
    startBody:
      "Tippe oben ein Buchstabensalat. Exakt findet volle Anagramme; Alle Wörter listet kürzere Züge; Mehrwort baut Phrasen.",
    noMatches: "Keine Treffer. Probiere Alle Wörter, senke die Min.-Länge oder füge ? hinzu.",
    letterWords: "Wörter",
    letterSet: "Satz",
    resultCap: "Limit erreicht — erhöhe die Min.-Länge oder wechsle den Modus.",
    upcomingTips: "Tipps",
    tipExactTitle: "Nur vollständige Umordnungen",
    tipExactBody: "Am besten, wenn jede Kachel genau einmal genutzt wird.",
    tipNamesTitle: "Zu Mehrwort wechseln",
    tipNamesBody: "Min.-Länge 3–4 für klarere Namensanagramme.",
    tipBlanksTitle: "? als Joker nutzen",
    tipBlanksBody: "Bis zu zwei Joker — ideal für Scrabble-Racks.",
    topFind: "Top-Fund",
    copy: "Kopieren",
    copied: "kopiert",
    speak: "Anhören",
    speaking: "Spricht…",
    pts: "Pkt",
    upTo2: "Bis 2 Wörter",
    upTo3: "Bis 3 Wörter",
    sortLength: "Länge",
    sortScore: "Scrabble-Punkte",
    sortAlpha: "A–Z",
    copyFailed: "Kopieren fehlgeschlagen.",
    copyFailedManual: "Kopieren fehlgeschlagen — Wort manuell markieren.",
    mode: {
      subset: {
        label: "Alle Wörter",
        short: "Jedes spielbare Wort aus deinen Buchstaben.",
        hint: "Alle gültigen Wörter — auch kürzere.",
      },
      exact: {
        label: "Exakt",
        short: "Echte Anagramme mit jedem Buchstaben einmal.",
        hint: "Nur Wörter, die alle Buchstaben genau einmal nutzen.",
      },
      multi: {
        label: "Mehrwort",
        short: "Phrasen-Anagramme aus 2–3 echten Wörtern.",
        hint: "Phrasen aus 2–3 Wörtern, die alle Buchstaben verbrauchen.",
      },
    },
    locale: "de-DE",
  },
  it: {
    workspaceTitle: "Generatore di anagrammi — Spazio",
    readGuides: "Leggi guide",
    moreOptions: "Altre opzioni",
    about: "Chi siamo",
    contact: "Contatti",
    allGuides: "Tutte le guide",
    modesMenu: "Menu modalità",
    brandSub: "Spazio",
    modes: "Modalità",
    actions: "Azioni",
    clearBoard: "Pulisci",
    copyAll: "Copia tutto",
    copiedList: "Lista copiata",
    tryWord: (w) => `Prova ${w}`,
    morning: "Buongiorno",
    afternoon: "Buon pomeriggio",
    evening: "Buonasera",
    puzzler: "risolutore",
    loadingDict: "Caricamento dizionario…",
    dictError: "Impossibile caricare il dizionario. Aggiorna e riprova.",
    searching: "Ricerca…",
    placeholder: "Trova anagrammi — lettere, nome o frase. Usa ? per i jolly",
    generate: "Genera",
    language: "Lingua",
    minLength: "Lung. min.",
    maxWords: "Parole max",
    sortBy: "Ordina per",
    lettersN: "Lettere",
    results: "Risultati",
    exactHits: "Esatte",
    topScore: "Punteggio top",
    myResults: "I miei risultati",
    found: "trovati",
    waiting: "In attesa",
    startTitle: "Inizia a riordinare",
    startBody:
      "Digita un mix sopra. Esatto trova anagrammi completi; Tutte le parole elenca mosse più corte; Multi-parola crea frasi.",
    noMatches: "Nessun risultato. Prova Tutte le parole, abbassa la lunghezza min. o aggiungi ?.",
    letterWords: "parole",
    letterSet: "insieme",
    resultCap: "Limite raggiunto — alza la lunghezza min. o cambia modalità.",
    upcomingTips: "Suggerimenti",
    tipExactTitle: "Solo riordini completi",
    tipExactBody: "Ideale quando la risposta usa ogni lettera una volta.",
    tipNamesTitle: "Passa a Multi-parola",
    tipNamesBody: "Lunghezza min. 3–4 per anagrammi di nomi più chiari.",
    tipBlanksTitle: "Usa ? come jolly",
    tipBlanksBody: "Fino a due jolly — perfetto per rack tipo Scrabble.",
    topFind: "Miglior trovata",
    copy: "Copia",
    copied: "copiato",
    speak: "Ascolta",
    speaking: "In riproduzione…",
    pts: "pti",
    upTo2: "Fino a 2 parole",
    upTo3: "Fino a 3 parole",
    sortLength: "Lunghezza",
    sortScore: "Punteggio Scrabble",
    sortAlpha: "A–Z",
    copyFailed: "Copia non riuscita.",
    copyFailedManual: "Copia non riuscita — seleziona la parola manualmente.",
    mode: {
      subset: {
        label: "Tutte",
        short: "Descrifra ogni parola giocabile con le tue lettere.",
        hint: "Tutte le parole valide, anche più corte.",
      },
      exact: {
        label: "Esatto",
        short: "Veri anagrammi che usano ogni lettera una volta.",
        hint: "Solo parole che usano tutte le lettere esattamente una volta.",
      },
      multi: {
        label: "Multi-parola",
        short: "Anagrammi di frasi di 2–3 parole reali.",
        hint: "Frasi di 2–3 parole reali che usano tutte le lettere.",
      },
    },
    locale: "it-IT",
  },
  pt: {
    workspaceTitle: "Gerador de anagramas — Espaço",
    readGuides: "Ler guias",
    moreOptions: "Mais opções",
    about: "Sobre",
    contact: "Contato",
    allGuides: "Todos os guias",
    modesMenu: "Menu de modos",
    brandSub: "Espaço",
    modes: "Modos",
    actions: "Ações",
    clearBoard: "Limpar",
    copyAll: "Copiar tudo",
    copiedList: "Lista copiada",
    tryWord: (w) => `Tentar ${w}`,
    morning: "Bom dia",
    afternoon: "Boa tarde",
    evening: "Boa noite",
    puzzler: "jogador",
    loadingDict: "Carregando dicionário…",
    dictError: "Não foi possível carregar o dicionário. Atualize e tente de novo.",
    searching: "Buscando…",
    placeholder: "Ache anagramas — letras, nome ou frase. Use ? para curingas",
    generate: "Gerar",
    language: "Idioma",
    minLength: "Comp. mín.",
    maxWords: "Máx. palavras",
    sortBy: "Ordenar por",
    lettersN: "Letras",
    results: "Resultados",
    exactHits: "Exatos",
    topScore: "Melhor pontuação",
    myResults: "Meus resultados",
    found: "encontrados",
    waiting: "Aguardando",
    startTitle: "Comece a reorganizar",
    startBody:
      "Digite um embaralhado acima. Exato acha anagramas completos; Todas as palavras lista jogadas menores; Multipalavra cria frases.",
    noMatches: "Sem resultados. Tente Todas as palavras, baixe o mínimo ou adicione ?.",
    letterWords: "palavras",
    letterSet: "conjunto",
    resultCap: "Limite atingido — aumente o mínimo ou mude o modo.",
    upcomingTips: "Dicas",
    tipExactTitle: "Só rearranjos completos",
    tipExactBody: "Melhor quando a resposta usa cada letra uma vez.",
    tipNamesTitle: "Mude para Multipalavra",
    tipNamesBody: "Comprimento mín. 3–4 para anagramas de nomes mais limpos.",
    tipBlanksTitle: "Use ? como curinga",
    tipBlanksBody: "Até dois curingas — perfeito para racks de Scrabble.",
    topFind: "Melhor achado",
    copy: "Copiar",
    copied: "copiado",
    speak: "Ouvir",
    speaking: "A falar…",
    pts: "pts",
    upTo2: "Até 2 palavras",
    upTo3: "Até 3 palavras",
    sortLength: "Comprimento",
    sortScore: "Pontos Scrabble",
    sortAlpha: "A–Z",
    copyFailed: "Falha ao copiar.",
    copyFailedManual: "Falha ao copiar — selecione a palavra manualmente.",
    mode: {
      subset: {
        label: "Todas",
        short: "Desembaralhe cada palavra jogável com suas letras.",
        hint: "Todas as palavras válidas, incluindo as mais curtas.",
      },
      exact: {
        label: "Exato",
        short: "Anagramas verdadeiros que usam cada letra uma vez.",
        hint: "Só palavras que usam todas as letras exatamente uma vez.",
      },
      multi: {
        label: "Multipalavra",
        short: "Anagramas de frases com 2–3 palavras reais.",
        hint: "Frases de 2–3 palavras reais que usam todas as letras.",
      },
    },
    locale: "pt-PT",
  },
};

export function toolCopy(lang: LangCode): ToolCopy {
  return TOOL_I18N[lang] ?? TOOL_I18N.en;
}

export function greetingFor(lang: LangCode): string {
  const t = toolCopy(lang);
  const h = new Date().getHours();
  if (h < 12) return t.morning;
  if (h < 18) return t.afternoon;
  return t.evening;
}

export function todayLabelFor(lang: LangCode): string {
  return new Date().toLocaleDateString(toolCopy(lang).locale, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
