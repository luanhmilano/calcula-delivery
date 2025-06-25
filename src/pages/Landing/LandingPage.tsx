import React from 'react';
import { Header } from '../../components/Header';
import { PieChart, BarChart2, Settings } from 'lucide-react';
import type { Page } from '../../types';

interface LandingPageProps {
  navigateTo: (page: Page) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigateTo }) => (
  <>
    <Header navigateTo={navigateTo} user={null} />
    <main>
      <section className="bg-white py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Vende muito e sobra pouco?
            <br />
            <span className="text-green-600">Descubra o porquê.</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            A ferramenta definitiva para donos de delivery que precisam precificar pratos de forma inteligente, rápida e sem complicação.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => navigateTo('simuladorTeste')} className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition shadow-lg">
              Calcule seu Preço Agora!
            </button>
            <button onClick={() => navigateTo('cadastro')} className="w-full sm:w-auto bg-gray-200 text-gray-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-300 transition">
              Crie sua conta grátis
            </button>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Como o CalculaDelivery te ajuda?</h3>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-md text-center">
                      <PieChart className="mx-auto h-12 w-12 text-green-600 mb-4"/>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Precificação Completa</h4>
                      <p className="text-gray-600">Considere todos os seus custos: ingredientes, embalagens, taxas de app, gás, aluguel e até seu tempo.</p>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-md text-center">
                      <BarChart2 className="mx-auto h-12 w-12 text-blue-600 mb-4"/>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Visão Clara do Lucro</h4>
                      <p className="text-gray-600">Saiba exatamente qual a sua margem em cada prato e pare de vender no prejuízo sem perceber.</p>
                  </div>
                   <div className="bg-white p-8 rounded-xl shadow-md text-center">
                      <Settings className="mx-auto h-12 w-12 text-yellow-600 mb-4"/>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Simule Cenários</h4>
                      <p className="text-gray-600">E se o fornecedor aumentar o preço? E se eu fizer uma promoção? Teste hipóteses e tome decisões seguras.</p>
                  </div>
              </div>
          </div>
      </section>
    </main>
  </>
);