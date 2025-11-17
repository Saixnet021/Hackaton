'use client';

import React, { useState, useEffect } from 'react';

interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
}

const AdminAnunciosPage = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnuncio, setEditingAnuncio] = useState<Anuncio | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    activo: true
  });

  useEffect(() => {
    loadAnuncios();
  }, []);

  const loadAnuncios = async () => {
    try {
      const response = await import('../../../data/anuncios.json');
      setAnuncios(response.default);
    } catch (error) {
      console.error('Error loading anuncios:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAnuncios = async (newAnuncios: Anuncio[]) => {
    // In a real app, this would save to a backend
    // For now, we'll just update the local state
    setAnuncios(newAnuncios);
    // You could also save to localStorage as a temporary solution
    localStorage.setItem('anuncios', JSON.stringify(newAnuncios));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAnuncio) {
      // Edit existing
      const updatedAnuncios = anuncios.map(anuncio =>
        anuncio.id === editingAnuncio.id
          ? { ...anuncio, ...formData }
          : anuncio
      );
      saveAnuncios(updatedAnuncios);
      setEditingAnuncio(null);
    } else {
      // Add new
      const newAnuncio: Anuncio = {
        id: Math.max(...anuncios.map(a => a.id), 0) + 1,
        ...formData
      };
      saveAnuncios([...anuncios, newAnuncio]);
    }

    setFormData({ titulo: '', descripcion: '', imagen: '', activo: true });
    setShowForm(false);
  };

  const handleEdit = (anuncio: Anuncio) => {
    setEditingAnuncio(anuncio);
    setFormData({
      titulo: anuncio.titulo,
      descripcion: anuncio.descripcion,
      imagen: anuncio.imagen,
      activo: anuncio.activo
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      const updatedAnuncios = anuncios.filter(anuncio => anuncio.id !== id);
      saveAnuncios(updatedAnuncios);
    }
  };

  const toggleActivo = (id: number) => {
    const updatedAnuncios = anuncios.map(anuncio =>
      anuncio.id === id ? { ...anuncio, activo: !anuncio.activo } : anuncio
    );
    saveAnuncios(updatedAnuncios);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Administrar Anuncios</h1>
          <p className="text-gray-600">Gestiona los anuncios que se muestran en el carrusel de la página principal</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingAnuncio(null);
            setFormData({ titulo: '', descripcion: '', imagen: '', activo: true });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : 'Agregar Anuncio'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4">
            {editingAnuncio ? 'Editar Anuncio' : 'Nuevo Anuncio'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Imagen
              </label>
              <input
                type="url"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="activo"
                checked={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
                Activo
              </label>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                {editingAnuncio ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAnuncio(null);
                  setFormData({ titulo: '', descripcion: '', imagen: '', activo: true });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} className="bg-white p-4 rounded-lg shadow-md border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={anuncio.imagen}
                alt={anuncio.titulo}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-bold">{anuncio.titulo}</h3>
                <p className="text-sm text-gray-600">{anuncio.descripcion}</p>
                <span className={`inline-block px-2 py-1 text-xs rounded ${
                  anuncio.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {anuncio.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleActivo(anuncio.id)}
                className={`px-3 py-1 rounded text-sm ${
                  anuncio.activo
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {anuncio.activo ? 'Desactivar' : 'Activar'}
              </button>
              <button
                onClick={() => handleEdit(anuncio)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(anuncio.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {anuncios.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-gray-300">campaign</span>
          <h3 className="text-xl font-medium text-gray-600 mt-4">No hay anuncios</h3>
          <p className="text-gray-500">Crea tu primer anuncio para mostrar en la página principal</p>
        </div>
      )}
    </div>
  );
};

export default AdminAnunciosPage;
