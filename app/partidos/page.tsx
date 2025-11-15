import partidos from '../../data/partidos.json';

export default function PartidosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Partidos Políticos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partidos.map(partido => (
          <div key={partido.id} className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{partido.nombre}</h3>
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">Logo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
