'use client';

interface Mesa {
  id: string;
  local: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  tipo_local: string;
  referencia: string;
  total_electores: number;
  mesas: Array<{
    numero: number;
    electores: number;
  }>;
  accesibilidad: {
    rampa: boolean;
    ascensor: boolean;
    estacionamiento: boolean;
    baños_adaptados: boolean;
  };
}

interface MesaCardProps {
  mesa: Mesa;
  onVerDetalles?: (mesa: Mesa) => void;
}

export default function MesaCard({ mesa, onVerDetalles }: MesaCardProps) {
  const getIconoAccesibilidad = (accesibilidad: Mesa['accesibilidad']) => {
    const items = [];
    if (accesibilidad.rampa) items.push({ icono: 'accessible', label: 'Rampa' });
    if (accesibilidad.ascensor) items.push({ icono: 'elevator', label: 'Ascensor' });
    if (accesibilidad.estacionamiento) items.push({ icono: 'local_parking', label: 'Estacionamiento' });
    if (accesibilidad.baños_adaptados) items.push({ icono: 'wc', label: 'Baños adaptados' });
    return items;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-900/50">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1 dark:text-gray-200">{mesa.local}</h3>
            <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">{mesa.direccion}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{mesa.departamento} • {mesa.distrito}</p>
          </div>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded dark:bg-primary/20">
            {mesa.tipo_local}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">
            <span className="font-medium">Referencia:</span> {mesa.referencia}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Total de electores:</span> {mesa.total_electores.toLocaleString()}
          </p>
        </div>

        {/* Mesas disponibles */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Mesas disponibles:</p>
          <div className="flex flex-wrap gap-2">
            {mesa.mesas.slice(0, 3).map(m => (
              <span key={m.numero} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300">
                Mesa {m.numero} ({m.electores} electores)
              </span>
            ))}
            {mesa.mesas.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300">
                +{mesa.mesas.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Accesibilidad */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Accesibilidad:</p>
          <div className="flex flex-wrap gap-2">
            {getIconoAccesibilidad(mesa.accesibilidad).map((item, index) => (
              <span key={index} className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded dark:bg-green-900 dark:text-green-300">
                <span className="material-symbols-outlined text-sm">{item.icono}</span>
                {item.label}
              </span>
            ))}
            {getIconoAccesibilidad(mesa.accesibilidad).length === 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-500">Sin información de accesibilidad</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onVerDetalles?.(mesa)}
            className="flex-1 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined mr-1 text-sm">visibility</span>
            Ver detalles
          </button>
          <button className="px-4 py-2 border border-primary text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors dark:border-primary dark:text-primary">
            <span className="material-symbols-outlined mr-1 text-sm">directions</span>
            Cómo llegar
          </button>
        </div>
      </div>
    </div>
  );
}
