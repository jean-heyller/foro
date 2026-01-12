import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Post, Community, UserSession } from "../types";
import {
  PostService,
  CommunityService,
  UserService,
} from "../services/firebaseService";
import {
  mockPosts,
  mockCommunities,
  generateAnonymousUser,
} from "../data/mockData";

// Contexto del usuario
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Contexto de posts
interface PostContextType {
  posts: Post[];
  isLoading: boolean;
  searchPosts: (query: string) => Promise<void>;
  votePost: (postId: string, voteType: "up" | "down") => Promise<void>;
  loadMorePosts: () => Promise<void>;
  refreshPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Contexto de comunidades
interface CommunityContextType {
  communities: Community[];
  followedCommunities: Community[];
  popularCommunities: Community[];
  isLoading: boolean;
  followCommunity: (communityId: string) => Promise<void>;
  unfollowCommunity: (communityId: string) => Promise<void>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined
);

// Provider del usuario
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    try {
      setIsLoading(true);

      // Verificar si ya existe un usuario en localStorage
      const storedUserId = localStorage.getItem("forum_user_id");

      if (storedUserId) {
        const existingUser = await UserService.getUser(storedUserId);
        if (existingUser) {
          setUser(existingUser);
          setIsAuthenticated(true);
          return;
        }
      }

      // Crear nuevo usuario anónimo usando el generador mock
      const userData = generateAnonymousUser();
      const newUser: User = {
        id: `user_${Date.now()}`, // ID temporal para desarrollo
        ...userData,
      };

      setUser(newUser);
      setIsAuthenticated(true);

      // Guardar ID en localStorage
      localStorage.setItem("forum_user_id", newUser.id);
    } catch (error) {
      console.error("Error durante login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("forum_user_id");
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      // Aquí podrías actualizar en Firebase si fuera necesario
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    login();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Provider de posts
export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const { user } = useUser();

  const refreshPosts = async () => {
    try {
      setIsLoading(true);
      const result = await PostService.getPosts();
      setPosts(result.posts);
      setLastDoc(result.lastDoc);
    } catch (error) {
      console.error("Error loading posts:", error);
      // Fallback a datos quemados si Firebase no está disponible
      setPosts(getFallbackPosts());
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (!lastDoc) return;

    try {
      const result = await PostService.getPosts(lastDoc);
      setPosts((prev) => [...prev, ...result.posts]);
      setLastDoc(result.lastDoc);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  const searchPosts = async (query: string) => {
    if (!query.trim()) {
      await refreshPosts();
      return;
    }

    try {
      setIsLoading(true);
      const searchResults = await PostService.searchPosts(query);
      setPosts(searchResults);
    } catch (error) {
      console.error("Error searching posts:", error);
      // Filtrar datos locales como fallback
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.community.toLowerCase().includes(query.toLowerCase())
      );
      setPosts(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const votePost = async (postId: string, voteType: "up" | "down") => {
    if (!user) return;

    try {
      await PostService.votePost(postId, user.id, voteType);

      // Actualizar estado local
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            const hasUpvoted = post.upvotes.includes(user.id);
            const hasDownvoted = post.downvotes.includes(user.id);

            let newVotes = post.votes;
            let newUpvotes = [...post.upvotes];
            let newDownvotes = [...post.downvotes];

            // Remover votos previos
            if (hasUpvoted) {
              newUpvotes = newUpvotes.filter((id) => id !== user.id);
              newVotes -= 1;
            }
            if (hasDownvoted) {
              newDownvotes = newDownvotes.filter((id) => id !== user.id);
              newVotes += 1;
            }

            // Agregar nuevo voto
            if (voteType === "up" && !hasUpvoted) {
              newUpvotes.push(user.id);
              newVotes += 1;
            } else if (voteType === "down" && !hasDownvoted) {
              newDownvotes.push(user.id);
              newVotes -= 1;
            }

            return {
              ...post,
              votes: newVotes,
              upvotes: newUpvotes,
              downvotes: newDownvotes,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error voting post:", error);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const value = {
    posts,
    isLoading,
    searchPosts,
    votePost,
    loadMorePosts,
    refreshPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

// Provider de comunidades
export function CommunityProvider({ children }: { children: ReactNode }) {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [followedCommunities, setFollowedCommunities] = useState<Community[]>(
    []
  );
  const [popularCommunities, setPopularCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const loadCommunities = async () => {
    try {
      setIsLoading(true);
      const allCommunities = await CommunityService.getCommunities();
      setCommunities(allCommunities);

      // Separar comunidades seguidas y populares
      if (user) {
        const followed = allCommunities.filter((c) =>
          user.followedCommunities.includes(c.id)
        );
        const popular = allCommunities
          .filter((c) => !user.followedCommunities.includes(c.id))
          .slice(0, 5);

        setFollowedCommunities(followed);
        setPopularCommunities(popular);
      }
    } catch (error) {
      console.error("Error loading communities:", error);
      // Fallback a datos quemados
      const fallback = getFallbackCommunities();
      setCommunities(fallback);
      setFollowedCommunities(fallback.slice(0, 4));
      setPopularCommunities(fallback.slice(4));
    } finally {
      setIsLoading(false);
    }
  };

  const followCommunity = async (communityId: string) => {
    if (!user) return;

    try {
      await CommunityService.toggleFollowCommunity(communityId, user.id, true);
      await UserService.updateFollowedCommunities(user.id, communityId, true);

      // Actualizar estado local
      const community = communities.find((c) => c.id === communityId);
      if (community) {
        setFollowedCommunities((prev) => [...prev, community]);
        setPopularCommunities((prev) =>
          prev.filter((c) => c.id !== communityId)
        );
      }
    } catch (error) {
      console.error("Error following community:", error);
    }
  };

  const unfollowCommunity = async (communityId: string) => {
    if (!user) return;

    try {
      await CommunityService.toggleFollowCommunity(communityId, user.id, false);
      await UserService.updateFollowedCommunities(user.id, communityId, false);

      // Actualizar estado local
      const community = followedCommunities.find((c) => c.id === communityId);
      if (community) {
        setFollowedCommunities((prev) =>
          prev.filter((c) => c.id !== communityId)
        );
        setPopularCommunities((prev) => [...prev, community]);
      }
    } catch (error) {
      console.error("Error unfollowing community:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadCommunities();
    }
  }, [user]);

  const value = {
    communities,
    followedCommunities,
    popularCommunities,
    isLoading,
    followCommunity,
    unfollowCommunity,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

// Hooks para usar los contextos
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};

export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error("useCommunities must be used within a CommunityProvider");
  }
  return context;
};

// Datos de fallback usando los mock data
function getFallbackPosts(): Post[] {
  return mockPosts;
}

function getFallbackCommunities(): Community[] {
  return mockCommunities;
}
