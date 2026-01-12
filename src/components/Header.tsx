import { Search, MessageCircle, Bell } from "lucide-react";
import { ChangeEvent } from "react";
import { useUser } from "../context/AppContext";
import { ConnectionIndicator } from "./FirebaseStatus";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { user, isLoading } = useUser();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="bg-white border-b border-blue-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo - Siguiendo las especificaciones */}
        <div className="shrink-0">
          <h1
            className="text-2xl font-semibold text-blue-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            El foro – 514
          </h1>
        </div>

        {/* Buscador central */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar temas..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Iconos de la derecha */}
        <div className="flex items-center gap-4">
          {/* Chat para discusiones privadas */}
          <button
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Chat privado"
          >
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </button>

          {/* Notificaciones */}
          <button
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors relative"
            title="Notificaciones"
          >
            <Bell className="w-6 h-6 text-blue-600" />
            {/* Indicador de notificaciones nuevas */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Perfil con usuario anónimo */}
          <div className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: user?.avatarColor || "#3B82F6" }}
              >
                {user?.username.slice(0, 2).toUpperCase() || "AN"}
              </div>
            )}
            <span className="text-gray-700 text-sm">
              {isLoading ? "Cargando..." : user?.username || "Usuario Anónimo"}
            </span>

            {/* Indicador de conexión */}
            <div className="ml-3 pl-3 border-l border-gray-200">
              <ConnectionIndicator />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
