'use client';

import { useState } from 'react';
import MesaCard from './MesaCard';
import MesaFilters from './MesaFilters';
import MesaModal from './MesaModal';
import mesasData from '../data/mesas_votacion.json';

interface Mesa {
  id: number;
  codigo: string;
  departamento: string;
  provincia: string;
  distrito: string;
  local: string;
  direccion: string;
  referencia: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  mesas: Array<{
    numero: string;
    electores: number;
  }>;
  total_electores: number;
  tipo_local: string;
  accesibilidad: {
    rampa: boolean;
    ascensor: boolean;
    estacionamiento: boolean;
    baños_adaptados: boolean;
  };
}

export default function MesaSection() {
  const [mesaFilter, setMesaFilter] = useState({
    departamento: '',
    provincia: '',
    distrito: ''
  });
  const [mesaBusqueda, setMesaBusqueda] = useState('');
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);

  // Filtrar mesas de votación
  const mesasFiltradas = mesasData.filter(mesa => {
    const coincideBusqueda = mesaBusqueda === '' ||
      mesa.local.toLowerCase().includes(mesaBusqueda.toLowerCase()) ||
      mesa.direccion.toLowerCase().includes(mesaBusqueda.toLowerCase()) ||
      mesa.distrito.toLowerCase().includes(mesaBusqueda.toLowerCase());

    const coincideFiltros =
      (mesaFilter.departamento === '' || mesa.departamento === mesaFilter.departamento) &&
      (mesaFilter.provincia === '' || mesa.provincia === mesaFilter.provincia) &&
      (mesaFilter.distrito === '' || mesa.distrito === mesaFilter.distrito);

    return coincideBusqueda && coincideFiltros;
  });

  // Obtener opciones únicas para filtros
  const departamentos = [...new Set(mesasData.map(m => m.departamento))];
  const provincias = [...new Set(mesasData.filter(m => mesaFilter.departamento === '' || m.departamento === mesaFilter.departamento).map(m => m.provincia))];
  const distritos = [...new Set(mesasData.filter(m => (mesaFilter.departamento === '' || m.departamento === mesaFilter.departamento) && (mesaFilter.provincia === '' || m.provincia === mesaFilter.provincia)).map(m => m.distrito))];

  const handleMesaFilterChange = (campo: string, valor: string) => {
    setMesaFilter(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <section className="flex flex-col gap-10 py-16 md:py-24">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 @[480px]:text-4xl">Encuentra tu Mesa de Votación</h1>
        <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">Localiza rápidamente tu centro de votación. Ingresa tu dirección o utiliza los filtros para encontrar tu mesa electoral.</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <MesaFilters
        busqueda={mesaBusqueda}
        setBusqueda={setMesaBusqueda}
        filtros={mesaFilter}
        handleFiltroChange={handleMesaFilterChange}
        departamentos={departamentos}
        provincias={provincias}
        distritos={distritos}
      />

      {/* Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mesasFiltradas.slice(0, 6).map(mesa => (
          <MesaCard
            key={mesa.id}
            mesa={mesa}
            onVerDetalles={setMesaSeleccionada}
          />
        ))}
      </div>

      {mesasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 dark:text-gray-600">search_off</span>
          <h3 className="text-xl font-medium text-gray-600 mb-2 dark:text-gray-400">No se encontraron mesas</h3>
          <p className="text-gray-500 dark:text-gray-500">Intenta ajustar tus filtros o búsqueda</p>
        </div>
      )}

      {mesasFiltradas.length > 6 && (
        <div className="text-center">
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Ver todas las mesas ({mesasFiltradas.length})
          </button>
        </div>
      )}

      {/* Modal de detalles */}
      <MesaModal
        mesa={mesaSeleccionada}
        onClose={() => setMesaSeleccionada(null)}
      />
    </section>
  );
}
