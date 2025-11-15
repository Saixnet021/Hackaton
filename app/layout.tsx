import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plataforma Electoral",
  description: "La herramienta definitiva para conocer a tus candidatos, encontrar tu mesa y entender las encuestas.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <head>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
        <script>
          {`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    "primary": "#137fec",
                    "background-light": "#f6f7f8",
                    "background-dark": "#101922",
                  },
                  fontFamily: {
                    "display": ["Public Sans"]
                  },
                  borderRadius: {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
                  },
                },
              },
            }
          `}
        </script>
        <style>
          {`
            .material-symbols-outlined {
              font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
          `}
        </style>
      </head>
      <body className="font-display bg-background-light dark:bg-background-dark">
        <div className="relative flex min-h-screen w-full flex-col">
          <header className="sticky top-0 z-50 flex items-center justify-center border-b border-gray-200/50 bg-background-light/80 py-3 backdrop-blur-sm dark:border-gray-800/50 dark:bg-background-dark/80">
            <nav className="flex w-full max-w-6xl items-center justify-between px-6">
              <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
                <span className="material-symbols-outlined text-primary text-3xl">how_to_vote</span>
                <h2 className="text-xl font-bold">Plataforma Electoral</h2>
              </div>
              <div className="hidden items-center gap-9 md:flex">
                <a className="text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="/">Inicio</a>
                <a className="text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="/candidatos">Candidatos</a>
                <a className="text-sm font-medium text-gray-800 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="/calendario">Calendario</a>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-gray-200/60 text-gray-800 transition-colors hover:bg-gray-300/60 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/60">
                  <span className="material-symbols-outlined text-xl">search</span>
                </button>
              </div>
            </nav>
          </header>

          {children}

          <footer className="flex w-full flex-col items-center gap-8 border-t border-gray-200 bg-background-light px-6 py-10 text-center dark:border-gray-800 dark:bg-background-dark @container">
            <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a className="text-base font-normal leading-normal text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Sobre Nosotros</a>
                <a className="text-base font-normal leading-normal text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Contacto</a>
                <a className="text-base font-normal leading-normal text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Política de Privacidad</a>
                <a className="text-base font-normal leading-normal text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Términos de Servicio</a>
              </div>
              <div className="flex justify-center gap-6">
                <a aria-label="Twitter" href="#">
                  <svg className="h-6 w-6 text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.48 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                  </svg>
                </a>
                <a aria-label="Facebook" href="#">
                  <svg className="h-6 w-6 text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10.01 10.01 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path>
                  </svg>
                </a>
                <a aria-label="Instagram" href="#">
                  <svg className="h-6 w-6 text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-500">© 2024 Plataforma Electoral. Todos los derechos reservados.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
