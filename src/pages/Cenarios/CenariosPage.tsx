import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import type { Page, Prato } from '../../types';
import { ArrowLeft, CheckCircle } from 'lucide-react';

import { ControlesCenario } from './ControlesCenario';
import { FeedbackCenario } from './FeedbackCenario';

interface CenariosPageProps {
    navigateTo: (page: Page) => void;
    pratoOriginal: Prato;
    onApplyScenario: (pratoAtualizado: Prato) => void;
}

const ComparativoCard = ({ title, valor, cor = 'text-gray-800' }: { title: string, valor: string, cor?: string }) => (
    <div className="bg-gray-100 p-3 rounded-lg">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold ${cor}`}>{valor}</p>
    </div>
);

export const CenariosPage: React.FC<CenariosPageProps> = ({ navigateTo, pratoOriginal, onApplyScenario }) => {
    // Estados para os controles do cenário
    const [aumentoCusto, setAumentoCusto] = useState(0);
    const [desconto, setDesconto] = useState(0);

    // Lógica para calcular o prato simulado
    const pratoSimulado = useMemo(() => {
        const custoOriginal = pratoOriginal.precoVenda * (1 - pratoOriginal.margem / 100);
        const novoCusto = custoOriginal * (1 + aumentoCusto / 100);
        const novoPrecoVenda = pratoOriginal.precoVenda * (1 - desconto / 100);
        
        const novoLucro = novoPrecoVenda - novoCusto;
        const novaMargem = novoPrecoVenda > 0 ? (novoLucro / novoPrecoVenda) * 100 : 0;
        
        const novoStatus = (novaMargem < 0 ? 'prejuizo' : novaMargem < 15 ? 'atencao' : 'ok') as Prato['status'];

        return {
            ...pratoOriginal,
            precoVenda: novoPrecoVenda,
            margem: novaMargem,
            status: novoStatus,
        };
    }, [pratoOriginal, aumentoCusto, desconto]);
    
    const handleAplicar = () => {
        onApplyScenario(pratoSimulado);
        navigateTo('listaPratos');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="cenarios" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto">
                    <button onClick={() => navigateTo('listaPratos')} className="flex items-center gap-2 text-green-600 font-medium mb-6 hover:underline">
                        <ArrowLeft size={18} />
                        Voltar para a Lista de Pratos
                    </button>
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">Análise de Cenários</h2>
                        <p className="text-lg text-gray-600 mt-2">Simule o impacto de mudanças no prato: <span className="font-bold text-green-700">{pratoOriginal.nome}</span></p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Coluna de Controles e Feedback */}
                        <div>
                            <ControlesCenario 
                                aumentoCusto={aumentoCusto}
                                setAumentoCusto={setAumentoCusto}
                                desconto={desconto}
                                setDesconto={setDesconto}
                            />
                            <FeedbackCenario
                                margemOriginal={pratoOriginal.margem}
                                margemSimulada={pratoSimulado.margem}
                            />
                        </div>

                        {/* Coluna de Comparação */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                            <h3 className="text-xl font-bold text-gray-700 mb-4">Comparativo: Antes vs. Depois</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Antes */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-center text-gray-500">Cenário Atual</h4>
                                    <ComparativoCard title="Preço de Venda" valor={`R$ ${pratoOriginal.precoVenda.toFixed(2)}`} />
                                    <ComparativoCard title="Margem de Lucro" valor={`${pratoOriginal.margem.toFixed(1)}%`} cor={pratoOriginal.margem > 0 ? 'text-green-600' : 'text-red-600'} />
                                </div>
                                {/* Depois */}
                                <div className="space-y-3">
                                     <h4 className="font-bold text-center text-blue-600">Cenário Simulado</h4>
                                     <ComparativoCard title="Novo Preço" valor={`R$ ${pratoSimulado.precoVenda.toFixed(2)}`} cor="text-blue-600" />
                                     <ComparativoCard title="Nova Margem" valor={`${pratoSimulado.margem.toFixed(1)}%`} cor={pratoSimulado.margem > 0 ? 'text-green-600' : 'text-red-600'} />
                                </div>
                            </div>
                            <button 
                                onClick={handleAplicar}
                                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={20}/>
                                Aplicar Cenário ao Prato Real
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};