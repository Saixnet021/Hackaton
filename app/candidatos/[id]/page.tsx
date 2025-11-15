import { notFound } from 'next/navigation';
import candidatos from '../../../data/candidatos.json';
import partidos from '../../../data/partidos.json';

export default async function CandidatoDetailPage({ params }) {
  const { id } = await params;
  const candidato = candidatos.find(c => c.id === parseInt(id));

  if (!candidato) {
    notFound();
  }

  const partido = partidos.find(p => p.id === candidato.partidoId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {candidato.nombres} {candidato.apellidos}
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Partido Político</h2>
          <p className="text-gray-600">{partido ? partido.nombre : 'Sin partido'}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Resumen</h2>
          <p className="text-gray-600">{candidato.resumen}</p>
        </div>

        <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl font-bold text-gray-600">Foto</span>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return candidatos.map((candidato) => ({
    id: candidato.id.toString(),
  }));
}
