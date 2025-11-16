import Image from 'next/image';
import Link from 'next/link'; // ⬅️ Importar el componente Link

export default function CandidateCard({ candidato }) {
  const { 
    id, // ⬅️ Desestructurar el ID para usarlo en la URL
    nombre, 
    fotoUrl, 
    partidoNombre, 
    propuestas, 
    partidoColor 
  } = candidato;

  // Definir la ruta de destino usando el ID del candidato
  const detailPath = `/candidatos/${id}`; 

  return (
    // Tarjeta estilizada con sombra, bordes redondeados y efecto hover
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col">
      
      {/* Sección de la Foto */}
      <div className="relative h-60 w-full">
        <Image 
          src={fotoUrl || '/default-avatar.png'}
          alt={`Foto de ${nombre}`}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 ease-in-out transform hover:scale-105"
        />
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Nombre del Candidato */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{nombre}</h2>
        
        {/* Partido Político */}
        <p 
          className="text-sm font-semibold mb-4 py-1 px-3 rounded-full inline-block text-white"
          style={{ backgroundColor: partidoColor }}
        >
          {partidoNombre}
        </p>
        
        {/* Propuestas Principales */}
        <div className="mt-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 border-t pt-4">Propuestas Clave:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                {/* Mostrar hasta dos propuestas */}
                {Array.isArray(propuestas) && propuestas.slice(0, 2).map((propuesta, index) => (
                    <li key={index}>{propuesta}</li>
                ))}
                {!Array.isArray(propuestas) && <li className="italic">{propuestas || "No hay propuestas detalladas."}</li>}
            </ul>
        </div>
      </div>
      
      {/* Botón de acción (Ahora es un Link) */}
      <div className="p-6 pt-0">
          {/* Usamos Link y le damos los estilos del botón */}
          <Link 
            href={detailPath} 
            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
              Ver Perfil Completo
          </Link>
      </div>
    </div>
  );
}