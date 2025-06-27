import { DashboardCard } from "../../components/DashboardCard";
import { Sidebar } from "../../components/Sidebar";
import { DicaRapidaFooter } from "../../components/DicaRapidaFooter";
import { PieChartIcon, BarChart2, DollarSign, PlusCircle } from "lucide-react";
import type { Page, Prato, User, PratoStatus } from "../../types";

interface DashboardProps {
    navigateTo: (page: Page, prato?: Prato) => void;
    user: User;
    pratos: Prato[];
    onLogout?: () => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ navigateTo, user, pratos }) => {
    const pratosComPrejuizo = pratos.filter(p => p.status === 'prejuizo').length;
    const margemMedia = pratos.length > 0 ? (pratos.reduce((acc, p) => acc + p.margem, 0) / pratos.length).toFixed(0) : 0;
    const ultimosPratos = [...pratos].reverse().slice(0, 5);

    const getStatusIndicator = (status: PratoStatus) => {
      switch (status) {
        case 'prejuizo': return <span className="px-2 py-1 text-xs font-bold text-red-800 bg-red-200 rounded-full">Prejuízo</span>;
        case 'atencao': return <span className="px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-200 rounded-full">Atenção</span>;
        case 'ok': return <span className="px-2 py-1 text-xs font-bold text-green-800 bg-green-200 rounded-full">OK</span>;
        default: return null;
      }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="dashboard" />
            <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-10 pb-24">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                        <div className="mt-12 lg:mt-0">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600">Resumo da saúde financeira do seu negócio, {user.nome}.</p>
                        </div>
                        <button onClick={() => navigateTo('simulador')} className="w-full sm:w-auto bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center justify-center gap-2">
                            <PlusCircle size={20} />
                            <span className="hidden sm:inline">Simular Novo Prato</span>
                            <span className="sm:hidden">Novo Prato</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <DashboardCard title="Total de Pratos" value={pratos.length.toString()} icon={PieChartIcon} colorClass="bg-blue-500" navigateTo={navigateTo} page="listaPratos" />
                        <DashboardCard title="Margem Média" value={`${margemMedia}%`} icon={BarChart2} colorClass="bg-green-500" navigateTo={navigateTo} page="relatorios"/>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <DashboardCard title="Pratos com Prejuízo" value={pratosComPrejuizo.toString()} icon={DollarSign} colorClass="bg-red-500" navigateTo={navigateTo} page="listaPratos" />
                        </div>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Últimos Pratos Simulados</h3>
                        <div className="overflow-x-auto table-scroll">
                            <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500">Nome do Prato</th>
                                        <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500">Margem</th>
                                        <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500 hidden sm:table-cell">Status</th>
                                        <th className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-500">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ultimosPratos.map(prato => (
                                        <tr key={prato.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-2 sm:p-3 font-medium text-gray-800 text-sm">
                                                <div>
                                                    {prato.nome}
                                                    <div className="sm:hidden">{getStatusIndicator(prato.status)}</div>
                                                </div>
                                            </td>
                                            <td className={`p-2 sm:p-3 font-bold text-sm ${prato.margem < 0 ? 'text-red-500' : 'text-green-600'}`}>{prato.margem}%</td>
                                            <td className="p-2 sm:p-3 hidden sm:table-cell">{getStatusIndicator(prato.status)}</td>
                                            <td className="p-2 sm:p-3">
                                                <button onClick={() => navigateTo('simulador', prato)} className="text-blue-600 hover:underline text-xs sm:text-sm font-medium">Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <DicaRapidaFooter navigateTo={navigateTo} />
        </div>
    );
};