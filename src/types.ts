/**
 * Types & Translation Copies for ELIT High-Performance Training Platform
 */

export type Language = 'ES' | 'EN';

export type UserRole = 'Delantero' | 'Volante' | 'Defensa' | 'Arquero' | 'Striker' | 'Midfileder' | 'Defender' | 'Goalkeeper';

export interface AthleticProfile {
  edad: number;
  pais: string;
  posicion: string;
  altura: number; // in cm
  peso: number; // in kg
  sprints30m: number; // in seconds
  resistencia: string; // MM:SS format
  horasEquipo: number;
  horasPersonal: number;
  metaCortoPlazo: string;
  metaLargoPlazo: string;
  motivacion: number; // 1-10
  estres: number; // 1-10
}

export interface MetricLog {
  categoria: string;
  valor: number;
  fecha: string;
}

export interface TrainingItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface DailyRoutine {
  dayNum: number;
  dayLabel: string;
  title: string;
  description: string;
  type: 'VELOCIDAD' | 'FUERZA' | 'RECUPERACION' | 'TECNICA';
  difficulty: 'ELITE' | 'PRO' | 'DESCANSO';
  isToday?: boolean;
  exercises: TrainingItem[];
  completed: boolean;
}

export interface VideoReference {
  id: string;
  title: string;
  tag: string;
  thumbnail: string;
  videoUrl: string;
}

