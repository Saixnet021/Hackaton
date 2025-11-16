import calendario from '../../data/calendario.json';

export default function CalendarioPage() {
  return (
    <div className="w-full min-h-screen bg-white text-black opacity-100">
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Calendario Electoral 2026</h1>
      <div className="space-y-4">
        {calendario.map(evento => (
          <div key={evento.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{evento.evento}</h3>
                <p className="text-gray-600 mt-2">{evento.descripcion}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{evento.fecha}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
