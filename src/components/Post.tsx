import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { Post as PostType } from "../types";
import { usePosts } from "../context/AppContext";

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { votePost } = usePosts();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleVote = async (voteType: "up" | "down") => {
    try {
      await votePost(post.id, voteType);
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };

  const formatTimeAgo = (timestamp: Date | string) => {
    const now = new Date();
    const postTime =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    const diffInHours = Math.floor(
      (now.getTime() - postTime.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Hace menos de 1 hora";
    if (diffInHours < 24)
      return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
  };

  const truncateContent = (content: string, maxLength: number = 300) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.author}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{post.authorRole}</span>
              {post.authorVerified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✓ Verificado
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {formatTimeAgo(post.createdAt)}
        </div>
      </div>

      {/* Community Tag */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          📂 {post.community}
        </span>
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {post.title}
      </h2>

      {/* Content */}
      <div className="prose prose-sm max-w-none mb-4">
        <p className="text-gray-700 leading-relaxed">
          {showFullContent ? post.content : truncateContent(post.content)}
        </p>
        {post.content.length > 300 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2"
          >
            {showFullContent ? "Mostrar menos" : "Leer más"}
          </button>
        )}
      </div>

      {/* Media */}
      {post.media && post.media.images && post.media.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {post.media.images.slice(0, 2).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1} del post`}
                className="rounded-lg object-cover w-full h-48"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/400x200?text=Imagen+no+disponible";
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Source */}
      {post.source && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>📰 Fuente:</span>
            <a
              href={post.source.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {post.source.publication}
            </a>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          {/* Vote Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleVote("up")}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                {post.votes}
              </span>
            </button>
            <button
              onClick={() => handleVote("down")}
              className="flex items-center space-x-1 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
            </button>
          </div>

          {/* Comments */}
          <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {post.engagement?.commentsCount || 0}
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Share */}
          <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Compartir</span>
          </button>

          {/* Bookmark */}
          <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-yellow-600">
            <Bookmark className="w-4 h-4" />
            <span className="text-sm font-medium">Guardar</span>
          </button>
        </div>
      </div>

      {/* Engagement Stats */}
      {post.engagement && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>👁️ {post.engagement.views.toLocaleString()} vistas</span>
              {post.engagement.shares > 0 && (
                <span>🔄 {post.engagement.shares} compartidos</span>
              )}
            </div>
            {post.engagement.bookmarks > 0 && (
              <span>🔖 {post.engagement.bookmarks} guardados</span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
