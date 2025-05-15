
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Image } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout = ({ children, showNav = true }: LayoutProps) => {
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem('turingrx-user');
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-medical-500 rounded-md flex items-center justify-center">
              <img src="/public/favicon.ico" width={25} height={25} alt="icone"/>
            </div>
            <span className="font-bold text-xl text-medical-600">ChainMed</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {!isLoggedIn && location.pathname !== '/login' && (
              <Link to="/login">
                <Button variant="outline">Conectar</Button>
              </Link>
            )}
            {isLoggedIn && (
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem('turingrx-user');
                  window.location.href = '/';
                }}
              >
                Desconectar
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {showNav && isLoggedIn && (
        <nav className="bg-white border-b border-border shadow-sm">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-6">
              {JSON.parse(isLoggedIn || '{}').userType === 'doctor' ? (
                <>
                  <li>
                    <Link 
                      to="/doctor/prescriptions/new" 
                      className={`py-3 inline-block ${location.pathname === '/doctor/prescriptions/new' ? 'text-medical-600 border-b-2 border-medical-500 font-medium' : 'text-gray-600 hover:text-medical-600'}`}
                    >
                      Nova Prescrição
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/doctor/prescriptions" 
                      className={`py-3 inline-block ${location.pathname === '/doctor/prescriptions' ? 'text-medical-600 border-b-2 border-medical-500 font-medium' : 'text-gray-600 hover:text-medical-600'}`}
                    >
                      Minhas Prescrições
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/doctor/shared" 
                      className={`py-3 inline-block ${location.pathname === '/doctor/shared' ? 'text-medical-600 border-b-2 border-medical-500 font-medium' : 'text-gray-600 hover:text-medical-600'}`}
                    >
                      Compartilhadas
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/patient/prescriptions" 
                      className={`py-3 inline-block ${location.pathname === '/patient/prescriptions' ? 'text-medical-600 border-b-2 border-medical-500 font-medium' : 'text-gray-600 hover:text-medical-600'}`}
                    >
                      Minhas Prescrições
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/patient/shared" 
                      className={`py-3 inline-block ${location.pathname === '/patient/shared' ? 'text-medical-600 border-b-2 border-medical-500 font-medium' : 'text-gray-600 hover:text-medical-600'}`}
                    >
                      Compartilhadas
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/patient/share" 
                      className={`py-3 inline-block ${location.pathname === '/patient/share' ? 'text-medical-600 border-b-2 border-medical-500 font-medium' : 'text-gray-600 hover:text-medical-600'}`}
                    >
                      Compartilhar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t border-border">
        <div className="container mx-auto py-6 px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ChainMed - Plataforma de Prescrições Médicas com Blockchain
        </div>
      </footer>
    </div>
  );
};

export default Layout;
