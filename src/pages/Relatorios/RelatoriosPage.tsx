import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import type { Page, Prato, PratoStatus } from '../../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileDown, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// CORES PARA OS GRÁFICOS
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface RelatoriosPageProps {
    navigateTo: (page: Page) => void;
    pratos: Prato[];
}

// Função auxiliar para simular uma composição de custos mais detalhada
const getPratoCostDetails = (prato: Prato) => {
    const custoTotal = prato.precoVenda * (1 - (prato.margem / 100));
    // Suposições para o protótipo
    const custoIngredientes = custoTotal * 0.60; // 60% do custo
    const taxaApp = prato.precoVenda * 0.22; // Suposição de taxa fixa para o cálculo
    const outrosCustos = custoTotal - custoIngredientes; // Embalagem, mão de obra, etc.
    const lucro = prato.precoVenda - custoTotal - taxaApp;

    return [
        { name: 'Ingredientes', value: parseFloat(custoIngredientes.toFixed(2)) },
        { name: 'Taxa App', value: parseFloat(taxaApp.toFixed(2)) },
        { name: 'Outros Custos', value: parseFloat(outrosCustos.toFixed(2)) },
        { name: 'Lucro', value: parseFloat(Math.max(0, lucro).toFixed(2)) },
    ].filter(item => item.value > 0);
};

export const RelatoriosPage: React.FC<RelatoriosPageProps> = ({ navigateTo, pratos }) => {
    // Estados dos filtros e seleção
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [filtroRentabilidade, setFiltroRentabilidade] = useState<PratoStatus | 'todos'>('todos');
    const [selectedPratoId, setSelectedPratoId] = useState<number | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const categoriasUnicas = useMemo(() => ['todos', ...new Set(pratos.map(p => p.categoria))], [pratos]);
    
    const pratosFiltrados = useMemo(() => {
        return pratos.filter(p => {
            const porCategoria = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
            const porRentabilidade = filtroRentabilidade === 'todos' || p.status === filtroRentabilidade;
            return porCategoria && porRentabilidade;
        });
    }, [pratos, filtroCategoria, filtroRentabilidade]);

    const selectedPrato = useMemo(() => pratos.find(p => p.id === selectedPratoId), [pratos, selectedPratoId]);

    const getStatusIndicator = (status: PratoStatus) => {
      switch (status) {
        case 'prejuizo': return { text: "Prejuízo", color: "bg-red-200 text-red-800" };
        case 'atencao': return { text: "Atenção", color: "bg-yellow-200 text-yellow-800" };
        case 'ok': return { text: "OK", color: "bg-green-200 text-green-800" };
      }
    };
    
    // Função para gerar e baixar o relatório em PDF
    const handleGeneratePdf = () => {
        setIsGeneratingPdf(true);
        
        // Simula um pequeno atraso para o feedback visual
        setTimeout(() => {
            const doc = new jsPDF();
            
            // Título do Relatório
            doc.setFontSize(18);
            doc.text("Relatório de Rentabilidade de Pratos", 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);
            doc.text(`Relatório gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 28);
            
            // Filtros aplicados
            const filtros = `Filtros: Categoria (${filtroCategoria}), Rentabilidade (${filtroRentabilidade})`;
            doc.text(filtros, 14, 34);

            // Tabela com os dados dos pratos filtrados
            const tableColumn = ["ID", "Nome do Prato", "Categoria", "Preço Venda", "Margem", "Status"];
            const tableRows: (string | number)[][] = [];

            pratosFiltrados.forEach(prato => {
                const pratoData = [
                    prato.id,
                    prato.nome,
                    prato.categoria,
                    `R$ ${prato.precoVenda.toFixed(2)}`,
                    `${prato.margem.toFixed(1)}%`,
                    getStatusIndicator(prato.status).text
                ];
                tableRows.push(pratoData);
            });

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 40,
            });

            // Alertas e Feedbacks
            const pratosPrejuizo = pratosFiltrados.filter(p => p.status === 'prejuizo');
            if(pratosPrejuizo.length > 0) {
                const finalY = (doc as any).lastAutoTable.finalY || 10;
                doc.setFontSize(12);
                doc.setTextColor(200, 0, 0);
                doc.text(`Alerta: ${pratosPrejuizo.length} prato(s) estão gerando prejuízo!`, 14, finalY + 10);
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text("Recomenda-se revisar o custo e o preço de venda destes itens com urgência.", 14, finalY + 15);
            }

            doc.save(`relatorio_calcula_delivery_${Date.now()}.pdf`);
            setIsGeneratingPdf(false);
        }, 1000);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="relatorios" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Relatórios e Análises</h2>
                    <p className="text-gray-600 mb-8">Filtre seus pratos, analise a composição de custos e exporte seus dados.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Coluna de Filtros e Lista */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md self-start">
                            <h3 className="font-bold text-lg mb-4">Filtros</h3>
                            <div className="space-y-4 mb-6">
                                <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                                    {categoriasUnicas.map(cat => <option key={cat} value={cat}>{cat === 'todos' ? 'Todas as Categorias' : cat}</option>)}
                                </select>
                                <select value={filtroRentabilidade} onChange={e => setFiltroRentabilidade(e.target.value as any)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                                    <option value="todos">Toda Rentabilidade</option>
                                    <option value="ok">Margem OK</option>
                                    <option value="atencao">Margem Baixa (Atenção)</option>
                                    <option value="prejuizo">Prejuízo</option>
                                </select>
                            </div>
                            <button
                                onClick={handleGeneratePdf}
                                disabled={isGeneratingPdf}
                                className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition font-bold flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-wait"
                            >
                                {isGeneratingPdf ? <Loader2 className="animate-spin" /> : <FileDown size={20} />}
                                {isGeneratingPdf ? 'Gerando PDF...' : `Exportar ${pratosFiltrados.length} Pratos`}
                            </button>
                            <hr className="my-6" />
                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {pratosFiltrados.map(prato => (
                                    <div
                                        key={prato.id}
                                        onClick={() => setSelectedPratoId(prato.id)}
                                        className={`p-3 rounded-lg cursor-pointer transition-all ${selectedPratoId === prato.id ? 'bg-green-100 ring-2 ring-green-500' : 'hover:bg-gray-100'}`}
                                    >
                                        <p className="font-bold text-gray-800">{prato.nome}</p>
                                        <div className="flex justify-between items-center text-sm mt-1">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusIndicator(prato.status).color}`}>{getStatusIndicator(prato.status).text}</span>
                                            <span className={`font-bold ${prato.margem < 0 ? 'text-red-500' : 'text-green-600'}`}>Margem: {prato.margem}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coluna de Análise e Gráficos */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md min-h-[500px]">
                            {selectedPrato ? (
                                <div>
                                    <h3 className="font-bold text-2xl text-center mb-1">{selectedPrato.nome}</h3>
                                    <p className="text-center text-gray-500 mb-4">Composição do Preço de Venda</p>
                                    <div className="h-96">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={getPratoCostDetails(selectedPrato)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                                    {getPratoCostDetails(selectedPrato).map((_entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-bold text-2xl text-center mb-1">Análise Geral</h3>
                                    <p className="text-center text-gray-500 mb-4">Selecione um prato na lista para ver detalhes</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
