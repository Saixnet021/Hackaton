import CandidateCard from '../../components/CandidateCard';
import candidatos from '../../data/candidatos.json';
import partidos from '../../data/partidos.json';

export default function CandidatosPage() {
  // Combinar datos de candidatos con partidos
  const candidatosConPartidos = candidatos.map(candidato => {
    const partido = partidos.find(p => p.id === candidato.partidoId);
    return {
      ...candidato,
      partidoNombre: partido ? partido.nombre : 'Sin partido'
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Candidatos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidatosConPartidos.map(candidato => (
          <CandidateCard key={candidato.id} candidato={candidato} />
        ))}
      </div>
    </div>
  );
}
