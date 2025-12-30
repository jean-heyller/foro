import { Users, TrendingUp, Award } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  members: number;
  isFollowing: boolean;
}

const followedCommunities: Community[] = [
  { id: '1', name: 'Política Nacional', members: 15420, isFollowing: true },
  { id: '2', name: 'Economía y Finanzas', members: 12350, isFollowing: true },
  { id: '3', name: 'Deportes', members: 18900, isFollowing: true },
  { id: '4', name: 'Cultura y Sociedad', members: 9870, isFollowing: true },
];

const popularCommunities: Community[] = [
  { id: '5', name: 'Tecnología', members: 22450, isFollowing: false },
  { id: '6', name: 'Internacional', members: 19800, isFollowing: false },
  { id: '7', name: 'Salud', members: 16200, isFollowing: false },
  { id: '8', name: 'Medio Ambiente', members: 14300, isFollowing: false },
];

const topPosts = [
  { id: '1', title: 'Nuevas políticas económicas anunciadas', votes: 1247 },
  { id: '2', title: 'Análisis de las últimas elecciones', votes: 1189 },
  { id: '3', title: 'Impacto del cambio climático en el país', votes: 1045 },
];

export function Sidebar() {
  return (
    <aside className="w-80 border-r border-blue-200 min-h-screen bg-white sticky top-16 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="p-6 space-y-8">
        {/* Comunidades que sigue */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-blue-900">Mis Comunidades</h2>
          </div>
          <div className="space-y-2">
            {followedCommunities.map((community) => (
              <div
                key={community.id}
                className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-blue-100"
              >
                <div className="flex justify-between items-start">
                  <span className="text-gray-800">{community.name}</span>
                </div>
                <span className="text-gray-500 text-sm">{community.members.toLocaleString()} miembros</span>
              </div>
            ))}
          </div>
        </section>

        {/* Comunidades populares */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-blue-900">Comunidades Populares</h2>
          </div>
          <div className="space-y-2">
            {popularCommunities.map((community) => (
              <div
                key={community.id}
                className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-blue-100"
              >
                <div className="flex justify-between items-start">
                  <span className="text-gray-800">{community.name}</span>
                  <button className="text-blue-600 text-sm hover:text-blue-800">Seguir</button>
                </div>
                <span className="text-gray-500 text-sm">{community.members.toLocaleString()} miembros</span>
              </div>
            ))}
          </div>
        </section>

        {/* Publicaciones más votadas */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-600" />
            <h2 className="text-blue-900">Más Votadas</h2>
          </div>
          <div className="space-y-2">
            {topPosts.map((post) => (
              <div
                key={post.id}
                className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-blue-100"
              >
                <p className="text-gray-800 text-sm mb-1">{post.title}</p>
                <div className="flex items-center gap-1 text-blue-600">
                  <span className="text-sm">{post.votes} votos</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
