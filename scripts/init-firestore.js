// 🔥 Script Simple para Configurar Firestore
// Uso: node scripts/init-firestore.js

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Verificar que las variables de entorno estén configuradas
const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
];

console.log('🔍 Verificando configuración...');
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Variables de entorno faltantes:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.log('\n💡 Configura tu archivo .env con las credenciales de Firebase');
    process.exit(1);
}

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

async function initializeFirestore() {
    try {

        console.log('secret', firebaseConfig);
        // Inicializar Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log(`✅ Conectado a proyecto: ${firebaseConfig.projectId}\n`);

        // 🏛️ Comunidades
        const communities = [
            {
                id: 'politics', name: 'Política Nacional', description: 'Análisis político y gubernamental',
                category: 'news', members: 15420, icon: '🏛️', color: '#2563EB',
                isActive: true, createdAt: new Date().toISOString()
            },
            {
                id: 'economy', name: 'Economía y Finanzas', description: 'Análisis económico y financiero',
                category: 'business', members: 12350, icon: '📊', color: '#059669',
                isActive: true, createdAt: new Date().toISOString()
            },
            {
                id: 'sports', name: 'Deportes', description: 'Noticias deportivas nacionales',
                category: 'sports', members: 18900, icon: '⚽', color: '#DC2626',
                isActive: true, createdAt: new Date().toISOString()
            }
        ];

        console.log('🏛️ Creando comunidades...');
        for (const community of communities) {
            await setDoc(doc(db, 'communities', community.id), {
                ...community,
                followers: [],
                moderators: ['admin_001'],
                updatedAt: new Date().toISOString(),
                settings: { allowComments: true, requireApproval: false, isPublic: true },
                rules: ['Mantener respeto', 'No información falsa'],
                stats: { totalPosts: 0, totalComments: 0, averageVotes: 0 }
            });
            console.log(`   ✅ ${community.name}`);
        }

        // ✍️ Periodistas
        const journalists = [
            {
                id: 'journalist_001', name: 'María González', role: 'Periodista Política',
                email: 'maria@ejemplo.com', isVerified: true, isActive: true
            },
            {
                id: 'journalist_002', name: 'Carlos Mendoza', role: 'Analista Económico',
                email: 'carlos@ejemplo.com', isVerified: true, isActive: true
            }
        ];

        console.log('\n✍️ Creando periodistas...');
        for (const journalist of journalists) {
            await setDoc(doc(db, 'journalists', journalist.id), {
                ...journalist,
                specializations: ['análisis', 'noticias'],
                bio: `Periodista profesional especializado en ${journalist.role.toLowerCase()}`,
                avatar: null,
                joinDate: new Date().toISOString(),
                credentials: { university: 'Universidad Nacional', experience: 10 },
                permissions: { canPublish: true, canModerate: false, communities: ['politics', 'economy'] },
                stats: { totalPosts: 0, totalViews: 0, averageVotes: 0, followerCount: 0 }
            });
            console.log(`   ✅ ${journalist.name}`);
        }

        // 📰 Posts de ejemplo
        console.log('\n📰 Creando posts de ejemplo...');
        await setDoc(doc(db, 'posts', 'post_001'), {
            id: 'post_001',
            title: 'Análisis Político: Reformas en Debate',
            content: 'El Congreso inicia debates sobre reformas importantes que afectarán al sistema electoral y medidas de transparencia gubernamental.',
            summary: 'Reformas electorales y transparencia en debate congressional.',
            author: 'María González',
            authorId: 'journalist_001',
            authorVerified: true,
            community: 'Política Nacional',
            communityId: 'politics',
            createdAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            isPublished: true,
            votes: 45,
            tags: ['política', 'reformas', 'congreso'],
            engagement: { views: 1250, shares: 23, bookmarks: 67, commentsCount: 12 }
        });

        await setDoc(doc(db, 'posts', 'post_002'), {
            id: 'post_002',
            title: 'Indicadores Económicos: Análisis Semanal',
            content: 'Los indicadores muestran estabilidad en inflación pero volatilidad cambiaria por factores externos.',
            summary: 'Inflación estable, volatilidad en tipo de cambio.',
            author: 'Carlos Mendoza',
            authorId: 'journalist_002',
            authorVerified: true,
            community: 'Economía y Finanzas',
            communityId: 'economy',
            createdAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            isPublished: true,
            votes: 32,
            tags: ['economía', 'mercados', 'análisis'],
            engagement: { views: 890, shares: 15, bookmarks: 34, commentsCount: 8 }
        });
        console.log('   ✅ 2 posts de ejemplo creados');

        // 📁 Estructuras base
        console.log('\n📁 Inicializando estructura base...');
        await setDoc(doc(db, 'users', '_init'), { _placeholder: true, createdAt: new Date().toISOString() });
        await setDoc(doc(db, 'votes', '_init'), { _placeholder: true, createdAt: new Date().toISOString() });
        await setDoc(doc(db, 'analytics', '_init'), { _placeholder: true, createdAt: new Date().toISOString() });
        console.log('   ✅ Colecciones base inicializadas');

        console.log('\n🎉 ¡Firestore configurado exitosamente!');
        console.log('📊 Datos creados:');
        console.log('   - 3 Comunidades');
        console.log('   - 2 Periodistas');
        console.log('   - 2 Posts de ejemplo');
        console.log('   - Estructura base de colecciones');

        console.log('\n🔗 Próximos pasos:');
        console.log('   1. Ve a https://console.firebase.google.com');
        console.log(`   2. Selecciona tu proyecto: ${firebaseConfig.projectId}`);
        console.log('   3. Ve a Firestore Database para ver los datos');
        console.log('   4. Ejecuta: npm run dev');

    } catch (error) {
        console.error('\n❌ Error:', error.message);

        if (error.code === 'permission-denied') {
            console.log('💡 Solución: Configura reglas de Firestore para permitir escritura');
        } else if (error.code === 'unauthenticated') {
            console.log('💡 Solución: Revisa la configuración de autenticación');
        }
    }
}

// Ejecutar
initializeFirestore();
