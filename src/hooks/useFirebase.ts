import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "../config/firebase";
import { mockPosts, mockCommunities } from "../data/mockData";
import { Post, Community } from "../types";

// Hook para manejar la disponibilidad de Firebase
export function useFirebaseStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        if (isFirebaseConfigured()) {
          // Aquí podrías hacer una prueba de conexión real
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.warn("Firebase no disponible:", error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirebase();
  }, []);

  return { isConnected, isLoading };
}

// Hook para obtener datos con fallback automático
export function useDataWithFallback<T>(
  firebaseLoader: () => Promise<T>,
  fallbackData: T,
  deps: any[] = []
) {
  const [data, setData] = useState<T>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const { isConnected } = useFirebaseStatus();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      if (isConnected) {
        try {
          const result = await firebaseLoader();
          setData(result);
          setIsUsingFallback(false);
        } catch (error) {
          console.warn(
            "Error cargando desde Firebase, usando fallback:",
            error
          );
          setData(fallbackData);
          setIsUsingFallback(true);
        }
      } else {
        setData(fallbackData);
        setIsUsingFallback(true);
      }

      setIsLoading(false);
    };

    loadData();
  }, [isConnected, ...deps]);

  return { data, isLoading, isUsingFallback };
}

// Hook específico para posts
export function usePosts() {
  return useDataWithFallback(async () => {
    // Aquí iría la lógica real de Firebase
    // Por ahora devolvemos los datos mock
    return mockPosts;
  }, mockPosts);
}

// Hook específico para comunidades
export function useCommunities() {
  return useDataWithFallback(async () => {
    // Aquí iría la lógica real de Firebase
    return mockCommunities;
  }, mockCommunities);
}

// Hook para simular operaciones de Firebase
export function useFirebaseOperation<T>(operation: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useFirebaseStatus();

  const execute = async (): Promise<T | null> => {
    if (!isConnected) {
      // En modo demo, simular la operación
      console.log("Operación simulada en modo demo");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      console.error("Error en operación Firebase:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}
