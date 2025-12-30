import { Search, MessageCircle, Bell } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// Función para generar nombre de usuario aleatorio
const generateRandomUsername = () => {
  const adjectives = ['Curioso', 'Informado', 'Activo', 'Crítico', 'Analítico', 'Pensante', 'Observador'];
  const nouns = ['Lector', 'Ciudadano', 'Seguidor', 'Usuario', 'Miembro', 'Participante'];
  const number = Math.floor(Math.random() * 9999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${number}`;
};

// Función para generar color de avatar aleatorio
const generateRandomColor = () => {
  const colors = ['#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#93C5FD'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const username = generateRandomUsername();
  const avatarColor = generateRandomColor();
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <header className="bg-white border-b border-blue-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-blue-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            El foro 514
          </h1>
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar temas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Iconos de la derecha */}
        <div className="flex items-center gap-4">
          {/* Chat */}
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </button>

          {/* Notificaciones */}
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors relative">
            <Bell className="w-6 h-6 text-blue-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Perfil */}
          <div className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: avatarColor }}
            >
              {initials}
            </div>
            <span className="text-gray-700">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
