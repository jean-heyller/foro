import { Post } from './Post';

interface PostData {
  id: string;
  author: string;
  authorRole: string;
  community: string;
  time: string;
  title: string;
  content: string;
  votes: number;
  comments: number;
}

const posts: PostData[] = [
  {
    id: '1',
    author: 'María González',
    authorRole: 'Periodista Política',
    community: 'Política Nacional',
    time: 'Hace 2 horas',
    title: 'Análisis: Nuevas reformas legislativas en debate',
    content: 'El Congreso ha iniciado el debate sobre un paquete de reformas que podría cambiar significativamente el panorama político del país. Los principales puntos incluyen modificaciones al sistema electoral y nuevas regulaciones para la transparencia gubernamental...',
    votes: 847,
    comments: 156,
  },
  {
    id: '2',
    author: 'Carlos Mendoza',
    authorRole: 'Analista Económico',
    community: 'Economía y Finanzas',
    time: 'Hace 4 horas',
    title: 'Perspectivas económicas para el próximo trimestre',
    content: 'Los indicadores económicos muestran señales mixtas para los próximos meses. Mientras la inflación muestra signos de desaceleración, el crecimiento del PIB se mantiene por debajo de las proyecciones iniciales. Expertos debaten sobre las medidas necesarias...',
    votes: 623,
    comments: 98,
  },
  {
    id: '3',
    author: 'Ana Rodríguez',
    authorRole: 'Reportera Deportiva',
    community: 'Deportes',
    time: 'Hace 6 horas',
    title: 'Selección nacional se prepara para eliminatorias',
    content: 'La selección nacional de fútbol ha comenzado su concentración de cara a los próximos partidos eliminatorios. El entrenador ha convocado a varias figuras emergentes que prometen dar un nuevo aire al equipo. Los aficionados mantienen altas expectativas...',
    votes: 1034,
    comments: 234,
  },
  {
    id: '4',
    author: 'Luis Fernández',
    authorRole: 'Corresponsal Cultural',
    community: 'Cultura y Sociedad',
    time: 'Hace 8 horas',
    title: 'Festival de arte contemporáneo abre sus puertas',
    content: 'El festival anual de arte contemporáneo ha inaugurado su edición 2025 con más de 200 artistas nacionales e internacionales. La muestra incluye instalaciones interactivas, performances y exposiciones que reflexionan sobre temas sociales actuales...',
    votes: 445,
    comments: 67,
  },
  {
    id: '5',
    author: 'Patricia Vargas',
    authorRole: 'Periodista de Investigación',
    community: 'Política Nacional',
    time: 'Hace 10 horas',
    title: 'Informe especial: Transparencia en contrataciones públicas',
    content: 'Una investigación de varios meses revela inconsistencias en el proceso de contrataciones públicas de diversos organismos estatales. Los datos obtenidos a través de solicitudes de información pública muestran patrones que requieren mayor escrutinio...',
    votes: 956,
    comments: 187,
  },
];

interface PostFeedProps {
  searchQuery: string;
}

export function PostFeed({ searchQuery }: PostFeedProps) {
  const filteredPosts = posts.filter(post => 
    searchQuery === '' || 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.community.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron publicaciones que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
