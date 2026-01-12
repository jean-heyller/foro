import { Users, TrendingUp, Award } from "lucide-react";
import { useCommunities, usePosts } from "../context/AppContext";

export function Sidebar() {
  const {
    followedCommunities,
    popularCommunities,
    isLoading: communitiesLoading,
    followCommunity,
    unfollowCommunity,
  } = useCommunities();

  const { posts } = usePosts();

  // Obtener posts más votados
  const topPosts = posts
    .filter((post) => post.votes > 0)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  const handleFollowToggle = async (
    communityId: string,
    isFollowing: boolean
  ) => {
    if (isFollowing) {
      await unfollowCommunity(communityId);
    } else {
      await followCommunity(communityId);
    }
  };

  return (
    <aside
      className="w-80 border-r border-blue-200 min-h-screen bg-white sticky top-16 overflow-y-auto"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="p-6 space-y-8">
        {/* Comunidades que sigue el usuario */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-blue-900">
              Mis Comunidades
            </h2>
          </div>

          {communitiesLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-gray-100 animate-pulse"
                >
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : followedCommunities.length > 0 ? (
            <div className="space-y-2">
              {followedCommunities.map((community) => (
                <div
                  key={community.id}
                  className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-blue-100"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-gray-800 font-medium">
                      {community.name}
                    </span>
                    <button
                      onClick={() => handleFollowToggle(community.id, true)}
                      className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                    >
                      Siguiendo
                    </button>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {community.members.toLocaleString()} miembros
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No sigues ninguna comunidad aún
            </p>
          )}
        </section>

        {/* Comunidades populares */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-blue-900">
              Comunidades Populares
            </h2>
          </div>

          {communitiesLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-gray-100 animate-pulse"
                >
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {popularCommunities.map((community) => (
                <div
                  key={community.id}
                  className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-blue-100"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-gray-800 font-medium">
                      {community.name}
                    </span>
                    <button
                      onClick={() => handleFollowToggle(community.id, false)}
                      className="text-blue-600 text-sm hover:text-blue-800 transition-colors px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                    >
                      Seguir
                    </button>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {community.members.toLocaleString()} miembros
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Publicaciones más votadas */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-blue-900">Más Votadas</h2>
          </div>

          {topPosts.length > 0 ? (
            <div className="space-y-2">
              {topPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors border border-blue-100"
                >
                  <p className="text-gray-800 text-sm mb-1 line-clamp-2">
                    {post.title}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.community}</span>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Award className="w-3 h-3" />
                      <span>{post.votes} votos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No hay posts votados disponibles
            </p>
          )}
        </section>
      </div>
    </aside>
  );
}
