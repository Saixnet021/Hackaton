'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

// ⚠️ IMPORTANTE: Necesitas estos archivos en tu proyecto
import candidatosData from '../data/candidatos.json';
import partidosData from '../data/partidos.json';
import comparacionesData from '../data/comparaciones_analisis.json'; // ⬅️ Nuevo archivo

// --- INTERFACES ---
interface Candidato {
  id: number;
  nombres: string;
  apellidos: string;
  partidoId: number;
  fotoUrl: string; // Usamos fotoUrl de tu JSON
  resumen: string;
  propuestas: string[];
  biografia: string;
}

interface Partido {
  id: number;
  nombre: string;
  color: string;
}

interface AnalisisTema {
  tema: string;
  coincidencias: string[];
  diferencias: string[];
  riesgos_potenciales: string[];
}

interface ComparacionEstatica {
  id_comparacion: string;
  candidato1_id: number;
  candidato2_id: number;
  analisis_por_tema: AnalisisTema[];
}
// --- FIN INTERFACES ---

/**
 * * Componente que busca y muestra la comparación central.
 * */
const AnalisisComparativo = ({ c1, c2 }: { c1: Candidato, c2: Candidato }) => {
  // 1. Generar la clave de búsqueda (siempre ordenada: ID_MENOR-ID_MAYOR)
  const claveBusqueda = useMemo(() => {
    const idA = Math.min(c1.id, c2.id);
    const idB = Math.max(c1.id, c2.id);
    return `${idA}-${idB}`;
  }, [c1.id, c2.id]);

  // 2. Buscar el análisis estático
  const analisis = comparacionesData.find(
    (a: ComparacionEstatica) => a.id_comparacion === claveBusqueda
  );

  if (!analisis) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center dark:bg-red-900/20 dark:border-red-800">
        <p className="font-semibold text-red-800 dark:text-red-300">
          No se ha encontrado un análisis comparativo estático para este par de candidatos ({c1.apellidos} vs {c2.apellidos}).
        </p>
        <p className="text-sm text-red-700 dark:text-red-400 mt-2">
          Debes crear la entrada "{claveBusqueda}" en tu archivo `comparaciones_analisis.json`.
        </p>
      </div>
    );
  }

  // 3. Renderizar el análisis por temas
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 border-b pb-2">
        Análisis de Propuestas
      </h2>
      
      {analisis.analisis_por_tema.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800/80">
          <h3 className="text-xl font-bold text-primary dark:text-sky-300 mb-4">{item.tema}</h3>
          
          {/* Coincidencias */}
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-base mb-1">Coincidencias</h4>
            <ul className="list-disc list-inside text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
              {item.coincidencias.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>

          {/* Diferencias */}
          <div className="mt-4 p-3 bg-amber-50 rounded-lg dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 text-base mb-1">Diferencias Clave</h4>
            <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-400 space-y-1">
              {item.diferencias.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          {/* Riesgos */}
          <div className="mt-4 p-3 bg-rose-50 rounded-lg dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800">
            <h4 className="font-bold text-rose-800 dark:text-rose-300 text-base mb-1">Riesgos/Desafíos</h4>
            <ul className="list-disc list-inside text-sm text-rose-700 dark:text-rose-400 space-y-1">
              {item.riesgos_potenciales.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};


/**
 * * Componente principal de la página de comparación.
 * */
export default function CandidateComparison() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidato[]>([]);
  
  // Función helper para obtener datos del partido
  const getPartido = (id: number): Partido | undefined => {
    return partidosData.find((p: Partido) => p.id === id);
  };

  const handleCandidateToggle = (candidato: Candidato) => {
    setSelectedCandidates(prev => {
      const isSelected = prev.some(c => c.id === candidato.id);
      
      if (isSelected) {
        // Deseleccionar
        return prev.filter(c => c.id !== candidato.id);
      } else if (prev.length < 2) { 
        // ⬅️ Límite cambiado a 2
        // Seleccionar
        return [...prev, candidato];
      }
      return prev;
    });
  };
  
  const candidato1 = selectedCandidates[0];
  const candidato2 = selectedCandidates[1];
  const readyToCompare = selectedCandidates.length === 2;

  // Renderiza una tarjeta de candidato simplificada para la comparación
  const CandidateSummaryCard = ({ candidato }: { candidato: Candidato }) => {
    const partido = getPartido(candidato.partidoId);

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800/80 flex flex-col items-center text-center h-full">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 relative overflow-hidden dark:bg-gray-700">
          {candidato.fotoUrl && (
            <Image
              src={candidato.fotoUrl}
              alt={`Foto de ${candidato.nombres}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
          {candidato.nombres} {candidato.apellidos}
        </h3>
        {partido && (
          <p 
            className="text-sm font-semibold mt-1 py-1 px-3 rounded-full text-white"
            style={{ backgroundColor: partido.color }}
          >
            {partido.nombre}
          </p>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
          "{candidato.resumen}"
        </p>
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-10 py-16 md:py-24 bg-background-light dark:bg-background-dark min-h-screen">
      <div className="flex flex-col gap-4 text-center px-4">
        <h1 className="mx-auto max-w-2xl text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-gray-100">
          Comparador de Candidatos 
        </h1>
        <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
          Selecciona **dos candidatos** para ver un análisis detallado de sus propuestas clave basado en nuestros datos estáticos.
        </p>
      </div>

      {/* --- SELECCIÓN DE CANDIDATOS --- */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 dark:bg-gray-900/50">
          <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-gray-200">1. Selecciona 2 candidatos ({selectedCandidates.length}/2)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {candidatosData.map((candidato: Candidato) => {
              const partido = getPartido(candidato.partidoId);
              const isSelected = selectedCandidates.some(c => c.id === candidato.id);
              
              return (
                <div
                  key={candidato.id}
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-gray-200 hover:border-primary/50 dark:border-gray-700'
                  } ${selectedCandidates.length >= 2 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleCandidateToggle(candidato)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 relative bg-gray-200 rounded-full mb-2 overflow-hidden dark:bg-gray-700 border-2 border-white">
                      <Image
                        src={candidato.fotoUrl || '/default-avatar.png'}
                        alt={`Foto de ${candidato.nombres}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 leading-tight">
                      {candidato.apellidos}
                    </h3>
                    {partido && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1" style={{color: partido.color}}>
                            {partido.nombre}
                        </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE COMPARACIÓN (SEGUNDA VENTANA/SECCIÓN) --- */}
      {readyToCompare && candidato1 && candidato2 && (
        <div className="container mx-auto px-4 mt-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-6">2. Resultados de la Comparación</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Columna 1: Resumen Candidato 1 */}
                <div className="lg:col-span-1">
                    <CandidateSummaryCard candidato={candidato1} />
                </div>

                {/* Columna Central: Análisis Estático (Reemplaza la tabla CSV) */}
                <div className="lg:col-span-1">
                    <AnalisisComparativo c1={candidato1} c2={candidato2} />
                </div>
                
                {/* Columna 3: Resumen Candidato 2 */}
                <div className="lg:col-span-1">
                    <CandidateSummaryCard candidato={candidato2} />
                </div>
            </div>
            
        </div>
      )}
      
      {/* Mensaje de espera */}
      {selectedCandidates.length === 1 && (
        <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
            <p className="text-xl font-semibold">
                Selecciona otro candidato para iniciar la comparación.
            </p>
        </div>
      )}

    </section>
  );
}