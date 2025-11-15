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
  codigo: string;
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

interface MesaModalProps {
  mesa: Mesa | null;
  onClose: () => void;
}

export default function MesaModal({ mesa, onClose }: MesaModalProps) {
  if (!mesa) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{mesa.local}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1 dark:text-gray-300">Ubicación</h3>
              <p className="text-gray-600 dark:text-gray-400">{mesa.direccion}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{mesa.departamento}, {mesa.provincia}, {mesa.distrito}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-1 dark:text-gray-300">Código de Local</h3>
              <p className="text-gray-600 font-mono dark:text-gray-400">{mesa.codigo}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2 dark:text-gray-300">Mesas y Electores</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {mesa.mesas.map(m => (
                  <div key={m.numero} className="bg-gray-50 p-3 rounded text-center dark:bg-gray-800">
                    <div className="font-medium text-gray-800 dark:text-gray-200">Mesa {m.numero}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{m.electores} electores</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2 dark:text-gray-300">Información Adicional</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Tipo de local:</span> <span className="text-gray-600 dark:text-gray-400">{mesa.tipo_local}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Total electores:</span> <span className="text-gray-600 dark:text-gray-400">{mesa.total_electores.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
