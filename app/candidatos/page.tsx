import CandidateCard from '../../components/CandidateCard';
import candidatos from '../../data/candidatos.json';
import partidos from '../../data/partidos.json';

export default function CandidatosPage() {
  // Combinar datos de candidatos con partidos
  const candidatosConPartidos = candidatos.map(candidato => {
    const partido = partidos.find(p => p.id === candidato.partidoId);
    return {
      ...candidato,
      partidoNombre: partido ? partido.nombre : 'Sin partido',
      partidoColor: partido ? partido.color : '#6B7280', // Asumiendo que `partidos.json` puede tener un color
    };
  });

  return (
    // Contenedor principal con fondo ligero y padding generoso
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
      <div className="container mx-auto">
        
        {/* Título más grande, con sombreado y énfasis */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-10 pb-2 border-b-4 border-blue-500/50 inline-block w-full">
          🗳️ Nuestros Candidatos
        </h2>
        
        {/* Grid adaptable con sombra y espaciado mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {candidatosConPartidos.map(candidato => (
            <CandidateCard key={candidato.id} candidato={candidato} />
          ))}
        </div>
      </div>
    </div>
  );
}