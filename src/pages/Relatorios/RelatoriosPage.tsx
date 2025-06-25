import { FileDown } from "lucide-react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from "recharts";
import { Sidebar } from "../../components/Sidebar";
import type { Page, Prato } from "../../types";

interface RelatoriosPageProps {
  navigateTo: (page: Page, prato?: Prato) => void;
  pratos: Prato[];
}

export const RelatoriosPage = ({ navigateTo, pratos }: RelatoriosPageProps) => {
    const dataComparacao = pratos.map(p => ({
        name: p.nome.substring(0, 15) + '...',
        custo: (p.precoVenda * (1 - p.margem / 100)).toFixed(2),
        lucro: (p.precoVenda * (p.margem / 100)).toFixed(2),
    }));

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="relatorios" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                           <h2 className="text-3xl font-bold text-gray-800">Relatórios e Análises</h2>
                           <p className="text-gray-600">Visualize dados, compare pratos e exporte informações.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition font-bold flex items-center gap-2">
                           <FileDown size={20} />
                           Exportar Relatório PDF
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Comparativo de Rentabilidade por Prato</h3>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={dataComparacao}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `R$ ${value}`} />
                                    <Legend />
                                    <Bar dataKey="custo" stackId="a" fill="#FF8042" name="Custo Total" />
                                    <Bar dataKey="lucro" stackId="a" fill="#00C49F" name="Lucro Bruto" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}