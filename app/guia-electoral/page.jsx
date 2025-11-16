"use client";

export default function GuiaElectoralPage() {
  return (

    <div className="w-full min-h-screen bg-white text-black opacity-100">
    <div className="font-display bg-background-light min-h-screen text-text-light-primary">
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* Contenedor principal */}
        <div className="flex flex-col flex-1">

       
          {/* Contenido */}
          <main className="px-2 sm:px-4 py-8 flex-1">

            {/* Título */}
            <div className="flex flex-wrap justify-between gap-4 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-4xl font-black tracking-[-0.033em]">
                  Guía Educativa del Proceso Electoral
                </p>
                <p className="text-text-light-secondary">
                  Todo lo que necesitas saber para participar en las elecciones de manera informada y segura.
                </p>
              </div>
              

            <div className="hidden md:flex">
              <button className="h-10 px-4 rounded-lg bg-primary text-white font-bold">
                Descargar Guía (PDF)
              </button>
            </div>
            </div>

            {/* Progreso */}
            <div className="flex flex-col gap-3 p-4">
              <p className="text-base font-medium">Tu Progreso en la Guía</p>
              <div className="rounded-full bg-border-light">
                <div className="h-2 rounded-full bg-primary" style={{ width: "66%" }}></div>
              </div>
            </div>

            {/* Acordeones */}
            <div className="flex flex-col p-4 gap-3">

              {/* Acordeón 1 */}
              <details className="rounded-lg border border-border-light bg-background-light px-[15px] py-[7px]">
                <summary className="cursor-pointer flex items-center justify-between py-2 list-none">
                  <p className="text-base font-bold">El Proceso Electoral General</p>
                  <span className="material-symbols-outlined transition-transform">expand_more</span>
                </summary>

                <p className="text-text-light-secondary text-sm border-t border-border-light pt-2 pb-2">
                  Una introducción a las fases clave del proceso electoral: convocatoria, inscripción, campaña, día de la votación y escrutinio.
                </p>
              </details>

              {/* Acordeón 2 */}
              <details className="rounded-lg border border-border-light bg-white px-[15px] py-[7px] shadow-sm" open>
                <summary className="cursor-pointer flex items-center justify-between py-2 list-none">
                  <p className="text-base font-bold">Guía Práctica: ¿Cómo Votar?</p>
                  <span className="material-symbols-outlined transition-transform">expand_more</span>
                </summary>

                <div className="text-sm text-text-light-secondary border-t border-border-light pt-2 pb-2">
                  <p className="mb-4">
                    Sigue estos pasos el día de la votación para asegurar que tu voto sea contado correctamente.
                  </p>

                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">

                    {/* Elementos de la guía */}
                    {[
                      {
                        icon: "location_on",
                        title: "Verifica tu centro de votación",
                        desc: "Confirma dónde te toca votar y lleva tu documento de identidad."
                      },
                      {
                        icon: "account_circle",
                        title: "Identifícate en la mesa",
                        desc: "Presenta tu identificación para recibir la cédula."
                      },
                      {
                        icon: "check_box",
                        title: "Marca tu voto en la cabina",
                        desc: "Asegúrate de marcar correctamente."
                      },
                      {
                        icon: "archive",
                        title: "Deposita tu voto en la urna",
                        desc: "Dobla tu cédula y deposítala en la urna."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-3 border border-border-light bg-background-light p-4 rounded-lg">
                        <div className="text-primary">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <h2 className="text-base font-bold">{item.title}</h2>
                        <p className="text-sm text-text-light-secondary">{item.desc}</p>
                      </div>
                    ))}

                  </div>
                </div>
              </details>

              {/* Acordeón 3 */}
              <details className="rounded-lg border border-border-light bg-background-light px-[15px] py-[7px]">
                <summary className="cursor-pointer flex items-center justify-between py-2 list-none">
                  <p className="text-base font-bold">Responsabilidades de los Miembros de Mesa</p>
                  <span className="material-symbols-outlined transition-transform">expand_more</span>
                </summary>
                <p className="text-text-light-secondary text-sm border-t border-border-light pt-2 pb-2">
                  Descubre el rol fundamental de los miembros de mesa y sus tareas principales.
                </p>
              </details>

            </div>

            {/* Botones Inferiores */}
            <div className="flex justify-between p-4 mt-4">
              <button className="flex items-center gap-2 border border-border-light bg-white text-text-light-secondary px-4 py-2 rounded-lg">
                <span className="material-symbols-outlined">arrow_back</span> Anterior
              </button>

              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg">
                Siguiente <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
    </div>
  );
}
