import Image from 'next/image';
import Link from 'next/link';

export default function CandidateCard({ candidato }) {
  return (
    <Link href={`/candidatos/${candidato.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="relative h-48">
          <Image
            src={candidato.foto}
            alt={`Foto de ${candidato.nombres} ${candidato.apellidos}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800">{`${candidato.nombres} ${candidato.apellidos}`}</h3>
          <p className="text-sm text-gray-600">{candidato.partidoNombre}</p>
        </div>
      </div>
    </Link>
  );
}
