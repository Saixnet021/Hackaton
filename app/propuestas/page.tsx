import propuestas from '../../data/propuestas.json';
import candidatos from '../../data/candidatos.json';

export default function PropuestasPage() {
  const sectores = [
    { id: 'economia', nombre: 'Economía', icono: 'attach_money' },
    { id: 'educacion', nombre: 'Educación', icono: 'school' },
    { id: 'salud', nombre: 'Salud', icono: 'local_hospital' },
    { id: 'medio_ambiente', nombre: 'Medio Ambiente', icono: 'nature' }
  ];

  const getCandidatoNombre = (candidatoId: number) => {
    const candidato = candidatos.find(c => c.id === candidatoId);
    return candidato ? `${candidato.nombres} ${candidato.apellidos}` : 'Desconocido';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Propuestas de Candidatos</h1>

      {sectores.map(sector => {
        const propuestasSector = propuestas.filter(p => p.sector === sector.id);

        return (
          <section key={sector.id} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-2xl text-primary">{sector.icono}</span>
              <h2 className="text-2xl font-bold text-gray-800">{sector.nombre}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {propuestasSector.map(propuesta => (
                <div key={propuesta.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{propuesta.titulo}</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {getCandidatoNombre(propuesta.candidatoId)}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{propuesta.descripcion}</p>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-700">Detalles principales:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {propuesta.detalles.slice(0, 3).map((detalle, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-sm text-primary mt-0.5">check_circle</span>
                          <span>{detalle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span><strong>Presupuesto:</strong> {propuesta.presupuesto}</span>
                    <span><strong>Plazo:</strong> {propuesta.plazo}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
