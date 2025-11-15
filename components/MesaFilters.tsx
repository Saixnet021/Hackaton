'use client';

interface MesaFiltersProps {
  busqueda: string;
  setBusqueda: (value: string) => void;
  filtros: {
    departamento: string;
    provincia: string;
    distrito: string;
  };
  handleFiltroChange: (campo: string, valor: string) => void;
  departamentos: string[];
  provincias: string[];
  distritos: string[];
}

export default function MesaFilters({
  busqueda,
  setBusqueda,
  filtros,
  handleFiltroChange,
  departamentos,
  provincias,
  distritos
}: MesaFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900/50">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por local, dirección o distrito..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined mr-2">search</span>
          Buscar
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filtros.departamento}
          onChange={(e) => handleFiltroChange('departamento', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Todos los departamentos</option>
          {departamentos.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <select
          value={filtros.provincia}
          onChange={(e) => handleFiltroChange('provincia', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Todas las provincias</option>
          {provincias.map(prov => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>

        <select
          value={filtros.distrito}
          onChange={(e) => handleFiltroChange('distrito', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Todos los distritos</option>
          {distritos.map(dist => (
            <option key={dist} value={dist}>{dist}</option>
          ))}
        </select>

        <button
          onClick={() => handleFiltroChange('departamento', '') || handleFiltroChange('provincia', '') || handleFiltroChange('distrito', '')}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
