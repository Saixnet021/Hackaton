import noticias from '../../data/noticias.json';
import candidatos from '../../data/candidatos.json';

export default function NoticiasPage() {
  const getCandidatosRelacionados = (candidatosIds: number[]) => {
    return candidatosIds.map(id => {
      const candidato = candidatos.find(c => c.id === id);
      return candidato ? `${candidato.nombres} ${candidato.apellidos}` : 'Desconocido';
    }).join(', ');
  };

  const categorias = [
    { id: 'economia', nombre: 'Economía', color: 'bg-blue-100 text-blue-800' },
    { id: 'trabajo', nombre: 'Trabajo', color: 'bg-green-100 text-green-800' },
    { id: 'medio_ambiente', nombre: 'Medio Ambiente', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'debate', nombre: 'Debates', color: 'bg-purple-100 text-purple-800' },
    { id: 'encuestas', nombre: 'Encuestas', color: 'bg-orange-100 text-orange-800' }
  ];

  const getCategoriaColor = (categoria: string) => {
    const cat = categorias.find(c => c.id === categoria);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Noticias Electorales</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map(noticia => (
          <article key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-gray-400">article</span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(noticia.categoria)}`}>
                  {categorias.find(c => c.id === noticia.categoria)?.nombre || noticia.categoria}
                </span>
                <span className="text-sm text-gray-500">{noticia.fecha}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {noticia.titulo}
              </h2>

              {noticia.subtitulo && (
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {noticia.subtitulo}
                </p>
              )}

              <p className="text-gray-700 mb-4 line-clamp-3">
                {noticia.contenido}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-primary">{noticia.fuente}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>{getCandidatosRelacionados(noticia.candidatos_relacionados)}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {noticia.etiquetas.map((etiqueta, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    #{etiqueta}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
