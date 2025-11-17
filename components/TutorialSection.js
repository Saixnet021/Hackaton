import React from 'react';
const VIDEO_ID = 'qBUX2a_-L8M'; 

const TutorialSection = () => {
  // Para incrustar un video (iframe), se usa el dominio 'youtube.com/embed/'
  // y se le agrega el ID del video.
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${VIDEO_ID}`;
  return (
    <div className="container mx-auto px-4 mt-12 mb-12">
      <div className="bg-white rounded-xl shadow-xl p-6 dark:bg-gray-800/80">
        <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-6 border-b pb-3">
          📚 Tutorial de Uso del Sistema Completo
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Conoce todas las funcionalidades de nuestro sistema: cómo **navegar**, **seleccionar** candidatos, **comparar** propuestas y **acceder a los datos** detallados de cada partido.
        </p>

        {/* Contenedor Responsivo para el Video de YouTube */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-2xl" style={{ paddingTop: '56.25%' }}>
          {/* El estilo 'paddingTop: 56.25%' garantiza la relación de aspecto 16:9 */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={youtubeEmbedUrl}
            title="Tutorial de Uso del Sistema de Comparación Política"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
          Haz clic en el video para ver la guía completa de nuestra plataforma.
        </p>
      </div>
    </div>
  );
};

export default TutorialSection;