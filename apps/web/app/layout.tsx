import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'PORTECOS ACADEMIC IA — Formação Técnica com IA para Angola',
  description:
    'Plataforma de formação técnica com Inteligência Artificial para o mercado angolano. Engenharia Civil, Petróleo & Gás, Energias Renováveis e muito mais.',
  keywords: 'formação técnica, angola, engenharia, IA, cursos online, luanda',
  openGraph: {
    title: 'PORTECOS ACADEMIC IA',
    description: 'Formação técnica com IA para o mercado angolano',
    locale: 'pt_AO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-AO">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <footer className="bg-blue-900 text-white py-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-yellow-400 text-lg mb-2">PORTECOS ACADEMIC IA</h3>
              <p className="text-blue-200 text-sm">
                Transformando a formação técnica em Angola com Inteligência Artificial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-yellow-400">Áreas</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>Engenharia Civil</li>
                <li>Petróleo & Gás</li>
                <li>Energias Renováveis</li>
                <li>Inteligência Artificial</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-yellow-400">Contacto</h4>
              <p className="text-blue-200 text-sm">info@portecosacademic.ao</p>
              <p className="text-blue-200 text-sm">Luanda, Angola 🇦🇴</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-blue-800 text-center text-blue-300 text-sm">
            © {new Date().getFullYear()} PORTECOS ACADEMIC IA. Todos os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
