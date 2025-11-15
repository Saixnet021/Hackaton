'use client';

import { useState } from 'react';
import encuestasDataRaw from '../data/encuestas.json';

type EncuestaRaw = Omit<Encuesta, 'tendencia'> & { tendencia: string };

const encuestasData = (encuestasDataRaw as EncuestaRaw[]).map(encuesta => ({
  ...encuesta,
  tendencia: encuesta.tendencia as 'ascendente' | 'descendente' | 'estable'
}));

interface Encuesta {
  id: number;
  titulo: string;
  empresa: string;
  fecha: string;
  muestra: number;
  margen_error: string;
  resultados: Array<{
    candidatoId?: number;
    nombre: string;
    porcentaje: number;
    votos: number;
    otros?: boolean;
  }>;
  tendencia: 'ascendente' | 'descendente' | 'estable';
  notas?: string;
}

export default function EncuestasSection() {
  const [showEncuestas, setShowEncuestas] = useState(false);
  const [selectedEncuesta, setSelectedEncuesta] = useState<Encuesta | null>(null);

  // Mostrar solo las 3 encuestas más recientes para la home
  const encuestasDestacadas = encuestasData.slice(0, 3);

  return (
    <>
      {/* Sección principal de encuestas en la home */}
      <section className="flex flex-col gap-10 py-16 md:py-24">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 @[480px]:text-4xl">Últimas Encuestas Electorales</h1>
          <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">Mantente al día con las tendencias electorales más recientes y analiza los resultados de las principales encuestadoras.</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center dark:bg-gray-900/50">
            <div className="text-3xl font-bold text-primary mb-2">{encuestasData.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Encuestas publicadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center dark:bg-gray-900/50">
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.max(...encuestasData.flatMap(e => e.resultados.map(r => r.porcentaje)))}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Mayor intención de voto</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center dark:bg-gray-900/50">
            <div className="text-3xl font-bold text-primary mb-2">
              {encuestasData.reduce((sum, e) => sum + e.muestra, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total de encuestados</div>
          </div>
        </div>

        {/* Encuestas destacadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {encuestasDestacadas.map(encuesta => (
            <div key={encuesta.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-gray-900/50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 dark:text-gray-200">{encuesta.titulo}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
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
                      {encuesta.muestra}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  encuesta.tendencia === 'ascendente' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  encuesta.tendencia === 'descendente' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {encuesta.tendencia === 'ascendente' ? '↗ Ascendente' :
                   encuesta.tendencia === 'descendente' ? '↘ Descendente' :
                   '→ Estable'}
                </span>
              </div>

              {/* Top 3 resultados */}
              <div className="space-y-3 mb-4">
                {encuesta.resultados.slice(0, 3).map((resultado, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700 truncate dark:text-gray-300">
                      {resultado.nombre}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                          <div
                            className="bg-primary h-3 rounded-full transition-all duration-500"
                            style={{ width: `${resultado.porcentaje}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-800 min-w-[50px] text-right dark:text-gray-200">
                          {resultado.porcentaje}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedEncuesta(encuesta);
                  setShowEncuestas(true);
                }}
                className="w-full px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver resultados completos
              </button>
            </div>
          ))}
        </div>

        {/* Botón para ver todas las encuestas */}
        <div className="text-center">
          <button
            onClick={() => setShowEncuestas(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver todas las encuestas ({encuestasData.length})
          </button>
        </div>
      </section>

      {/* Modal de detalles de encuesta */}
      {showEncuestas && selectedEncuesta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-900">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">{selectedEncuesta.titulo}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">business</span>
                      {selectedEncuesta.empresa}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {selectedEncuesta.fecha}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">groups</span>
                      Muestra: {selectedEncuesta.muestra}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error_margin</span>
                      {selectedEncuesta.margen_error}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowEncuestas(false);
                    setSelectedEncuesta(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Todos los resultados */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-200">Resultados completos</h3>
                <div className="space-y-4">
                  {selectedEncuesta.resultados.map((resultado, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                      <div className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {resultado.nombre}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                            <div
                              className="bg-primary h-4 rounded-full transition-all duration-500"
                              style={{ width: `${resultado.porcentaje}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800 min-w-[60px] text-right dark:text-gray-200">
                            {resultado.porcentaje}%
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 min-w-[80px] text-right dark:text-gray-400">
                        {resultado.votos.toLocaleString()} votos
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEncuesta.notas && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 italic dark:text-gray-400">
                    <span className="material-symbols-outlined text-sm mr-1">notes</span>
                    {selectedEncuesta.notas}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de todas las encuestas */}
      {showEncuestas && !selectedEncuesta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-900">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Todas las Encuestas</h2>
                <button
                  onClick={() => setShowEncuestas(false)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-6">
                {encuestasData.map(encuesta => (
                  <div key={encuesta.id} className="bg-gray-50 rounded-lg p-6 dark:bg-gray-800">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 dark:text-gray-200">{encuesta.titulo}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                            {encuesta.muestra}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        encuesta.tendencia === 'ascendente' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        encuesta.tendencia === 'descendente' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {encuesta.tendencia === 'ascendente' ? '↗ Ascendente' :
                         encuesta.tendencia === 'descendente' ? '↘ Descendente' :
                         '→ Estable'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {encuesta.resultados.slice(0, 3).map((resultado, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded dark:bg-gray-700">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{resultado.nombre}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{resultado.votos} votos</div>
                          </div>
                          <div className="text-lg font-bold text-primary">{resultado.porcentaje}%</div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedEncuesta(encuesta)}
                      className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Ver detalles completos
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
