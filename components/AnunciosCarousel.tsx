'use client';

import React, { useState, useEffect } from 'react';

interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
}

const AnunciosCarousel = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnuncios();
  }, []);

  const loadAnuncios = async () => {
    try {
      // Try to load from localStorage first (for admin changes)
      const storedAnuncios = localStorage.getItem('anuncios');
      if (storedAnuncios) {
        const parsedAnuncios = JSON.parse(storedAnuncios);
        setAnuncios(parsedAnuncios.filter((a: Anuncio) => a.activo));
      } else {
        // Load from JSON file
        const response = await import('../data/anuncios.json');
        setAnuncios(response.default.filter((a: Anuncio) => a.activo));
      }
    } catch (error) {
      console.error('Error loading anuncios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (anuncios.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === anuncios.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [anuncios.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === anuncios.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? anuncios.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl"></div>
    );
  }

  if (anuncios.length === 0) {
    return null;
  }

  return (
    <section className="w-full @container">
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl">
        {anuncios.map((anuncio, index) => (
          <div
            key={anuncio.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={anuncio.imagen}
              alt={anuncio.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-2xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {anuncio.titulo}
                </h2>
                <p className="text-lg md:text-xl">
                  {anuncio.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        {anuncios.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Anterior anuncio"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Siguiente anuncio"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {anuncios.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {anuncios.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Ir al anuncio ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnunciosCarousel;
