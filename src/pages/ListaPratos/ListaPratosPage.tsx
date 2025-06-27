import { PlusCircle, Settings, Trash2, BarChartHorizontal } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import type { Prato, Page } from "../../types";

interface ListaPratosPageProps {
  navigateTo: (page: Page, prato?: Prato) => void;
  pratos: Prato[];
  onDelete: (id: number) => void;
}

export const ListaPratosPage = ({
  navigateTo,
  pratos,
  onDelete,
}: ListaPratosPageProps) => {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroRentabilidade, setFiltroRentabilidade] = useState("todos");

  const categorias = ["todos", ...new Set(pratos.map((p) => p.categoria))];

  const pratosFiltrados = pratos.filter((p) => {
    const porCategoria =
      filtroCategoria === "todos" || p.categoria === filtroCategoria;
    const porRentabilidade =
      filtroRentabilidade === "todos" || p.status === filtroRentabilidade;
    return porCategoria && porRentabilidade;
  });

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "prejuizo":
        return (
          <span className="px-2 py-1 text-xs font-bold text-red-800 bg-red-200 rounded-full">
            Prejuízo
          </span>
        );
      case "atencao":
        return (
          <span className="px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-200 rounded-full">
            Atenção
          </span>
        );
      case "ok":
        return (
          <span className="px-2 py-1 text-xs font-bold text-green-800 bg-green-200 rounded-full">
            OK
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar navigateTo={navigateTo} activePage="listaPratos" />
      <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-10">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div className="mt-12 lg:mt-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Meus Pratos</h2>
              <p className="text-gray-600">
                Gerencie, edite e analise todos os seus pratos cadastrados.
              </p>
            </div>
            <button
              onClick={() => navigateTo("simulador")}
              className="w-full sm:w-auto bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} />
              <span className="hidden sm:inline">Simular Novo Prato</span>
              <span className="sm:hidden">Novo Prato</span>
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "todos" ? "Todas as Categorias" : cat}
                  </option>
                ))}
              </select>
              <select
                value={filtroRentabilidade}
                onChange={(e) => setFiltroRentabilidade(e.target.value)}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
              >
                <option value="todos">Toda Rentabilidade</option>
                <option value="ok">Margem OK</option>
                <option value="atencao">Margem Baixa (Atenção)</option>
                <option value="prejuizo">Prejuízo</option>
              </select>
            </div>

            <div className="overflow-x-auto table-scroll">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500">
                      Nome do Prato
                    </th>
                    <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500 hidden sm:table-cell">
                      Categoria
                    </th>
                    <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500">
                      Preço
                    </th>
                    <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500">
                      Margem
                    </th>
                    <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500 hidden md:table-cell">
                      Status
                    </th>
                    <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500 text-center">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pratosFiltrados.map((prato) => (
                    <tr
                      key={prato.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-2 sm:p-3 font-medium text-gray-800 text-sm">
                        <div>
                          {prato.nome}
                          <div className="sm:hidden text-xs text-gray-500 mt-1">{prato.categoria}</div>
                          <div className="md:hidden mt-1">{getStatusIndicator(prato.status)}</div>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-gray-600 text-sm hidden sm:table-cell">{prato.categoria}</td>
                      <td className="p-2 sm:p-3 font-medium text-gray-800 text-sm">
                        R$ {prato.precoVenda.toFixed(2)}
                      </td>
                      <td
                        className={`p-2 sm:p-3 font-bold text-sm ${
                          prato.margem < 0 ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {prato.margem}%
                      </td>
                      <td className="p-2 sm:p-3 hidden md:table-cell">
                        {getStatusIndicator(prato.status)}
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => navigateTo("cenarios", prato)}
                            className="text-purple-600 p-1 sm:p-2 rounded-full hover:bg-purple-100"
                            title="Análise de Cenários"
                          >
                            <BarChartHorizontal size={16} />
                          </button>
                          <button
                            onClick={() => navigateTo("simulador", prato)}
                            className="text-blue-600 p-1 sm:p-2 rounded-full hover:bg-blue-100"
                            title="Editar/Simular"
                          >
                            <Settings size={16} />
                          </button>
                          <button
                            onClick={() => onDelete(prato.id)}
                            className="text-red-600 p-1 sm:p-2 rounded-full hover:bg-red-100"
                            title="Deletar"
                          >
                            <Trash2 size={16} />
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
