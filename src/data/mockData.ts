import { Post, Community, User } from "../types";

// Datos mock para fallback cuando Firebase no esté disponible
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Análisis: Nuevas reformas legislativas en debate",
    content:
      "El Congreso ha iniciado el debate sobre un paquete de reformas que podría cambiar significativamente el panorama político del país. Los principales puntos incluyen modificaciones al sistema electoral y nuevas regulaciones para la transparencia gubernamental. Los expertos señalan que estas reformas representan un cambio fundamental en la estructura democrática del país.",
    author: "María González",
    authorRole: "Periodista Política",
    authorId: "author_1",
    community: "Política Nacional",
    communityId: "politics",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    votes: 847,
    upvotes: [],
    downvotes: [],
    comments: [],
    isPublished: true,
    tags: ["política", "reformas", "congreso"],
  },
  {
    id: "2",
    title: "Perspectivas económicas para el próximo trimestre",
    content:
      "Los indicadores económicos muestran señales mixtas para los próximos meses. Mientras la inflación muestra signos de desaceleración, el crecimiento del PIB se mantiene por debajo de las proyecciones iniciales. Los analistas debaten sobre las medidas necesarias para impulsar la recuperación económica en el contexto actual.",
    author: "Carlos Mendoza",
    authorRole: "Analista Económico",
    authorId: "author_2",
    community: "Economía y Finanzas",
    communityId: "economy",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    votes: 623,
    upvotes: [],
    downvotes: [],
    comments: [],
    isPublished: true,
    tags: ["economía", "análisis", "PIB", "inflación"],
  },
  {
    id: "3",
    title: "Selección nacional se prepara para eliminatorias",
    content:
      "La selección nacional de fútbol ha comenzado su concentración de cara a los próximos partidos eliminatorios. El entrenador ha convocado a varias figuras emergentes que prometen dar un nuevo aire al equipo. Los aficionados mantienen altas expectativas tras los buenos resultados en los últimos amistosos internacionales.",
    author: "Ana Rodríguez",
    authorRole: "Reportera Deportiva",
    authorId: "author_3",
    community: "Deportes",
    communityId: "sports",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    votes: 1034,
    upvotes: [],
    downvotes: [],
    comments: [],
    isPublished: true,
    tags: ["fútbol", "selección", "eliminatorias"],
  },
  {
    id: "4",
    title: "Festival de arte contemporáneo abre sus puertas",
    content:
      "El festival anual de arte contemporáneo ha inaugurado su edición 2026 con más de 200 artistas nacionales e internacionales. La muestra incluye instalaciones interactivas, performances y exposiciones que reflexionan sobre temas sociales actuales. Este año el evento tiene un enfoque especial en la sostenibilidad y el cambio climático.",
    author: "Luis Fernández",
    authorRole: "Corresponsal Cultural",
    authorId: "author_4",
    community: "Cultura y Sociedad",
    communityId: "culture",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 horas atrás
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    votes: 445,
    upvotes: [],
    downvotes: [],
    comments: [],
    isPublished: true,
    tags: ["arte", "cultura", "festival", "sostenibilidad"],
  },
  {
    id: "5",
    title: "Informe especial: Transparencia en contrataciones públicas",
    content:
      "Una investigación de varios meses revela inconsistencias en el proceso de contrataciones públicas de diversos organismos estatales. Los datos obtenidos a través de solicitudes de información pública muestran patrones que requieren mayor escrutinio. El informe será presentado ante las autoridades correspondientes para su revisión.",
    author: "Patricia Vargas",
    authorRole: "Periodista de Investigación",
    authorId: "author_5",
    community: "Política Nacional",
    communityId: "politics",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 horas atrás
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    votes: 956,
    upvotes: [],
    downvotes: [],
    comments: [],
    isPublished: true,
    tags: ["investigación", "transparencia", "contrataciones"],
  },
];

export const mockCommunities: Community[] = [
  {
    id: "politics",
    name: "Política Nacional",
    description: "Análisis y discusión sobre temas políticos del país",
    members: 15420,
    followers: [],
    moderators: ["mod_1"],
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: "economy",
    name: "Economía y Finanzas",
    description: "Perspectivas económicas y análisis financiero",
    members: 12350,
    followers: [],
    moderators: ["mod_2"],
    createdAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: "sports",
    name: "Deportes",
    description: "Noticias y análisis deportivo nacional e internacional",
    members: 18900,
    followers: [],
    moderators: ["mod_3"],
    createdAt: new Date("2024-02-01"),
    isActive: true,
  },
  {
    id: "culture",
    name: "Cultura y Sociedad",
    description: "Arte, cultura y temas sociales relevantes",
    members: 9870,
    followers: [],
    moderators: ["mod_4"],
    createdAt: new Date("2024-02-15"),
    isActive: true,
  },
  {
    id: "technology",
    name: "Tecnología",
    description: "Innovación tecnológica y transformación digital",
    members: 22450,
    followers: [],
    moderators: ["mod_5"],
    createdAt: new Date("2024-03-01"),
    isActive: true,
  },
  {
    id: "international",
    name: "Internacional",
    description: "Noticias y análisis de política internacional",
    members: 19800,
    followers: [],
    moderators: ["mod_6"],
    createdAt: new Date("2024-03-15"),
    isActive: true,
  },
  {
    id: "health",
    name: "Salud",
    description: "Información sobre salud pública y medicina",
    members: 16200,
    followers: [],
    moderators: ["mod_7"],
    createdAt: new Date("2024-04-01"),
    isActive: true,
  },
  {
    id: "environment",
    name: "Medio Ambiente",
    description: "Sostenibilidad, cambio climático y ecología",
    members: 14300,
    followers: [],
    moderators: ["mod_8"],
    createdAt: new Date("2024-04-15"),
    isActive: true,
  },
];

// Función para generar usuarios anónimos
export const generateAnonymousUser = (): Omit<User, "id"> => {
  const adjectives = [
    "Curioso",
    "Informado",
    "Activo",
    "Crítico",
    "Analítico",
    "Pensante",
    "Observador",
    "Reflexivo",
  ];
  const nouns = [
    "Lector",
    "Ciudadano",
    "Seguidor",
    "Usuario",
    "Miembro",
    "Participante",
    "Comentarista",
  ];
  const colors = [
    "#3B82F6",
    "#2563EB",
    "#1D4ED8",
    "#60A5FA",
    "#93C5FD",
    "#1E40AF",
    "#3730A3",
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 9999);
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    username: `${adjective}${noun}${number}`,
    avatarColor: color,
    isAnonymous: true,
    followedCommunities: [],
    joinDate: new Date(),
    notifications: [],
  };
};
