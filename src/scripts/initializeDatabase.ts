import { db } from "../config/firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

// Script para inicializar Firestore con datos base
export async function initializeFirebaseData() {
  console.log("🔄 Inicializando base de datos Firestore...");

  try {
    // 1. Crear comunidades base
    const communities = [
      {
        id: "politics",
        name: "Política Nacional",
        description: "Análisis político y gubernamental del país",
        category: "news",
        members: 15420,
        followers: [],
        moderators: ["admin_001"],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        settings: {
          allowComments: true,
          requireApproval: false,
          isPublic: true,
        },
        rules: [
          "Mantener respeto en las discusiones",
          "No publicar información falsa",
          "Citar fuentes cuando sea posible",
        ],
        icon: "🏛️",
        color: "#2563EB",
        stats: {
          totalPosts: 0,
          totalComments: 0,
          averageVotes: 0,
        },
      },
      {
        id: "economy",
        name: "Economía y Finanzas",
        description: "Análisis económico y tendencias financieras",
        category: "business",
        members: 12350,
        followers: [],
        moderators: ["admin_001"],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        settings: {
          allowComments: true,
          requireApproval: false,
          isPublic: true,
        },
        rules: [
          "Basarse en datos verificables",
          "Distinguir entre análisis y opinión",
          "Evitar consejos financieros personales",
        ],
        icon: "📊",
        color: "#059669",
        stats: {
          totalPosts: 0,
          totalComments: 0,
          averageVotes: 0,
        },
      },
      {
        id: "sports",
        name: "Deportes",
        description: "Noticias deportivas nacionales e internacionales",
        category: "sports",
        members: 18900,
        followers: [],
        moderators: ["admin_001"],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        settings: {
          allowComments: true,
          requireApproval: false,
          isPublic: true,
        },
        rules: [
          "Respetar a todos los equipos y atletas",
          "Evitar lenguaje ofensivo",
          "Verificar estadísticas y resultados",
        ],
        icon: "⚽",
        color: "#DC2626",
        stats: {
          totalPosts: 0,
          totalComments: 0,
          averageVotes: 0,
        },
      },
      {
        id: "culture",
        name: "Cultura y Sociedad",
        description: "Arte, cultura y temas sociales relevantes",
        category: "culture",
        members: 9870,
        followers: [],
        moderators: ["admin_001"],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        settings: {
          allowComments: true,
          requireApproval: false,
          isPublic: true,
        },
        rules: [
          "Promover diversidad cultural",
          "Respetar diferentes perspectivas",
          "Citar fuentes culturales apropiadas",
        ],
        icon: "🎭",
        color: "#7C3AED",
        stats: {
          totalPosts: 0,
          totalComments: 0,
          averageVotes: 0,
        },
      },
    ];

    // Crear comunidades en Firestore
    for (const community of communities) {
      await setDoc(doc(db, "communities", community.id), community);
      console.log(`✅ Comunidad creada: ${community.name}`);
    }

    // 2. Crear periodistas base
    const journalists = [
      {
        id: "journalist_001",
        name: "María González",
        email: "maria.gonzalez@example.com",
        role: "Periodista Política",
        specializations: ["política", "gobierno", "análisis"],
        bio: "Periodista con 15 años de experiencia en cobertura política",
        avatar: null,
        isVerified: true,
        isActive: true,
        joinDate: Timestamp.now(),
        credentials: {
          university: "Universidad de Periodismo",
          certifications: ["Diploma en Periodismo Político"],
          experience: 15,
        },
        social: {
          twitter: "@mariagonzalez",
          linkedin: "maria-gonzalez",
        },
        permissions: {
          canPublish: true,
          canModerate: false,
          communities: ["politics", "economy"],
        },
        stats: {
          totalPosts: 0,
          totalViews: 0,
          averageVotes: 0,
          followerCount: 0,
        },
      },
      {
        id: "journalist_002",
        name: "Carlos Mendoza",
        email: "carlos.mendoza@example.com",
        role: "Analista Económico",
        specializations: ["economía", "finanzas", "mercados"],
        bio: "Especialista en análisis económico con maestría en Finanzas",
        avatar: null,
        isVerified: true,
        isActive: true,
        joinDate: Timestamp.now(),
        credentials: {
          university: "Universidad Económica Nacional",
          certifications: ["MBA en Finanzas", "CFA"],
          experience: 12,
        },
        social: {
          twitter: "@carlosmendoza",
          linkedin: "carlos-mendoza-eco",
        },
        permissions: {
          canPublish: true,
          canModerate: false,
          communities: ["economy", "politics"],
        },
        stats: {
          totalPosts: 0,
          totalViews: 0,
          averageVotes: 0,
          followerCount: 0,
        },
      },
      {
        id: "journalist_003",
        name: "Ana Rodríguez",
        email: "ana.rodriguez@example.com",
        role: "Reportera Deportiva",
        specializations: ["fútbol", "olimpicos", "deportes nacionales"],
        bio: "Reportera deportiva especializada en fútbol nacional e internacional",
        avatar: null,
        isVerified: true,
        isActive: true,
        joinDate: Timestamp.now(),
        credentials: {
          university: "Instituto de Comunicación Deportiva",
          certifications: ["Especialización en Periodismo Deportivo"],
          experience: 8,
        },
        social: {
          twitter: "@anarodriguez",
          linkedin: "ana-rodriguez-deportes",
        },
        permissions: {
          canPublish: true,
          canModerate: false,
          communities: ["sports"],
        },
        stats: {
          totalPosts: 0,
          totalViews: 0,
          averageVotes: 0,
          followerCount: 0,
        },
      },
    ];

    // Crear periodistas en Firestore
    for (const journalist of journalists) {
      await setDoc(doc(db, "journalists", journalist.id), journalist);
      console.log(`✅ Periodista creado: ${journalist.name}`);
    }

    // 3. Crear posts de ejemplo
    const samplePosts = [
      {
        id: "post_001",
        title: "Análisis: Nuevas reformas legislativas en debate",
        content:
          "El Congreso ha iniciado el debate sobre un paquete de reformas que podría cambiar significativamente el panorama político del país. Los principales puntos incluyen modificaciones al sistema electoral y nuevas regulaciones para la transparencia gubernamental. Los expertos señalan que estas reformas representan un cambio fundamental en la estructura democrática del país, con implicaciones que se extenderán por décadas.",
        summary:
          "El Congreso debate reformas que cambiarán el panorama político nacional con modificaciones al sistema electoral.",
        author: "María González",
        authorRole: "Periodista Política",
        authorId: "journalist_001",
        authorVerified: true,
        community: "Política Nacional",
        communityId: "politics",
        createdAt: Timestamp.fromDate(
          new Date(Date.now() - 2 * 60 * 60 * 1000)
        ),
        updatedAt: Timestamp.fromDate(
          new Date(Date.now() - 2 * 60 * 60 * 1000)
        ),
        publishedAt: Timestamp.fromDate(
          new Date(Date.now() - 2 * 60 * 60 * 1000)
        ),
        isPublished: true,
        isDraft: false,
        votes: 847,
        upvotes: [],
        downvotes: [],
        tags: ["política", "reformas", "congreso", "legislación"],
        media: {
          images: [],
          videos: [],
          documents: [],
        },
        seo: {
          metaTitle: "Nuevas reformas legislativas: análisis completo",
          metaDescription:
            "Análisis detallado de las reformas legislativas en debate en el Congreso",
          slug: "nuevas-reformas-legislativas-debate",
        },
        engagement: {
          views: 5430,
          shares: 89,
          bookmarks: 156,
          commentsCount: 0,
        },
        source: {
          originalUrl: null,
          publication: "El Foro 514",
        },
      },
      {
        id: "post_002",
        title: "Perspectivas económicas para el próximo trimestre",
        content:
          "Los indicadores económicos muestran señales mixtas para los próximos meses. Mientras la inflación muestra signos de desaceleración, el crecimiento del PIB se mantiene por debajo de las proyecciones iniciales. Los analistas debaten sobre las medidas necesarias para impulsar la recuperación económica en el contexto actual, considerando factores tanto internos como externos que afectan la estabilidad financiera.",
        summary:
          "Análisis de indicadores económicos muestra señales mixtas con inflación desacelerando pero PIB bajo proyecciones.",
        author: "Carlos Mendoza",
        authorRole: "Analista Económico",
        authorId: "journalist_002",
        authorVerified: true,
        community: "Economía y Finanzas",
        communityId: "economy",
        createdAt: Timestamp.fromDate(
          new Date(Date.now() - 4 * 60 * 60 * 1000)
        ),
        updatedAt: Timestamp.fromDate(
          new Date(Date.now() - 4 * 60 * 60 * 1000)
        ),
        publishedAt: Timestamp.fromDate(
          new Date(Date.now() - 4 * 60 * 60 * 1000)
        ),
        isPublished: true,
        isDraft: false,
        votes: 623,
        upvotes: [],
        downvotes: [],
        tags: ["economía", "análisis", "PIB", "inflación"],
        media: {
          images: [],
          videos: [],
          documents: [],
        },
        seo: {
          metaTitle: "Perspectivas económicas próximo trimestre",
          metaDescription:
            "Análisis de indicadores económicos y perspectivas para los próximos meses",
          slug: "perspectivas-economicas-proximo-trimestre",
        },
        engagement: {
          views: 3240,
          shares: 45,
          bookmarks: 98,
          commentsCount: 0,
        },
        source: {
          originalUrl: null,
          publication: "El Foro 514",
        },
      },
    ];

    // Crear posts en Firestore
    for (const post of samplePosts) {
      await setDoc(doc(db, "posts", post.id), post);
      console.log(`✅ Post creado: ${post.title}`);
    }

    console.log("🎉 ¡Base de datos inicializada correctamente!");
    console.log("📝 Datos creados:");
    console.log(`   - ${communities.length} comunidades`);
    console.log(`   - ${journalists.length} periodistas`);
    console.log(`   - ${samplePosts.length} posts de ejemplo`);

    return {
      success: true,
      message: "Base de datos inicializada correctamente",
      data: {
        communities: communities.length,
        journalists: journalists.length,
        posts: samplePosts.length,
      },
    };
  } catch (error) {
    console.error("❌ Error inicializando base de datos:", error);
    return {
      success: false,
      message: "Error al inicializar base de datos",
      error: error,
    };
  }
}

// Función para resetear la base de datos (CUIDADO: Borra todos los datos)
export async function resetFirebaseData() {
  console.log("⚠️  RESETENDO base de datos...");

  // Esta función requeriría implementación adicional para borrar colecciones
  // Por seguridad, no se incluye la implementación automática

  console.log("🔄 Para resetear manualmente, ve a Firebase Console");
  console.log("   1. Firestore Database > Data");
  console.log("   2. Elimina las colecciones que desees");
  console.log("   3. Ejecuta initializeFirebaseData() nuevamente");
}

// Función de utilidad para verificar conexión
export async function testFirebaseConnection() {
  try {
    // Intentar leer una colección simple
    const testDoc = await doc(db, "test", "connection").get();
    console.log("✅ Conexión a Firebase exitosa");
    return true;
  } catch (error) {
    console.error("❌ Error de conexión a Firebase:", error);
    return false;
  }
}
