import { useEffect } from "react";
import { Post } from "./Post";
import { FirebaseStatus } from "./FirebaseStatus";
import { usePosts } from "../context/AppContext";

interface PostFeedProps {
  searchQuery: string;
}

export function PostFeed({ searchQuery }: PostFeedProps) {
  const { posts, isLoading, searchPosts } = usePosts();

  // Realizar búsqueda cuando cambie el query
  useEffect(() => {
    searchPosts(searchQuery);
  }, [searchQuery, searchPosts]);

  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-6">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-blue-200 rounded-lg p-6 animate-pulse"
              >
                <div className="flex">
                  <div className="w-16 bg-gray-200 rounded mr-4">
                    <div className="h-20"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Indicador de estado Firebase */}
        <FirebaseStatus />

        {/* Header del feed */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {searchQuery
              ? `Resultados para "${searchQuery}"`
              : "Publicaciones Recientes"}
          </h2>
          <p className="text-gray-600 mt-1">
            Información y análisis de periodistas especializados
          </p>
        </div>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg border border-blue-200 p-8">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery
                    ? "No se encontraron resultados"
                    : "No hay publicaciones disponibles"}
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? "Intenta con otros términos de búsqueda o explora las comunidades populares."
                    : "Los periodistas especialistas aún no han publicado contenido. Regresa más tarde."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Botón para cargar más posts (si no está en modo búsqueda) */}
        {!searchQuery && posts.length > 0 && (
          <div className="mt-8 text-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              onClick={() => {
                /* Implementar cargar más */
              }}
            >
              Cargar más publicaciones
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
