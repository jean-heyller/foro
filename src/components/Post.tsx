import { ArrowUp, ArrowDown, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface PostProps {
  post: {
    id: string;
    author: string;
    authorRole: string;
    community: string;
    time: string;
    title: string;
    content: string;
    votes: number;
    comments: number;
  };
}

export function Post({ post }: PostProps) {
  const [currentVotes, setCurrentVotes] = useState(post.votes);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (voteState === 'up') {
      setCurrentVotes(currentVotes - 1);
      setVoteState(null);
    } else if (voteState === 'down') {
      setCurrentVotes(currentVotes + 2);
      setVoteState('up');
    } else {
      setCurrentVotes(currentVotes + 1);
      setVoteState('up');
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      setCurrentVotes(currentVotes + 1);
      setVoteState(null);
    } else if (voteState === 'up') {
      setCurrentVotes(currentVotes - 2);
      setVoteState('down');
    } else {
      setCurrentVotes(currentVotes - 1);
      setVoteState('down');
    }
  };

  return (
    <article className="bg-white border border-blue-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Votación */}
        <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 border-r border-blue-100">
          <button
            onClick={handleUpvote}
            className={`p-1 rounded hover:bg-blue-100 transition-colors ${
              voteState === 'up' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <ArrowUp className="w-6 h-6" />
          </button>
          <span className={`${
            voteState === 'up' ? 'text-blue-600' : voteState === 'down' ? 'text-red-600' : 'text-gray-700'
          }`}>
            {currentVotes}
          </span>
          <button
            onClick={handleDownvote}
            className={`p-1 rounded hover:bg-red-100 transition-colors ${
              voteState === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="text-blue-600 hover:underline cursor-pointer">c/{post.community}</span>
            <span>•</span>
            <span>Publicado por <strong>{post.author}</strong> ({post.authorRole})</span>
            <span>•</span>
            <span>{post.time}</span>
          </div>

          {/* Título */}
          <h3 className="text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h3>

          {/* Contenido */}
          <p className="text-gray-700 mb-4 line-clamp-3">
            {post.content}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments} comentarios</span>
            </button>
            <button className="text-gray-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
              Compartir
            </button>
            <button className="text-gray-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
