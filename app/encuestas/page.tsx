import encuestas from '../../data/encuestas.json';

export default function EncuestasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Encuestas Electorales</h1>

      <div className="space-y-8">
        {encuestas.map(encuesta => (
          <div key={encuesta.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{encuesta.titulo}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">business</span>
                    {encuesta.empresa}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {encuesta.fecha}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">groups</span>
                    Muestra: {encuesta.muestra}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  encuesta.tendencia === 'ascendente' ? 'bg-green-100 text-green-800' :
                  encuesta.tendencia === 'descendente' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {encuesta.tendencia === 'ascendente' ? '↗ Ascendente' :
                   encuesta.tendencia === 'descendente' ? '↘ Descendente' :
                   '→ Estable'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>Margen de error: {encuesta.margen_error}</span>
              </div>

              <div className="space-y-3">
                {encuesta.resultados.map((resultado, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-gray-700 truncate">
                      {resultado.nombre}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-primary h-4 rounded-full transition-all duration-500"
                            style={{ width: `${resultado.porcentaje}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-800 min-w-[60px] text-right">
                          {resultado.porcentaje}%
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 min-w-[50px] text-right">
                      {resultado.votos} votos
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {encuesta.notas && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  <span className="material-symbols-outlined text-sm mr-1">notes</span>
                  {encuesta.notas}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