export const LANGUAGES = {
  ES: {
    brand: 'ELIT',
    slogan: 'Elite Level Intelligence Training',
    plataformaIA: 'PLATAFORMA IA DEPORTIVA',
    heroButton: 'Comenzar Ahora',
    demoButton: 'Ver Demo',
    
    // Stats
    statPlayers: 'JUGADORES',
    statImprovement: 'MEJORA',
    statRoutines: 'RUTINAS',
    statPrecision: 'PRECISIÓN IA',
    
    // Nav bar
    navInicio: 'Inicio',
    navAbout: 'Quiénes Somos',
    navSuscripcion: 'Suscripción',
    navProfile: 'Mi Perfil',
    navDashboard: 'Dashboard',
    navCalendar: 'Calendario',
    navNutrition: 'Nutrición',
    navScouting: 'Scouting IA',
    navLogout: 'Cerrar Sesión',
    navLogin: 'Acceder',
    
    // Dashboard
    dashTitle: 'MI DASHBOARD',
    dashSubtitle: 'Evaluación IA de tu rendimiento atlético.',
    semaforo: 'Semáforo IA',
    optimo: 'ÓPTIMO',
    cargaDetalle: 'Carga óptima • 8h/sem • estrés 4/10.',
    evalTitle: 'EVALUACIÓN IA',
    potencialLabel: 'POTENCIAL ATLÉTICO',
    potencialNivel: 'Local - Intermedio',
    historialChart: 'HISTORIAL',
    cardRegistrar: 'REGISTRAR MARCA',
    labelCategoria: 'Categoría',
    labelValor: 'Valor',
    btnGuardar: 'Guardar',
    alertMarcaGuardada: '¡Marca registrada con éxito!',

    // Subscription
    subTitle: 'SUSCRIPCIÓN Y PAGOS',
    subSubtitle: 'Elige el plan que mejor se adapte a tu nivel.',
    popular: 'MÁS POPULAR',
    payMethods: 'MÉTODOS DE PAGO',
    securePay: 'Transacciones protegidas con cifrado SSL de extremo a extremo. Solo diseño comercial de demostración.',
    btnStartFree: 'Comenzar Gratis',
    btnSubscribe: 'Suscribirme',
    activePlan: 'Plan Activo',

    // Profile Settings
    profileTitle: 'CONFIGURACIÓN DE PERFIL ATLÉTICO',
    catBasicos: 'DATOS BÁSICOS',
    catMedidas: 'MEDIDAS',
    catTiempos: 'TIEMPOS',
    catMental: 'MENTAL',
    lblEdad: 'EDAD',
    lblPais: 'PAÍS',
    lblPosicion: 'POSICIÓN',
    lblAltura: 'ALTURA (CM)',
    lblPeso: 'PESO (KG)',
    lblSprint: '30M (SEG)',
    lblResistencia: 'RESISTENCIA (MIN)',
    lblHorasEquipo: 'HORAS/SEM EQUIPO',
    lblHorasPersonal: 'HORAS/SEM PERSONAL',
    lblTotalHoras: 'TOTAL HORAS/SEMANA',
    lblMetaCorto: 'META CORTO PLAZO',
    lblMetaLargo: 'META LARGO PLAZO',
    lblMotivacion: 'MOTIVACIÓN (1-10)',
    lblEstres: 'ESTRÉS EN PARTIDO (1-10)',
    btnGenerarPlan: 'Generar Plan con IA',

    // Nutrition
    nutriTitle: 'NUTRICIÓN & BIOTIPO IA',
    nutriSubtitle: 'Mifflin-St Jeor x 1.725 - ajustado por posición.',
    planNutri: 'PLAN NUTRICIONAL',
    proteins: 'PROTEINAS',
    carbs: 'CARBOHIDRATOS',
    fats: 'GRASAS',
    restDay: 'Día de Descanso',
    restDayDesc: 'Carbos a 392g (-20%).',
    calculatedMifflin: 'Calculado con Mifflin-St Jeor x 1.725.',

    // About Us
    aboutTitle: 'QUIÉNES SOMOS',
    aboutSubtitle: 'La misión y el propósito detrás de ELIT.',
    aboutGoal: 'NUESTRO PROPÓSITO',
    aboutGoalTitle: 'DEMOCRATIZANDO EL ALTO RENDIMIENTO',
    aboutGoalText1: 'En ELIT, nuestro propósito es democratizar el acceso al entrenamiento de alto rendimiento. Queremos que cualquier futbolista joven, sin importar sus recursos o procedencia, tenga a su disposición un preparador físico y un analista táctico de nivel profesional impulsado por Inteligencia Artificial para alcanzar su máximo potencial.',
    aboutGoalText2: 'El fútbol moderno es altamente físico, táctico y veloz. Muchos talentos se pierden en las ligas juveniles porque no saben cómo entrenar su fuerza según su posición, no gestionan sus fatigas o no reciben correcciones visuales de sus jugadas. ELIT resuelve esto integrando ciencia del deporte, psicología y análisis predictivo en una plataforma automatizada que acompaña al jugador 24/7.',
    inspirationTitle: 'INSPIRACIÓN Y FORTALEZA MENTAL',
    inspirationQuoteTitle: 'LA CORONA QUE DURA PARA SIEMPRE.',
    inspirationQuoteText: '"¿No saben que en una carrera todos los competidores corren, pero solo uno se lleva el premio? Corran, pues, de tal manera que lo ganen. Todos los deportistas se entrenan con mucha disciplina. Ellos lo hacen para obtener una corona que se marchita; nosotros, en cambio, por una corona que dura para siempre." - 1 Corintios 9:24-25 (NVI)',
    inspirationVal1Title: 'CORRE PARA GANAR',
    inspirationVal1Text: 'Cada sesión con propósito, cada sprint con intención. No entrenes para sobrevivir, entrena para dominar.',
    inspirationVal2Title: 'DISCIPLINA DE ÉLITE',
    inspirationVal2Text: 'Los campeones no nacen talentosos. Se forjan en la consistencia diaria cuando nadie está mirando.',
    inspirationVal3Title: 'LA CORONA ETERNA',
    inspirationVal3Text: 'Más allá de los trofeos, tu carácter y tu disciplina son el legado que permanece.',
    coreValues: 'NUESTROS PILARES',
    valCiencia: 'CIENCIA',
    valCienciaDesc: 'Ejercicios basados en evidencia científica del deporte.',
    valIA: 'INTELIGENCIA IA',
    valIADesc: 'Algoritmos que ajustan el plan en tiempo real.',
    valAcceso: 'ACCESO UNIVERSAL',
    valAccesoDesc: 'Disponible en cualquier dispositivo en todo momento.',
    valResultados: 'RESULTADOS REALES',
    valResultadosDesc: 'Historial de progreso real en tiempo real.',

    // Auth screen
    authTitle: 'ELIT - TU CUENTA',
    authSubtitle: 'Regístrate o inicia sesión.',
    tabRegister: 'Registrarse',
    tabLogin: 'Iniciar Sesión',
    lblFullName: 'NOMBRE COMPLETO',
    lblEmail: 'CORREO',
    lblPassword: 'CONTRASEÑA',
    btnCreateFree: 'Crear Cuenta Gratis',
    btnSignIn: 'Iniciar Sesión',
    or: 'or',
    exploreGuest: 'Explorar como Invitado',

    // Calendar & Routines
    calTitle: 'CALENDARIO & RUTINAS',
    calSubtitle: 'Haz clic en cada día para ver y completar tu rutina. Solo puedes confirmar el día de hoy.',
    weeklyProg: 'PROGRESO SEMANAL',
    week: 'Semana',
    confirmRoutine: 'Confirmar Rutina',
    btnRoutineCompleted: '¡Rutina Completada!',
    proximo: 'PRÓXIMO',
    descanso: 'DESCANSO',

    // Success Screen
    routineCompletedHeading: '¡RUTINA COMPLETADA!',
    routineCompletedText: '¡Gran trabajo hoy! Has superado tus límites. Mantén este ritmo y domina el siguiente nivel.',
    logroHeading: '¡LOGRO DESBLOQUEADO!',
    logroText: 'Has completado tu rutina con un rendimiento de Élite. Tu disciplina te acerca a la cima.',
    timeTotal: 'TIEMPO TOTAL',
    calories: 'CALORÍAS',
    intensity: 'INTENSIDAD',
    btnBackCalendar: 'VOLVER AL CALENDARIO',
    shareOn: 'COMPARTIR EN:',

    // Scouting
    subeVideoTitle: 'SUBE TU VIDEO',
    subeVideoDesc: 'Arrastra o clic - MP4, MOV. Análisis avanzado de IA para tu rendimiento.',
    analyzingVideo: 'Analizando video con IA deportiva...',
    analysisDone: 'Análisis IA Completado',
    scoutingTitle: 'SCOUTING CON IA',
    lblVelocidad: 'VELOCIDAD',
    lblTecnica: 'TÉCNICA',
    lblFuerza: 'FUERZA',
    scoutingDetailsVel: ['Aceleración explosiva', 'Velocidad máxima sostenida', 'Mejorar cambios de dirección'],
    scoutingDetailsTec: ['Control del balón preciso', 'Pases efectivos', 'Regate eficiente'],
    scoutingDetailsFue: ['Potencia de salto', 'Resistencia en duelo', 'Aumentar masa muscular'],
    refVideos: 'VIDEOS DE REFERENCIA',
    refVelTitle: 'Técnica de Velocidad',
    refTecTitle: 'Control del Balón Master',
    refFueTitle: 'Entrenamiento de Fuerza'
  },
  EN: {
    brand: 'ELIT',
    slogan: 'Elite Level Intelligence Training',
    plataformaIA: 'SPORTS AI PLATFORM',
    heroButton: 'Get Started Now',
    demoButton: 'Watch Demo',
    
    // Stats
    statPlayers: 'PLAYERS',
    statImprovement: 'IMPROVEMENT',
    statRoutines: 'ROUTINES',
    statPrecision: 'AI PRECISION',
    
    // Nav bar
    navInicio: 'Home',
    navAbout: 'About Us',
    navSuscripcion: 'Subscription',
    navProfile: 'My Profile',
    navDashboard: 'Dashboard',
    navCalendar: 'Calendar',
    navNutrition: 'Nutrition',
    navScouting: 'AI Scouting',
    navLogout: 'Sign Out',
    navLogin: 'Access',
    
    // Dashboard
    dashTitle: 'MY DASHBOARD',
    dashSubtitle: 'AI evaluation of your athletic performance.',
    semaforo: 'AI Traffic Light',
    optimo: 'OPTIMAL',
    cargaDetalle: 'Optimal load • 8h/week • stress 4/10.',
    evalTitle: 'AI EVALUATION',
    potencialLabel: 'ATHLETIC POTENTIAL',
    potencialNivel: 'Local - Intermediate',
    historialChart: 'HISTORY',
    cardRegistrar: 'LOG PR / MARK',
    labelCategoria: 'Category',
    labelValor: 'Value',
    btnGuardar: 'Save',
    alertMarcaGuardada: 'Mark successfully logged!',

    // Subscription
    subTitle: 'SUBSCRIPTION & PAYMENTS',
    subSubtitle: 'Choose the plan that fits your level.',
    popular: 'MOST POPULAR',
    payMethods: 'PAYMENT METHODS',
    securePay: 'Transactions protected with extreme end-to-end SSL encryption. Demonstration draft design only.',
    btnStartFree: 'Get Started Free',
    btnSubscribe: 'Subscribe Now',
    activePlan: 'Active Plan',

    // Profile Settings
    profileTitle: 'ATHLETIC PROFILE CONFIGURATION',
    catBasicos: 'BASIC DATA',
    catMedidas: 'MEASUREMENTS',
    catTiempos: 'TRAINING TIMES',
    catMental: 'MENTAL FOCUS',
    lblEdad: 'AGE',
    lblPais: 'COUNTRY',
    lblPosicion: 'POSITION',
    lblAltura: 'HEIGHT (CM)',
    lblPeso: 'WEIGHT (KG)',
    lblSprint: '30M SPRINT (SEC)',
    lblResistencia: 'STAMINA (MIN)',
    lblHorasEquipo: 'TEAM HOURS/WEEK',
    lblHorasPersonal: 'PERSONAL HOURS/WEEK',
    lblTotalHoras: 'TOTAL HOURS/WEEK',
    lblMetaCorto: 'SHORT TERM GOAL',
    lblMetaLargo: 'LONG TERM GOAL',
    lblMotivacion: 'MOTIVATION (1-10)',
    lblEstres: 'MATCH STRESS (1-10)',
    btnGenerarPlan: 'Generate Plan with AI',

    // Nutrition
    nutriTitle: 'NUTRITION & AI BIOTYPE',
    nutriSubtitle: 'Mifflin-St Jeor x 1.725 - adjusted by position.',
    planNutri: 'NUTRITIONAL PLAN',
    proteins: 'PROTEINS',
    carbs: 'CARBOHYDRATES',
    fats: 'FATS',
    restDay: 'Rest Day',
    restDayDesc: 'Carbs down to 392g (-20%).',
    calculatedMifflin: 'Calculated with Mifflin-St Jeor x 1.725.',

    // About Us
    aboutTitle: 'ABOUT US',
    aboutSubtitle: 'The mission and purpose behind ELIT.',
    aboutGoal: 'OUR PURPOSE',
    aboutGoalTitle: 'DEMOCRATIZING HIGH PERFORMANCE',
    aboutGoalText1: 'At ELIT, our purpose is to democratize access to elite sports training. We want any young football player, regardless of their resources or background, to have a professional physical trainer and an AI-driven tactical analyst at their disposal to reach their peak potential.',
    aboutGoalText2: 'Modern football is highly physical, fast, and tactical. Many young talents fade out in youth academies because they lack structured positional strength training, do not manage fatigue properly, or miss visual analytical reviews of their tactical plays. ELIT remedies this by blending sports science, psychology, and predictive analytics into an automated companion available 24/7.',
    inspirationTitle: 'INSPIRATION AND MENTAL TOUGHNESS',
    inspirationQuoteTitle: 'THE CROWN THAT LASTS FOREVER.',
    inspirationQuoteText: '"Do you not know that in a race all the runners run, but only one gets the prize? Run in such a way as to get it. Everyone who competes in the games goes into strict training. They do it to get a crown that will not last, but we do it to get a crown that will last forever." - 1 Corinthians 9:24-25 (NIV)',
    inspirationVal1Title: 'RUN TO WIN',
    inspirationVal1Text: 'Every session with purpose, every sprint with direct intent. Do not train to survive, train to dominate.',
    inspirationVal2Title: 'ELITE DISCIPLINE',
    inspirationVal2Text: 'Champions are not born talented. They are forged in daily consistency when nobody is looking.',
    inspirationVal3Title: 'THE ETERNAL CROWN',
    inspirationVal3Text: 'Beyond trophies, your character and discipline represent the legacy that endures.',
    coreValues: 'OUR PILLARS',
    valCiencia: 'SCIENCE',
    valCienciaDesc: 'Workouts grounded in peer-reviewed sports science research.',
    valIA: 'AI SYSTEM',
    valIADesc: 'Algorithms that calibrate your schedule in real-time.',
    valAcceso: 'UNIVERSAL ACCESS',
    valAccesoDesc: 'Instantly accessible on all devices at any physical venue.',
    valResultados: 'TRUE OUTCOMES',
    valResultadosDesc: 'Uncompromising recording of historical training markers.',

    // Auth screen
    authTitle: 'ELIT - YOUR ACCOUNT',
    authSubtitle: 'Register or sign in to your profile.',
    tabRegister: 'Register',
    tabLogin: 'Sign In',
    lblFullName: 'FULL NAME',
    lblEmail: 'EMAIL',
    lblPassword: 'PASSWORD',
    btnCreateFree: 'Create Free Account',
    btnSignIn: 'Sign In',
    or: 'or',
    exploreGuest: 'Explore as Guest',

    // Calendar & Routines
    calTitle: 'SCHEDULE & ROUTINES',
    calSubtitle: 'Click on each day to review and complete your routine. You can only confirm today\'s routine.',
    weeklyProg: 'WEEKLY PROGRESS',
    week: 'Week',
    confirmRoutine: 'Confirm Routine',
    btnRoutineCompleted: 'Routine Completed!',
    proximo: 'UPCOMING',
    descanso: 'REST',

    // Success Screen
    routineCompletedHeading: 'ROUTINE COMPLETED!',
    routineCompletedText: 'Great work today! You have pushed past your limits. Keep this momentum and dominate the next session.',
    logroHeading: 'ACHIEVEMENT UNLOCKED!',
    logroText: 'You completed your routine with Elite metrics. Your discipline brings you closer to the absolute top.',
    timeTotal: 'TOTAL TIME',
    calories: 'CALORIES',
    intensity: 'INTENSITY',
    btnBackCalendar: 'RETURN TO CALENDAR',
    shareOn: 'SHARE ON:',

    // Scouting
    subeVideoTitle: 'UPLOAD YOUR VIDEO',
    subeVideoDesc: 'Drag or click - MP4, MOV. Advanced AI visual performance diagnostics.',
    analyzingVideo: 'Analyzing video using sports AI model...',
    analysisDone: 'AI Diagnostic Completed',
    scoutingTitle: 'SCOUTING WITH AI',
    lblVelocidad: 'SPEED',
    lblTecnica: 'TECHNIQUE',
    lblFuerza: 'STRENGTH',
    scoutingDetailsVel: ['Explosive acceleration', 'Sustained top speed', 'Calibrate changes of direction'],
    scoutingDetailsTec: ['Precise ball control', 'High completion pass rates', 'Efficient dribble agility'],
    scoutingDetailsFue: ['Jump and bounce power', 'Uncompromising duel stamina', 'Targeted lean muscle hypertrophy'],
    refVideos: 'REFERENCE CLINICS',
    refVelTitle: 'Speed Mechanics Clinic',
    refTecTitle: 'Ball Control Masterclass',
    refFueTitle: 'Explosive Strength Clinic'
  }
};

