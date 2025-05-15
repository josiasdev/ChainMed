
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <Layout showNav={false}>
      <section className="turingrx-hero py-20 md:py-32 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Prescrições Médicas na Blockchain
            </h1>
            <p className="text-xl mb-10">
              ChainMed revoluciona a forma como médicos prescrevem e pacientes gerenciam seus medicamentos, 
              tudo com a segurança e imutabilidade da tecnologia blockchain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-white text-medical-600 hover:bg-gray-100">
                  Conectar Carteira
                </Button>
              </Link>
              <Button size="lg" className="border-white text-white hover:bg-white/10">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conecte sua Carteira</h3>
              <p className="text-gray-600">
                Médicos e pacientes se conectam de forma segura usando a MetaMask e registram-se na plataforma.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Crie Prescrições</h3>
              <p className="text-gray-600">
                Médicos criam prescrições digitais seguras que são armazenadas permanentemente na blockchain.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Acesse em Qualquer Lugar</h3>
              <p className="text-gray-600">
                Pacientes acessam suas prescrições via QR code e podem compartilhá-las com outros médicos.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-medical-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Por que escolher ChainMed?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left mt-10">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-medical-100 text-medical-600 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Segurança Garantida</h3>
                  <p className="text-gray-600">Seus dados médicos são armazenados na blockchain, garantindo imutabilidade e segurança.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-medical-100 text-medical-600 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Acessibilidade</h3>
                  <p className="text-gray-600">Acesse suas prescrições em qualquer lugar através de QR codes e compartilhe facilmente.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-medical-100 text-medical-600 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transparência</h3>
                  <p className="text-gray-600">Todo histórico médico é rastreável e verificável na blockchain Sepolia.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-medical-100 text-medical-600 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Facilidade de Uso</h3>
                  <p className="text-gray-600">Interface intuitiva desenvolvida para médicos e pacientes de todas as idades.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <Link to="/login">
                <Button size="lg" className="bg-medical-500 text-white hover:bg-medical-600">
                  Comece Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
