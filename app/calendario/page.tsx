import React from 'react';
// Asegúrate de que este archivo ahora incluye los datos ampliados
import calendario from '../../data/calendario.json'; 
const calendario1: Evento[] = calendario as Evento[];
type ImportanciaLevel = 'critica' | 'alta' | 'media'; 

interface Evento {
  id: number;
  fecha: string;
  evento: string;
  descripcion: string;
  // 🛑 IMPORTANTE: La propiedad debe usar el tipo restringido
  importancia: ImportanciaLevel; 
}
interface EventStyle {
  borderColor: string;
  bgColor: string;
  textColor: string;
  icon: string;
}
// Función para obtener un color basado en la importancia del evento
const getStyleByImportancia = (importancia: ImportanciaLevel): EventStyle => {
  switch (importancia) {
    case 'critica':
      return { 
        borderColor: 'border-red-500', 
        bgColor: 'bg-red-500', 
        textColor: 'text-red-600',
        icon: 'warning' // Icono para eventos críticos
      };
    case 'alta':
      return { 
        borderColor: 'border-yellow-500', 
        bgColor: 'bg-yellow-500', 
        textColor: 'text-yellow-600',
        icon: 'star' // Icono para eventos importantes
      };
    case 'media':
    default:
      return { 
        borderColor: 'border-blue-500', 
        bgColor: 'bg-blue-500', 
        textColor: 'text-blue-600',
        icon: 'calendar_month' // Icono estándar
      };
  }
};

export default function CalendarioPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Cronograma Electoral 2026 🗓️
        </h1>

        {/* CONTENEDOR DE LA LÍNEA DE TIEMPO */}
        <div className="relative border-l-4 border-gray-300 ml-4 md:ml-20">
        {calendario1.map((evento: Evento, index) => {
            const { borderColor, bgColor, textColor, icon } = getStyleByImportancia(evento.importancia);
            // Determina si es el último evento (para el diseño)
            const isLast = index === calendario.length - 1;

            return (
              <div key={evento.id} className="mb-8 flex items-start">
                
                {/* PUNTO DE LA LÍNEA DE TIEMPO Y CÍRCULO */}
                <div className={`-ml-5 flex-shrink-0 relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${bgColor} ring-8 ring-gray-50 shadow-lg`}>
                  <span className="material-symbols-outlined text-white text-xl">{icon}</span>
                </div>

                {/* TARJETA DEL EVENTO */}
                <div className="ml-8 flex-grow">
                  <div className={`p-5 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] bg-white border-t-4 ${borderColor} cursor-pointer`}>
                    
                    {/* FECHA (Se mueve arriba y a la izquierda en el diseño Timeline) */}
                    <p className={`text-sm font-semibold mb-1 ${textColor}`}>
                      {new Date(evento.fecha).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    
                    {/* TÍTULO Y DESCRIPCIÓN */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{evento.evento}</h3>
                    <p className="text-gray-600 text-base">{evento.descripcion}</p>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Añade un enlace para la fuente o la siguiente acción */}
      <div className="text-center mt-12 text-sm text-gray-500">
          *Fechas basadas en el cronograma electoral tentativo.
      </div>
    </div>
  );
}
