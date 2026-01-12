#!/usr/bin/env node
// 🔥 Script para configurar Firestore desde cero
// Ejecutar con: node scripts/setup-firestore.js

import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    connectFirestoreEmulator,
    enableNetwork,
    disableNetwork
} from 'firebase/firestore';

// 📋 Configuración Firebase (reemplaza con tus valores reales)
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🏛️ Datos de Comunidades
const communities = [
    {
        id: 'politics',
        name: 'Política Nacional',
        description: 'Análisis político y gubernamental del país',
        category: 'news',
        members: 15420,
        followers: [],
        moderators: ['admin_001'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        settings: { allowComments: true, requireApproval: false, isPublic: true },
        rules: ['Mantener respeto en las discusiones', 'No publicar información falsa'],
        icon: '🏛️',
        color: '#2563EB',
        stats: { totalPosts: 0, totalComments: 0, averageVotes: 0 }
    },
    {
        id: 'economy',
        name: 'Economía y Finanzas',
        description: 'Análisis económico y tendencias financieras',
        category: 'business',
        members: 12350,
        followers: [],
        moderators: ['admin_001'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        settings: { allowComments: true, requireApproval: false, isPublic: true },
        rules: ['Basarse en datos verificables', 'Distinguir entre análisis y opinión'],
        icon: '📊',
        color: '#059669',
        stats: { totalPosts: 0, totalComments: 0, averageVotes: 0 }
    },
    {
        id: 'sports',
        name: 'Deportes',
        description: 'Noticias deportivas nacionales e internacionales',
        category: 'sports',
        members: 18900,
        followers: [],
        moderators: ['admin_001'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        settings: { allowComments: true, requireApproval: false, isPublic: true },
        rules: ['Respetar a todos los equipos', 'Evitar lenguaje ofensivo'],
        icon: '⚽',
        color: '#DC2626',
        stats: { totalPosts: 0, totalComments: 0, averageVotes: 0 }
    }
];

// ✍️ Datos de Periodistas
const journalists = [
    {
        id: 'journalist_001',
        name: 'María González',
        email: 'maria.gonzalez@example.com',
        role: 'Periodista Política',
        specializations: ['política', 'gobierno', 'análisis'],
        bio: 'Periodista con 15 años de experiencia en cobertura política',
        avatar: null,
        isVerified: true,
        isActive: true,
        joinDate: new Date().toISOString(),
        credentials: {
            university: 'Universidad de Periodismo',
            certifications: ['Diploma en Periodismo Político'],
            experience: 15
        },
        social: { twitter: '@mariagonzalez', linkedin: 'maria-gonzalez' },
        permissions: { canPublish: true, canModerate: false, communities: ['politics'] },
        stats: { totalPosts: 0, totalViews: 0, averageVotes: 0, followerCount: 0 }
    },
    {
        id: 'journalist_002',
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@example.com',
        role: 'Analista Económico',
        specializations: ['economía', 'finanzas', 'mercados'],
        bio: 'Especialista en análisis económico con maestría en Finanzas',
        avatar: null,
        isVerified: true,
        isActive: true,
        joinDate: new Date().toISOString(),
        credentials: {
            university: 'Universidad Económica Nacional',
            certifications: ['MBA en Finanzas'],
            experience: 12
        },
        social: { twitter: '@carlosmendoza', linkedin: 'carlos-mendoza' },
        permissions: { canPublish: true, canModerate: false, communities: ['economy'] },
        stats: { totalPosts: 0, totalViews: 0, averageVotes: 0, followerCount: 0 }
    }
];

// 📰 Posts de ejemplo
const samplePosts = [
    {
        id: 'post_001',
        title: 'Análisis: Nuevas reformas legislativas en debate',
        content: 'El Congreso ha iniciado el debate sobre un paquete de reformas que incluyen modificaciones al código electoral y nuevas medidas de transparencia. Este análisis examina las principales propuestas y su impacto potencial en el sistema democrático.',
        summary: 'El Congreso debate reformas electorales y de transparencia con impacto significativo.',
        author: 'María González',
        authorRole: 'Periodista Política',
        authorId: 'journalist_001',
        authorVerified: true,
        community: 'Política Nacional',
        communityId: 'politics',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        isPublished: true,
        isDraft: false,
        votes: 45,
        upvotes: [],
        downvotes: [],
        tags: ['política', 'reformas', 'congreso', 'transparencia'],
        media: { images: [], videos: [], documents: [] },
        engagement: { views: 1250, shares: 23, bookmarks: 67, commentsCount: 12 },
        source: { originalUrl: null, publication: 'El Foro 514' }
    },
    {
        id: 'post_002',
        title: 'Mercados: Análisis semanal de indicadores económicos',
        content: 'Los principales indicadores económicos muestran señales mixtas esta semana. Mientras la inflación se mantiene estable, el tipo de cambio presenta volatilidad debido a factores externos. Analizamos las perspectivas para los próximos meses.',
        summary: 'Indicadores económicos mixtos con inflación estable pero volatilidad cambiaria.',
        author: 'Carlos Mendoza',
        authorRole: 'Analista Económico',
        authorId: 'journalist_002',
        authorVerified: true,
        community: 'Economía y Finanzas',
        communityId: 'economy',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        isPublished: true,
        isDraft: false,
        votes: 32,
        upvotes: [],
        downvotes: [],
        tags: ['economía', 'mercados', 'inflación', 'análisis'],
        media: { images: [], videos: [], documents: [] },
        engagement: { views: 890, shares: 15, bookmarks: 34, commentsCount: 8 },
        source: { originalUrl: null, publication: 'El Foro 514' }
    }
];

// 🚀 Función principal de configuración
async function setupFirestore() {
    try {
        console.log('🔄 Iniciando configuración de Firestore...\n');

        // Verificar conexión
        console.log('📡 Verificando conexión con Firebase...');
        await enableNetwork(db);
        console.log('✅ Conectado a Firebase\n');

        // 1. Crear Comunidades
        console.log('🏛️ Creando comunidades...');
        for (const community of communities) {
            await setDoc(doc(db, 'communities', community.id), community);
            console.log(`   ✅ ${community.name}`);
        }
        console.log(`✨ ${communities.length} comunidades creadas\n`);

        // 2. Crear Periodistas
        console.log('✍️ Creando periodistas...');
        for (const journalist of journalists) {
            await setDoc(doc(db, 'journalists', journalist.id), journalist);
            console.log(`   ✅ ${journalist.name} (${journalist.role})`);
        }
        console.log(`✨ ${journalists.length} periodistas creados\n`);

        // 3. Crear Posts de Ejemplo
        console.log('📰 Creando posts de ejemplo...');
        for (const post of samplePosts) {
            await setDoc(doc(db, 'posts', post.id), post);
            console.log(`   ✅ ${post.title.substring(0, 50)}...`);
        }
        console.log(`✨ ${samplePosts.length} posts creados\n`);

        // 4. Crear colecciones vacías con documentos placeholder
        console.log('📁 Creando estructura de colecciones...');

        // Users placeholder
        await setDoc(doc(db, 'users', '_placeholder'), {
            _isPlaceholder: true,
            createdAt: new Date().toISOString()
        });
        console.log('   ✅ Colección users inicializada');

        // Votes placeholder
        await setDoc(doc(db, 'votes', '_placeholder'), {
            _isPlaceholder: true,
            createdAt: new Date().toISOString()
        });
        console.log('   ✅ Colección votes inicializada');

        // Analytics placeholder
        await setDoc(doc(db, 'analytics', '_placeholder'), {
            _isPlaceholder: true,
            createdAt: new Date().toISOString()
        });
        console.log('   ✅ Colección analytics inicializada');

        console.log('\n🎉 ¡Firestore configurado exitosamente!');
        console.log('📊 Datos creados:');
        console.log(`   - ${communities.length} Comunidades`);
        console.log(`   - ${journalists.length} Periodistas`);
        console.log(`   - ${samplePosts.length} Posts de ejemplo`);
        console.log('   - Estructura de colecciones base');

        console.log('\n🔗 Próximos pasos:');
        console.log('   1. Ve a Firebase Console para verificar los datos');
        console.log('   2. Configura las reglas de seguridad');
        console.log('   3. Crea los índices compuestos necesarios');
        console.log('   4. Inicia tu aplicación con: npm run dev');

    } catch (error) {
        console.error('❌ Error configurando Firestore:', error);

        if (error.code === 'permission-denied') {
            console.log('\n💡 Solución: Verifica que las reglas de Firestore permitan escritura');
        } else if (error.code === 'unauthenticated') {
            console.log('\n💡 Solución: Configura la autenticación o ajusta las reglas de seguridad');
        }

        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    setupFirestore();
}

export { setupFirestore };
