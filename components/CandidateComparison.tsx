'use client';

import { useState, useEffect } from 'react';
import { usePapaParse } from 'react-papaparse';
import candidatosData from '../data/candidatos.json';

interface Candidato {
  id: number;
  nombres: string;
  apellidos: string;
  partidoId: number;
  foto: string;
  resumen: string;
}

interface CSVData {
  [key: string]: string;
}

export default function CandidateComparison() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidato[]>([]);
  const [csvData, setCsvData] = useState<{ [key: number]: CSVData[] }>({});
  const { readString } = usePapaParse();
  const [loading, setLoading] = useState(false);

  const handleCandidateToggle = (candidato: Candidato) => {
    setSelectedCandidates(prev => {
      const isSelected = prev.some(c => c.id === candidato.id);
      if (isSelected) {
        return prev.filter(c => c.id !== candidato.id);
      } else if (prev.length < 3) {
        return [...prev, candidato];
      }
      return prev;
    });
  };

  const loadCSVData = async (candidatoId: number) => {
    try {
      const response = await fetch(`/data/candidato${candidatoId}.csv`);
      if (!response.ok) {
        console.warn(`CSV file for candidate ${candidatoId} not found`);
        return [];
      }
      const csvText = await response.text();
      const parsed = await new Promise<any[]>((resolve) => {
        readString(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            resolve(results.data as CSVData[]);
          },
        });
      });
      return parsed;
    } catch (error) {
      console.error(`Error loading CSV for candidate ${candidatoId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadAllCSVData = async () => {
      setLoading(true);
      const newCsvData: { [key: number]: CSVData[] } = {};

      for (const candidato of selectedCandidates) {
        if (!csvData[candidato.id]) {
          const data = await loadCSVData(candidato.id);
          newCsvData[candidato.id] = data;
        }
      }

      setCsvData(prev => ({ ...prev, ...newCsvData }));
      setLoading(false);
    };

    if (selectedCandidates.length > 0) {
      loadAllCSVData();
    }
  }, [selectedCandidates]);

  const getAllKeys = () => {
    const allKeys = new Set<string>();
    Object.values(csvData).forEach(dataArray => {
      dataArray.forEach(row => {
        Object.keys(row).forEach(key => allKeys.add(key));
      });
    });
    return Array.from(allKeys);
  };

  return (
    <section className="flex flex-col gap-10 py-16 md:py-24">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 @[480px]:text-4xl">
          Compara Candidatos
        </h1>
        <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
          Selecciona hasta 3 candidatos para comparar sus perfiles, trayectorias y propuestas detalladas.
        </p>
      </div>

      {/* Selección de candidatos */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900/50">
        <h2 className="text-lg font-bold text-gray-800 mb-4 dark:text-gray-200">Selecciona candidatos a comparar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidatosData.map(candidato => (
            <div
              key={candidato.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedCandidates.some(c => c.id === candidato.id)
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-200 hover:border-primary/50 dark:border-gray-700'
              }`}
              onClick={() => handleCandidateToggle(candidato)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center dark:bg-gray-700">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                    {candidato.nombres[0]}{candidato.apellidos[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">
                    {candidato.nombres} {candidato.apellidos}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{candidato.resumen.slice(0, 60)}...</p>
                </div>
                {selectedCandidates.some(c => c.id === candidato.id) && (
                  <span className="text-primary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4 dark:text-gray-400">
          Candidatos seleccionados: {selectedCandidates.length}/3
        </p>
      </div>

      {/* Comparación */}
      {selectedCandidates.length > 0 && (
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando datos de candidatos...</p>
            </div>
          ) : (
            <>
              {/* Resumen básico */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedCandidates.map(candidato => (
                  <div key={candidato.id} className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900/50">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center dark:bg-gray-700">
                        <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                          {candidato.nombres[0]}{candidato.apellidos[0]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {candidato.nombres} {candidato.apellidos}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {candidato.resumen}
                    </p>
                  </div>
                ))}
              </div>

              {/* Datos del CSV */}
              {Object.keys(csvData).length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-900/50">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Comparación Detallada</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Información detallada de las hojas de vida de los candidatos
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            Campo
                          </th>
                          {selectedCandidates.map(candidato => (
                            <th key={candidato.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              {candidato.nombres} {candidato.apellidos}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                        {getAllKeys().map(key => (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                              {key}
                            </td>
                            {selectedCandidates.map(candidato => {
                              const candidateData = csvData[candidato.id] || [];
                              const value = candidateData.length > 0 ? candidateData[0][key] || '-' : '-';
                              return (
                                <td key={candidato.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {value}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {Object.keys(csvData).some(id => csvData[parseInt(id)].length === 0) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-yellow-600 mr-2 dark:text-yellow-400">warning</span>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Algunos archivos CSV de candidatos no están disponibles. Se muestran solo los datos básicos.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
