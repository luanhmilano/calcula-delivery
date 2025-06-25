import { PlusCircle, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import type { Prato, Page } from "../../types";

interface ListaPratosPageProps {
  navigateTo: (page: Page, prato?: Prato) => void;
  pratos: Prato[];
  onDelete: (id: number) => void;
}

export const ListaPratosPage = ({ navigateTo, pratos, onDelete }: ListaPratosPageProps) => {
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [filtroRentabilidade, setFiltroRentabilidade] = useState('todos');

    const categorias = ['todos', ...new Set(pratos.map(p => p.categoria))];

    const pratosFiltrados = pratos.filter(p => {
        const porCategoria = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
        const porRentabilidade = filtroRentabilidade === 'todos' || p.status === filtroRentabilidade;
        return porCategoria && porRentabilidade;
    });

    const getStatusIndicator = (status: string) => {
      switch (status) {
        case 'prejuizo': return <span className="px-2 py-1 text-xs font-bold text-red-800 bg-red-200 rounded-full">Prejuízo</span>;
        case 'atencao': return <span className="px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-200 rounded-full">Atenção</span>;
        case 'ok': return <span className="px-2 py-1 text-xs font-bold text-green-800 bg-green-200 rounded-full">OK</span>;
        default: return null;
      }
    };
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="listaPratos" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Meus Pratos</h2>
                            <p className="text-gray-600">Gerencie, edite e analise todos os seus pratos cadastrados.</p>
                        </div>
                        <button onClick={() => navigateTo('simulador')} className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center gap-2">
                            <PlusCircle size={20} />
                            Simular Novo Prato
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} className="w-full sm:w-1/3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                                {categorias.map(cat => <option key={cat} value={cat}>{cat === 'todos' ? 'Todas as Categorias' : cat}</option>)}
                            </select>
                            <select value={filtroRentabilidade} onChange={e => setFiltroRentabilidade(e.target.value)} className="w-full sm:w-1/3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                                <option value="todos">Toda Rentabilidade</option>
                                <option value="ok">Margem OK</option>
                                <option value="atencao">Margem Baixa (Atenção)</option>
                                <option value="prejuizo">Prejuízo</option>
                            </select>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="p-3 text-sm font-semibold text-gray-500">Nome do Prato</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Categoria</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Preço Venda</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Margem</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Status</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pratosFiltrados.map(prato => (
                                        <tr key={prato.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-800">{prato.nome}</td>
                                            <td className="p-3 text-gray-600">{prato.categoria}</td>
                                            <td className="p-3 font-medium text-gray-800">R$ {prato.precoVenda.toFixed(2)}</td>
                                            <td className={`p-3 font-bold ${prato.margem < 0 ? 'text-red-500' : 'text-green-600'}`}>{prato.margem}%</td>
                                            <td className="p-3">{getStatusIndicator(prato.status)}</td>
                                            <td className="p-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => navigateTo('simulador', prato)} className="text-blue-600 p-2 rounded-full hover:bg-blue-100" title="Editar/Simular">
                                                        <Settings size={18} />
                                                    </button>
                                                    <button onClick={() => {onDelete(prato.id)}} className="text-red-600 p-2 rounded-full hover:bg-red-100" title="Deletar">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};