export const INITIAL_ATHLETIC_PROFILE: AthleticProfile = {
  edad: 17,
  pais: 'Colombia',
  posicion: 'Volante',
  altura: 178,
  peso: 72,
  sprints30m: 4.1,
  resistencia: '12:30',
  horasEquipo: 12,
  horasPersonal: 6,
  metaCortoPlazo: 'Mejorar mi velocidad y resistencia para el próximo torneo.',
  metaLargoPlazo: 'Ser titular en un equipo profesional en Europa.',
  motivacion: 9,
  estres: 4
};

export const INITIAL_KPI_HISTORY = [
  { mes: 'Ene', velocidad: 54, resistencia: 60, fuerza: 50 },
  { mes: 'Feb', velocidad: 63, resistencia: 65, fuerza: 58 },
  { mes: 'Mar', velocidad: 66, resistencia: 68, fuerza: 61 },
  { mes: 'Abr', velocidad: 73, resistencia: 71, fuerza: 67 },
  { mes: 'May', velocidad: 79, resistencia: 74, fuerza: 71 },
  { mes: 'Jun', velocidad: 84, resistencia: 77, fuerza: 75 },
  { mes: 'Jul', velocidad: 93, resistencia: 82, fuerza: 81 },
  { mes: 'Ago', velocidad: 96, resistencia: 85, fuerza: 84 }
];

