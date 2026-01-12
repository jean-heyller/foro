import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Post, Community, Comment, User, ApiResponse } from "../types";

// Función de utilidad para convertir fechas
const convertToDate = (dateValue: any): Date => {
  if (!dateValue) return new Date();

  // Si es un Timestamp de Firebase
  if (dateValue && typeof dateValue.toDate === "function") {
    return dateValue.toDate();
  }

  // Si es un string ISO
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }

  // Si ya es un Date object
  if (dateValue instanceof Date) {
    return dateValue;
  }

  // Fallback
  return new Date();
};

// Servicios para Posts
export class PostService {
  private static collection = "posts";

  // Obtener todos los posts publicados (consulta simplificada temporalmente)
  static async getPosts(lastDoc?: QueryDocumentSnapshot<DocumentData>) {
    try {
      // Consulta simplificada sin índices compuestos
      let q = query(
        collection(db, this.collection),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      if (lastDoc) {
        q = query(
          collection(db, this.collection),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(10)
        );
      }

      const snapshot = await getDocs(q);
      const posts: Post[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        const post: Post = {
          ...(data as Omit<Post, "createdAt" | "updatedAt">),
          id: doc.id,
          createdAt: convertToDate(data.createdAt),
          updatedAt: convertToDate(data.updatedAt),
        };

        posts.push(post);
      });

      return {
        posts,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
      };
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  }

  // Obtener posts por comunidad (consulta simplificada temporalmente)
  static async getPostsByCommunity(communityId: string) {
    try {
      // Consulta simplificada - filtraremos isPublished en el cliente temporalmente
      const q = query(
        collection(db, this.collection),
        where("communityId", "==", communityId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const posts: Post[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        // Filtrar solo posts publicados en el cliente
        if (data.isPublished) {
          posts.push({
            ...data,
            id: doc.id,
            createdAt: convertToDate(data.createdAt),
            updatedAt: convertToDate(data.updatedAt),
          } as Post);
        }
      });

      return posts;
    } catch (error) {
      console.error("Error getting posts by community:", error);
      throw error;
    }
  }

  // Votar por un post
  static async votePost(
    postId: string,
    userId: string,
    voteType: "up" | "down"
  ) {
    try {
      const postRef = doc(db, this.collection, postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        throw new Error("Post no encontrado");
      }

      const data = postDoc.data();
      const upvotes = data.upvotes || [];
      const downvotes = data.downvotes || [];

      // Remover votos previos del usuario
      const updates: any = {
        upvotes: arrayRemove(userId),
        downvotes: arrayRemove(userId),
      };

      // Agregar nuevo voto
      if (voteType === "up") {
        updates.upvotes = arrayUnion(userId);
        updates.votes = increment(1);
      } else {
        updates.downvotes = arrayUnion(userId);
        updates.votes = increment(-1);
      }

      // Ajustar contador si había voto previo
      if (upvotes.includes(userId)) {
        updates.votes = voteType === "up" ? updates.votes : increment(-1);
      } else if (downvotes.includes(userId)) {
        updates.votes = voteType === "down" ? updates.votes : increment(1);
      }

      await updateDoc(postRef, updates);
    } catch (error) {
      console.error("Error voting post:", error);
      throw error;
    }
  }

  // Buscar posts
  static async searchPosts(searchTerm: string) {
    try {
      const q = query(
        collection(db, this.collection),
        where("isPublished", "==", true),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const posts: Post[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const post = {
          ...data,
          id: doc.id,
          createdAt: convertToDate(data.createdAt),
          updatedAt: convertToDate(data.updatedAt),
        } as Post;

        // Filtrar por término de búsqueda
        if (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.community.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          posts.push(post);
        }
      });

      return posts;
    } catch (error) {
      console.error("Error searching posts:", error);
      throw error;
    }
  }

  // Agregar comentario a un post
  static async addComment(postId: string, comment: Omit<Comment, "id">) {
    try {
      const commentData = {
        ...comment,
        createdAt: Timestamp.fromDate(new Date()),
        votes: 0,
        upvotes: [],
        downvotes: [],
      };

      await addDoc(collection(db, `posts/${postId}/comments`), commentData);
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  // Obtener comentarios de un post
  static async getComments(postId: string) {
    try {
      const q = query(
        collection(db, `posts/${postId}/comments`),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const comments: Comment[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        comments.push({
          ...data,
          id: doc.id,
          createdAt: convertToDate(data.createdAt),
        } as Comment);
      });

      return comments;
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  }
}

// Servicios para Comunidades
export class CommunityService {
  private static collection = "communities";

  // Obtener todas las comunidades activas (consulta simplificada temporalmente)
  static async getCommunities() {
    try {
      // Consulta simplificada - filtraremos isActive en el cliente
      const q = query(
        collection(db, this.collection),
        orderBy("members", "desc")
      );

      const snapshot = await getDocs(q);
      const communities: Community[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        // Filtrar solo comunidades activas en el cliente
        if (data.isActive) {
          communities.push({
            ...data,
            id: doc.id,
            createdAt: convertToDate(data.createdAt),
          } as Community);
        }
      });

      return communities;
    } catch (error) {
      console.error("Error getting communities:", error);
      throw error;
    }
  }

  // Seguir/dejar de seguir una comunidad
  static async toggleFollowCommunity(
    communityId: string,
    userId: string,
    follow: boolean
  ) {
    try {
      const communityRef = doc(db, this.collection, communityId);
      const updates: any = {};

      if (follow) {
        updates.followers = arrayUnion(userId);
        updates.members = increment(1);
      } else {
        updates.followers = arrayRemove(userId);
        updates.members = increment(-1);
      }

      await updateDoc(communityRef, updates);
    } catch (error) {
      console.error("Error toggling follow community:", error);
      throw error;
    }
  }

  // Obtener comunidades populares
  static async getPopularCommunities(limitCount: number = 10) {
    try {
      // Consulta simplificada - filtraremos isActive en el cliente
      const q = query(
        collection(db, this.collection),
        orderBy("members", "desc"),
        limit(limitCount * 2) // Obtener más para filtrar luego
      );

      const snapshot = await getDocs(q);
      const communities: Community[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        // Filtrar solo comunidades activas en el cliente
        if (data.isActive && communities.length < limitCount) {
          communities.push({
            ...data,
            id: doc.id,
            createdAt: convertToDate(data.createdAt),
          } as Community);
        }
      });

      return communities;
    } catch (error) {
      console.error("Error getting popular communities:", error);
      throw error;
    }
  }
}

// Servicios para Usuarios
export class UserService {
  private static collection = "users";

  // Crear usuario anónimo
  static async createAnonymousUser(): Promise<User> {
    try {
      const userData = {
        username: this.generateRandomUsername(),
        avatarColor: this.generateRandomColor(),
        isAnonymous: true,
        followedCommunities: [],
        joinDate: Timestamp.fromDate(new Date()),
        notifications: [],
      };

      const docRef = await addDoc(collection(db, this.collection), userData);

      return {
        id: docRef.id,
        ...userData,
        joinDate: new Date(),
      } as User;
    } catch (error) {
      console.error("Error creating anonymous user:", error);
      throw error;
    }
  }

  // Generar nombre de usuario aleatorio
  private static generateRandomUsername(): string {
    const adjectives = [
      "Curioso",
      "Informado",
      "Activo",
      "Crítico",
      "Analítico",
      "Pensante",
      "Observador",
    ];
    const nouns = [
      "Lector",
      "Ciudadano",
      "Seguidor",
      "Usuario",
      "Miembro",
      "Participante",
    ];
    const number = Math.floor(Math.random() * 9999);
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
      nouns[Math.floor(Math.random() * nouns.length)]
    }${number}`;
  }

  // Generar color de avatar aleatorio
  private static generateRandomColor(): string {
    const colors = ["#3B82F6", "#2563EB", "#1D4ED8", "#60A5FA", "#93C5FD"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Obtener usuario por ID
  static async getUser(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, this.collection, userId));

      if (!userDoc.exists()) {
        return null;
      }

      const data = userDoc.data();
      return {
        ...data,
        id: userDoc.id,
        joinDate: convertToDate(data.joinDate),
      } as User;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  // Actualizar comunidades seguidas
  static async updateFollowedCommunities(
    userId: string,
    communityId: string,
    follow: boolean
  ) {
    try {
      const userRef = doc(db, this.collection, userId);
      const updates: any = {};

      if (follow) {
        updates.followedCommunities = arrayUnion(communityId);
      } else {
        updates.followedCommunities = arrayRemove(communityId);
      }

      await updateDoc(userRef, updates);
    } catch (error) {
      console.error("Error updating followed communities:", error);
      throw error;
    }
  }
}
