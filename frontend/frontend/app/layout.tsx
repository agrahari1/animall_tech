import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
 import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Milking Harmony | Smart Dairy Tracker',
  description: 'Transform milking sessions with calming music and smart tracking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-white`}>
    
          <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl">
            <div className="container mx-auto px-4 py-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#3B82F6"/>
                      <path d="M12 6a6 6 0 110 12 6 6 0 010-12z" fill="white"/>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight">Milking<span className="text-blue-200">Harmony</span></h1>
                </div>
                
                <nav className="flex space-x-1">
                  <a 
                    href="/" 
                    className="flex items-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold">Dashboard</span>
                  </a>
                  
                  <a 
                    href="/history" 
                    className="flex items-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Session History</span>
                  </a>
                  
                 
                </nav>
              </div>
            </div>
          </header>


          <main className="min-h-screen pb-48">
            {children}
          </main>
      </body>
    </html>
  );
}

