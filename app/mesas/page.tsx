'use client';

import { useState, useEffect } from 'react';
import mesasData from '../../data/mesas_votacion.json';

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
  mesas: {
    numero: string;
    electores: number;
  }[];
  total_electores: number;
  tipo_local: string;
  accesibilidad: {
    rampa: boolean;
    ascensor: boolean;
    estacionamiento: boolean;
    baños_adaptados: boolean;
  };
}

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>(mesasData);
  const [filtros, setFiltros] = useState({
    departamento: '',
    provincia: '',
    distrito: '',
    tipo_local: ''
  });
  const [busqueda, setBusqueda] = useState('');
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);

  // Obtener opciones únicas para filtros
  const departamentos = [...new Set(mesasData.map(m => m.departamento))];
  const tiposLocal = [...new Set(mesasData.map(m => m.tipo_local))];

  // Filtrar mesas
  const mesasFiltradas = mesas.filter(mesa => {
    const coincideBusqueda = busqueda === '' ||
      mesa.local.toLowerCase().includes(busqueda.toLowerCase()) ||
      mesa.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
      mesa.distrito.toLowerCase().includes(busqueda.toLowerCase());

    const coincideFiltros =
      (filtros.departamento === '' || mesa.departamento === filtros.departamento) &&
      (filtros.provincia === '' || mesa.provincia === filtros.provincia) &&
      (filtros.distrito === '' || mesa.distrito === filtros.distrito) &&
      (filtros.tipo_local === '' || mesa.tipo_local === filtros.tipo_local);

    return coincideBusqueda && coincideFiltros;
  });

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const getIconoAccesibilidad = (accesibilidad: Mesa['accesibilidad']) => {
    const items = [];
    if (accesibilidad.rampa) items.push({ icono: 'accessible', label: 'Rampa' });
    if (accesibilidad.ascensor) items.push({ icono: 'elevator', label: 'Ascensor' });
    if (accesibilidad.estacionamiento) items.push({ icono: 'local_parking', label: 'Estacionamiento' });
    if (accesibilidad.baños_adaptados) items.push({ icono: 'wc', label: 'Baños adaptados' });
    return items;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Encuentra tu Mesa de Votación</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Localiza rápidamente tu centro de votación. Ingresa tu dirección o utiliza los filtros para encontrar tu mesa electoral.
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por local, dirección o distrito..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined mr-2">search</span>
            Bhola
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filtros.departamento}
            onChange={(e) => handleFiltroChange('departamento', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Todos los departamentos</option>
            {departamentos.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>

          <select
            value={filtros.tipo_local}
            onChange={(e) => handleFiltroChange('tipo_local', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {tiposLocal.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <button
            onClick={() => setFiltros({ departamento: '', provincia: '', distrito: '', tipo_local: '' })}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Limpiar filtros
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <span className="material-symbols-outlined mr-2">my_location</span>
            Usar mi ubicación
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mesasFiltradas.map(mesa => (
          <div key={mesa.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{mesa.local}</h3>
                  <p className="text-sm text-gray-600 mb-2">{mesa.direccion}</p>
                  <p className="text-xs text-gray-500">{mesa.departamento} • {mesa.distrito}</p>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                  {mesa.tipo_local}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Referencia:</span> {mesa.referencia}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Total de electores:</span> {mesa.total_electores.toLocaleString()}
                </p>
              </div>

              {/* Mesas disponibles */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Mesas disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {mesa.mesas.map(m => (
                    <span key={m.numero} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      Mesa {m.numero} ({m.electores} electores)
                    </span>
                  ))}
                </div>
              </div>

              {/* Accesibilidad */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Accesibilidad:</p>
                <div className="flex flex-wrap gap-2">
                  {getIconoAccesibilidad(mesa.accesibilidad).map((item, index) => (
                    <span key={index} className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      <span className="material-symbols-outlined text-sm">{item.icono}</span>
                      {item.label}
                    </span>
                  ))}
                  {getIconoAccesibilidad(mesa.accesibilidad).length === 0 && (
                    <span className="text-xs text-gray-500">Sin información de accesibilidad</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setMesaSeleccionada(mesa)}
                  className="flex-1 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined mr-1 text-sm">visibility</span>
                  Ver detalles
                </button>
                <button className="px-4 py-2 border border-primary text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined mr-1 text-sm">directions</span>
                  Cómo llegar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mesasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No se encontraron mesas</h3>
          <p className="text-gray-500">Intenta ajustar tus filtros o búsqueda</p>
        </div>
      )}

      {/* Modal de detalles */}
      {mesaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{mesaSeleccionada.local}</h2>
                <button
                  onClick={() => setMesaSeleccionada(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Ubicación</h3>
                  <p className="text-gray-600">{mesaSeleccionada.direccion}</p>
                  <p className="text-sm text-gray-500">{mesaSeleccionada.departamento}, {mesaSeleccionada.provincia}, {mesaSeleccionada.distrito}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Código de Local</h3>
                  <p className="text-gray-600 font-mono">{mesaSeleccionada.codigo}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Mesas y Electores</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {mesaSeleccionada.mesas.map(m => (
                      <div key={m.numero} className="bg-gray-50 p-3 rounded text-center">
                        <div className="font-medium">Mesa {m.numero}</div>
                        <div className="text-sm text-gray-600">{m.electores} electores</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Información Adicional</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tipo de local:</span> {mesaSeleccionada.tipo_local}
                    </div>
                    <div>
                      <span className="font-medium">Total electores:</span> {mesaSeleccionada.total_electores.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
