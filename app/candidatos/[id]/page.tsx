import { notFound } from 'next/navigation';
import candidatos from '../../../data/candidatos.json';
import partidos from '../../../data/partidos.json';

export default async function CandidatoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidato = candidatos.find(c => c.id === parseInt(id));

  if (!candidato) {
    notFound();
  }

  const partido = partidos.find(p => p.id === candidato.partidoId);

  return (
    // Contenedor principal con fondo suave
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        
        {/* Tarjeta de Perfil Principal con sombra y diseño limpio */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden p-8 sm:p-10">
          
          {/* Encabezado y Foto */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-8 mb-8">
            
            {/* Contenedor de la Foto (Usando <img> en lugar de Next/Image) */}
          <div className="w-40 h-40 flex-shrink-0 rounded-full overflow-hidden shadow-lg border-4 border-white ring-4 ring-blue-500/50">
            <img
              src={candidato.fotoUrl || '/default-avatar.png'} // Usar src directamente
              alt={`Foto de ${candidato.nombres} ${candidato.apellidos}`}
              // Estilos para la imagen dentro del contenedor circular
              className="w-full h-full object-cover" 
            />
          </div>
            
            {/* Información Principal */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {candidato.nombres} {candidato.apellidos}
              </h1>
             
              {/* Resumen o Lema */}
              <p className="mt-4 text-xl italic text-gray-700">
                "{candidato.resumen}"
              </p>
            </div>
          </div>
          
          {/* --- Biografía Completa --- */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-400 pb-2 mb-4">
              📚 Biografía
            </h2>
            <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
              {candidato.biografia || 'Biografía no disponible.'}
            </p>
          </section>
  
          {/* --- Propuestas de Gobierno (Lista) --- */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-400 pb-2 mb-4">
              💡 Propuestas de Gobierno
            </h2>
            {candidato.propuestas && candidato.propuestas.length > 0 ? (
              <ul className="space-y-4">
                {candidato.propuestas.map((propuesta, index) => (
                  <li key={index} className="flex items-start bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                    <span className="text-blue-600 font-extrabold mr-3 text-xl flex-shrink-0">
                      {index + 1}.
                    </span>
                    <p className="text-gray-700 text-base flex-1">
                      {propuesta}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">Este candidato aún no ha publicado sus propuestas detalladas.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return candidatos.map((candidato) => ({
    id: candidato.id.toString(),
  }));
}

