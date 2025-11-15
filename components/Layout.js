import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Voto 2026</title>
        <meta name="description" content="Consulta Electoral 2026" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600">Voto 2026</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2026 Voto 2026. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