export const GENERAL_ROUTINES: DailyRoutine[] = [
  {
    dayNum: 8,
    dayLabel: 'LUN',
    title: 'VELOCIDAD PURA',
    description: 'Sprint • Aceleración • Frecuencia de zancada',
    type: 'VELOCIDAD',
    difficulty: 'ELITE',
    isToday: true,
    completed: false,
    exercises: [
      { id: 'ex1_1', name: 'Calentamiento Dinámico (10 min)', completed: false },
      { id: 'ex1_2', name: 'Sprints 20m (5x)', completed: false },
      { id: 'ex1_3', name: 'Sprints 40m (5x)', completed: false },
      { id: 'ex1_4', name: 'Ejercicios de Técnica (15 min)', completed: false }
    ]
  },
  {
    dayNum: 9,
    dayLabel: 'MAR',
    title: 'RECUPERACIÓN ACTIVA',
    description: 'Descarga muscular y mental planificada',
    type: 'RECUPERACION',
    difficulty: 'DESCANSO',
    completed: false,
    exercises: [
      { id: 'ex2_1', name: 'Trote suave regenerativo (15 min)', completed: false },
      { id: 'ex2_2', name: 'Estiramiento estático guiado (15 min)', completed: false },
      { id: 'ex2_3', name: 'Terapia de contraste agua fría/caliente', completed: false }
    ]
  },
  {
    dayNum: 10,
    dayLabel: 'MIE',
    title: 'FUERZA EXPLOSIVA',
    description: 'Pliometría • Potencia • Cadena posterior',
    type: 'FUERZA',
    difficulty: 'PRO',
    completed: false,
    exercises: [
      { id: 'ex3_1', name: 'Sentadillas con salto explosivo (4x6)', completed: false },
      { id: 'ex3_2', name: 'Prensa con empuje balístico (4x8)', completed: false },
      { id: 'ex3_3', name: 'Zancadas pliométricas alternadas (3x12)', completed: false },
      { id: 'ex3_4', name: 'Abdominales y estabilidad de core (10 min)', completed: false }
    ]
  },
  {
    dayNum: 11,
    dayLabel: 'JUE',
    title: 'RECUPERACIÓN ACTIVA',
    description: 'Descarga muscular y mental planificada',
    type: 'RECUPERACION',
    difficulty: 'DESCANSO',
    completed: false,
    exercises: [
      { id: 'ex4_1', name: 'Movilidad articular general (15 min)', completed: false },
      { id: 'ex4_2', name: 'Rodamiento de espuma en fascia (Foam Roller)', completed: false }
    ]
  },
  {
    dayNum: 12,
    dayLabel: 'VIE',
    title: 'TÉCNICA INDIVIDUAL',
    description: 'Control • Conducción • Biomecánica',
    type: 'TECNICA',
    difficulty: 'PRO',
    completed: false,
    exercises: [
      { id: 'ex5_1', name: 'Control orientado con pared de rebote (100 pases)', completed: false },
      { id: 'ex5_2', name: 'Dribbling slalom entre conos (6 repeticiones)', completed: false },
      { id: 'ex5_3', name: 'Definición a puerta con perfil cambiado (20 tiros)', completed: false }
    ]
  },
  {
    dayNum: 13,
    dayLabel: 'SAB',
    title: 'RECUPERACIÓN ACTIVA',
    description: 'Descarga planificada y paseos reflexivos',
    type: 'RECUPERACION',
    difficulty: 'DESCANSO',
    completed: false,
    exercises: []
  },
  {
    dayNum: 14,
    dayLabel: 'DOM',
    title: 'RECUPERACIÓN ACTIVA',
    description: 'Descarga regenerativa dominical',
    type: 'RECUPERACION',
    difficulty: 'DESCANSO',
    completed: false,
    exercises: []
  }
];

export const REFERENCE_VIDEOS: VideoReference[] = [
  {
    id: 'vid1',
    title: 'Técnica de Velocidad',
    tag: 'VELOCIDAD',
    thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'vid2',
    title: 'Control del Balón Master',
    tag: 'TÉCNICA',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 'vid3',
    title: 'Entrenamiento de Fuerza',
    tag: 'FUERZA',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
];
