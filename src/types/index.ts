// Tipos para el foro 514

export interface User {
  id: string;
  username: string;
  email?: string;
  avatarColor: string;
  isAnonymous: boolean;
  followedCommunities: string[];
  joinDate: Date;
  notifications: Notification[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  authorId: string;
  authorVerified?: boolean;
  community: string;
  communityId: string;
  createdAt: Date;
  updatedAt: Date;
  votes: number;
  upvotes: string[]; // IDs de usuarios que votaron positivo
  downvotes: string[]; // IDs de usuarios que votaron negativo
  comments: Comment[];
  isPublished: boolean;
  tags: string[];
  media?: {
    images?: string[];
    videos?: string[];
    documents?: string[];
  };
  engagement?: {
    views: number;
    shares: number;
    bookmarks: number;
    commentsCount: number;
  };
  source?: {
    originalUrl: string;
    publication: string;
  };
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  followers: string[]; // IDs de usuarios que siguen la comunidad
  moderators: string[]; // IDs de moderadores
  createdAt: Date;
  isActive: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
  votes: number;
  upvotes: string[];
  downvotes: string[];
  replies?: Comment[];
  parentId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "comment" | "vote" | "mention" | "community" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  relatedId?: string;
}

export interface UserSession {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Tipos para respuestas de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para filtros y búsquedas
export interface PostFilters {
  community?: string;
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minVotes?: number;
  tags?: string[];
}

export interface SearchResult {
  posts: Post[];
  communities: Community[];
  total: number;
}
