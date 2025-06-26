import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import type { Page } from '../types';

const dicas = [
    "Lembre-se de incluir o custo do gás e da energia no seu cálculo.",
    "A taxa do app de delivery incide sobre o preço final de venda, não sobre o custo.",
    "Embalagens podem representar uma fatia considerável do custo. Pesquise fornecedores!",
    "Promoções? Calcule o impacto na sua margem de lucro antes de lançá-las.",
    "Seu tempo é um custo! Defina um valor para sua mão de obra por prato.",
];

interface DicaRapidaFooterProps {
    navigateTo: (page: Page) => void;
}

export const DicaRapidaFooter: React.FC<DicaRapidaFooterProps> = ({ navigateTo }) => {
    const [indiceDica, setIndiceDica] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndiceDica((prevIndice) => (prevIndice + 1) % dicas.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-lg md:pl-64">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Lightbulb className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                    <p className="text-sm md:text-base">
                        <span className="font-bold">Dica Rápida:</span> {dicas[indiceDica]}
                    </p>
                </div>
                <button 
                    onClick={() => navigateTo('aprenda')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-bold text-sm ml-4 flex-shrink-0"
                >
                    Saiba Mais
                </button>
            </div>
        </footer>
    );
};