'use client';

import { useState } from 'react';
import mesasData from '../data/mesas_votacion.json';
import EncuestasSection from '../components/EncuestasSection';
import CandidateComparison from '../components/CandidateComparison';
import AnunciosCarousel from '../components/AnunciosCarousel';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [mesaFilter, setMesaFilter] = useState({
    departamento: '',
    provincia: '',
    distrito: ''
  });
  const [mesaBusqueda, setMesaBusqueda] = useState('');
  const [showMesas, setShowMesas] = useState(false);
  const [showEncuestas, setShowEncuestas] = useState(false);
  const [showCandidateComparison, setShowCandidateComparison] = useState(false);

  const timelineEvents = [
    {
      id: 1,
      fecha: '29 de Agosto',
      titulo: 'Cierre de Inscripción de Cédulas',
      descripcion: 'Fecha límite para que los ciudadanos inscriban su documento de identidad.',
      categoria: 'proceso_electoral',
      position: 'right'
    },
    {
      id: 2,
      fecha: '01 de Septiembre',
      titulo: 'Sorteo de Miembros de Mesa',
      descripcion: 'Selección aleatoria de ciudadanos para ser jurados de votación.',
      categoria: 'miembros_mesa',
      position: 'left'
    },
    {
      id: 3,
      fecha: '15 - 30 de Septiembre',
      titulo: 'Capacitación Miembros de Mesa',
      descripcion: 'Periodo de formación obligatoria para los miembros de mesa seleccionados.',
      categoria: 'miembros_mesa',
      position: 'right'
    },
    {
      id: 4,
      fecha: '25 de Octubre',
      titulo: 'Cierre de Campañas Electorales',
      descripcion: 'Último día permitido para realizar actos de proselitismo político.',
      categoria: 'proceso_electoral',
      position: 'left'
    },
    {
      id: 5,
      fecha: '26 de Octubre',
      titulo: 'Ley Seca',
      descripcion: 'Inicio de la prohibición de venta y consumo de bebidas alcohólicas.',
      categoria: 'proceso_electoral',
      position: 'right'
    },
    {
      id: 6,
      fecha: '27 de Octubre',
      titulo: 'Día de las Elecciones',
      descripcion: 'Jornada de votación a nivel nacional desde las 8:00 a.m. hasta las 4:00 p.m.',
      categoria: 'proceso_electoral',
      position: 'left',
      isElectionDay: true
    },
    {
      id: 7,
      fecha: '28 de Octubre',
      titulo: 'Escrutinio y Conteo de Votos',
      descripcion: 'Inicio del proceso de conteo oficial de votos a nivel nacional.',
      categoria: 'proceso_electoral',
      position: 'right'
    },
    {
      id: 8,
      fecha: '01 de Noviembre',
      titulo: 'Publicación de Resultados Preliminares',
      descripcion: 'Anuncio de los primeros resultados oficiales del proceso electoral.',
      categoria: 'proceso_electoral',
      position: 'left'
    },
    {
      id: 9,
      fecha: '05 de Noviembre',
      titulo: 'Capacitación Adicional Miembros de Mesa',
      descripcion: 'Sesiones de refuerzo para miembros de mesa en zonas rurales.',
      categoria: 'miembros_mesa',
      position: 'right'
    },
    {
      id: 10,
      fecha: '10 de Noviembre',
      titulo: 'Sorteo de Miembros de Mesa Regional',
      descripcion: 'Selección adicional de jurados para mesas de votación en distritos remotos.',
      categoria: 'miembros_mesa',
      position: 'left'
    }
  ];

  const filteredEvents = activeFilter === 'todas'
    ? timelineEvents
    : timelineEvents.filter(event => event.categoria === activeFilter);

  // Filtrar mesas de votación
  const mesasFiltradas = mesasData.filter(mesa => {
    const coincideBusqueda = mesaBusqueda === '' ||
      mesa.local.toLowerCase().includes(mesaBusqueda.toLowerCase()) ||
      mesa.direccion.toLowerCase().includes(mesaBusqueda.toLowerCase()) ||
      mesa.distrito.toLowerCase().includes(mesaBusqueda.toLowerCase());

    const coincideFiltros =
      (mesaFilter.departamento === '' || mesa.departamento === mesaFilter.departamento) &&
      (mesaFilter.provincia === '' || mesa.provincia === mesaFilter.provincia) &&
      (mesaFilter.distrito === '' || mesa.distrito === mesaFilter.distrito);

    return coincideBusqueda && coincideFiltros;
  });

  // Obtener opciones únicas para filtros
  const departamentos = [...new Set(mesasData.map(m => m.departamento))];
  const provincias = [...new Set(mesasData.filter(m => mesaFilter.departamento === '' || m.departamento === mesaFilter.departamento).map(m => m.provincia))];
  const distritos = [...new Set(mesasData.filter(m => (mesaFilter.departamento === '' || m.departamento === mesaFilter.departamento) && (mesaFilter.provincia === '' || m.provincia === mesaFilter.provincia)).map(m => m.distrito))];

  const handleMesaFilterChange = (campo: string, valor: string) => {
    setMesaFilter(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <main className="flex flex-1 justify-center">
        <div className="flex w-full max-w-6xl flex-col px-6 py-10 md:py-16">
          <AnunciosCarousel />

          <section className="flex flex-col gap-10 py-16 md:py-24">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 @[480px]:text-4xl">Calendario Electoral</h1>
              <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">No te pierdas ninguna fecha importante. Consulta aquí los hitos clave del proceso electoral.</p>
            </div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-primary/20 bg-primary/10 p-6 text-center dark:border-primary/30 dark:bg-primary/20 md:p-8">
                <p className="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-300">Próxima Gran Fecha</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">Día de las Elecciones</h3>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 md:text-2xl">Domingo, 27 de Octubre</p>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900/50 md:flex-row md:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-primary dark:text-blue-300">notifications_active</span>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">Activa tus recordatorios</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Recibe notificaciones para no olvidar las fechas clave.</p>
                    </div>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 md:w-auto">
                    <span className="material-symbols-outlined text-lg">manage_history</span>
                    <span>Gestionar Recordatorios</span>
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 rounded-full bg-gray-200/80 p-1.5 dark:bg-gray-800/80">
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeFilter === 'todas'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveFilter('todas')}
                  >
                    Todas las fechas
                  </button>
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeFilter === 'proceso_electoral'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveFilter('proceso_electoral')}
                  >
                    Proceso Electoral
                  </button>
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeFilter === 'miembros_mesa'
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveFilter('miembros_mesa')}
                  >
                    Miembros de Mesa
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-ml-0.5"></div>
                  <div className="relative flex flex-col gap-8">
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`group relative flex w-full items-start gap-6 md:w-auto ${
                          event.position === 'left' ? 'md:self-end' : ''
                        }`}
                      >
                        <div className={`absolute left-4 top-4 -ml-2 h-4 w-4 rounded-full border-4 border-background-light md:left-1/2 md:-ml-2 ${
                          event.isElectionDay
                            ? 'bg-green-500 dark:border-background-dark'
                            : 'bg-primary dark:border-background-dark'
                        }`}></div>
                        <div className={`flex w-full flex-col gap-1 pl-10 md:w-1/2 ${
                          event.position === 'right' ? 'md:pr-10' : 'md:pl-10'
                        }`}>
                          <div className={`flex flex-col gap-1.5 ${
                            event.position === 'right' ? 'md:items-end md:text-right' : ''
                          }`}>
                            <p className={`text-sm font-medium ${
                              event.isElectionDay
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {event.fecha}
                            </p>
                            <h4 className="font-bold text-gray-800 dark:text-gray-200">{event.titulo}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.descripcion}</p>
                          </div>
                          <button className={`mt-3 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            event.isElectionDay
                              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                          } ${event.position === 'right' ? 'md:self-end' : ''}`}>
                            <span className="material-symbols-outlined text-base">
                              {event.isElectionDay ? 'notifications_active' : 'add_alert'}
                            </span>
                            <span>{event.isElectionDay ? 'Recordatorio activo' : 'Añadir recordatorio'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-10 px-0 pb-16 pt-0 @container md:pb-24">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 @[480px]:text-4xl">Herramientas para un Voto Informado</h1>
              <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">Accede a toda la información que necesitas para tomar la mejor decisión en las próximas elecciones.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div
                className="flex flex-1 transform flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-transform hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/50 cursor-pointer"
                onClick={() => setShowMesas(!showMesas)}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-2xl">where_to_vote</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100">Encuentra tu Mesa de Votación</h2>
                  <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">Localiza tu centro de votación de forma rápida y sencilla para que sepas exactamente a dónde ir.</p>
                </div>
              </div>
              <div
                className="flex flex-1 transform flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-transform hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/50 cursor-pointer"
                onClick={() => setShowCandidateComparison(!showCandidateComparison)}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100">Compara Candidatos</h2>
                  <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">Visualiza perfiles, propuestas y trayectorias de los candidatos para comparar sus posturas.</p>
                </div>
              </div>
              <div
                className="flex flex-1 transform flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-transform hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/50 cursor-pointer"
                onClick={() => setShowEncuestas(!showEncuestas)}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-2xl">poll</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-gray-100">Explora las Encuestas</h2>
                  <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">Consulta las últimas encuestas de opinión pública y sigue las tendencias electorales.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Comparación de Candidatos */}
          {showCandidateComparison && <CandidateComparison />}

          {/* Sección de Encuestas */}
          {showEncuestas && <EncuestasSection />}

          {/* Sección de Mesas de Votación */}
          {showMesas && (
            <section className="flex flex-col gap-10 py-16 md:py-24">
              <div className="flex flex-col gap-4 text-center">
                <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 @[480px]:text-4xl">Encuentra tu Mesa de Votación</h1>
                <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">Localiza rápidamente tu centro de votación. Ingresa tu dirección o utiliza los filtros para encontrar tu mesa electoral.</p>
              </div>

              {/* Barra de búsqueda y filtros */}
              <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-900/50">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Buscar por local, dirección o distrito..."
                      value={mesaBusqueda}
                      onChange={(e) => setMesaBusqueda(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined mr-2">buscar</span>
                    Buscar
                  </button>
                </div>

                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={mesaFilter.departamento}
                    onChange={(e) => handleMesaFilterChange('departamento', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Todos los departamentos</option>
                    {departamentos.map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>

                  <select
                    value={mesaFilter.provincia}
                    onChange={(e) => handleMesaFilterChange('provincia', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Todas las provincias</option>
                    {provincias.map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>

                  <select
                    value={mesaFilter.distrito}
                    onChange={(e) => handleMesaFilterChange('distrito', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Todos los distritos</option>
                    {distritos.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setMesaFilter({ departamento: '', provincia: '', distrito: '' })}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>

              {/* Resultados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mesasFiltradas.slice(0, 6).map(mesa => (
                  <div key={mesa.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-900/50">
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
                          {mesa.accesibilidad.rampa && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded dark:bg-green-900 dark:text-green-300">
                              <span className="material-symbols-outlined text-sm">accessible</span>
                              Rampa
                            </span>
                          )}
                          {mesa.accesibilidad.ascensor && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded dark:bg-green-900 dark:text-green-300">
                              <span className="material-symbols-outlined text-sm">elevator</span>
                              Ascensor
                            </span>
                          )}
                          {mesa.accesibilidad.estacionamiento && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded dark:bg-green-900 dark:text-green-300">
                              <span className="material-symbols-outlined text-sm">local_parking</span>
                              Estacionamiento
                            </span>
                          )}
                          {mesa.accesibilidad.baños_adaptados && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded dark:bg-green-900 dark:text-green-300">
                              <span className="material-symbols-outlined text-sm">wc</span>
                              Baños adaptados
                            </span>
                          )}
                          {!mesa.accesibilidad.rampa && !mesa.accesibilidad.ascensor && !mesa.accesibilidad.estacionamiento && !mesa.accesibilidad.baños_adaptados && (
                            <span className="text-xs text-gray-500 dark:text-gray-500">Sin información de accesibilidad</span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors">
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
                ))}
              </div>

              {mesasFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 dark:text-gray-600">search_off</span>
                  <h3 className="text-xl font-medium text-gray-600 mb-2 dark:text-gray-400">No se encontraron mesas</h3>
                  <p className="text-gray-500 dark:text-gray-500">Intenta ajustar tus filtros o búsqueda</p>
                </div>
              )}

              {mesasFiltradas.length > 6 && (
                <div className="text-center">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Ver todas las mesas ({mesasFiltradas.length})
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
