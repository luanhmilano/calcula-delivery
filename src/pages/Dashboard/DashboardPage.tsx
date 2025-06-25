import { DashboardCard } from "../../components/DashboardCard";
import { Sidebar } from "../../components/Sidebar";
import { PieChartIcon, BarChart2, DollarSign, PlusCircle } from "lucide-react";
import type { Page, Prato, User, PratoStatus } from "../../types";

interface DashboardProps {
    navigateTo: (page: Page, prato?: Prato) => void;
    user: User;
    pratos: Prato[];
    onLogout: () => void;
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
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                            <p className="text-gray-600">Resumo da saúde financeira do seu negócio, {user.nome}.</p>
                        </div>
                        <button onClick={() => navigateTo('simulador')} className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-bold flex items-center gap-2">
                            <PlusCircle size={20} />
                            Simular Novo Prato
                        </button>
                    </div>

                    {/* Cards de Resumo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <DashboardCard title="Total de Pratos" value={pratos.length} icon={PieChartIcon} colorClass="bg-blue-500" navigateTo={navigateTo} page="listaPratos" />
                        <DashboardCard title="Margem Média" value={`${margemMedia}%`} icon={BarChart2} colorClass="bg-green-500" navigateTo={navigateTo} page="relatorios"/>
                        <DashboardCard title="Pratos com Prejuízo" value={pratosComPrejuizo} icon={DollarSign} colorClass="bg-red-500" navigateTo={navigateTo} page="listaPratos" />
                    </div>

                    {/* Lista de Últimos Pratos */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Últimos Pratos Simulados</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="p-3 text-sm font-semibold text-gray-500">Nome do Prato</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Margem Atual</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Status</th>
                                        <th className="p-3 text-sm font-semibold text-gray-500">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ultimosPratos.map(prato => (
                                        <tr key={prato.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3 font-medium text-gray-800">{prato.nome}</td>
                                            <td className={`p-3 font-bold ${prato.margem < 0 ? 'text-red-500' : 'text-green-600'}`}>{prato.margem}%</td>
                                            <td className="p-3">{getStatusIndicator(prato.status)}</td>
                                            <td className="p-3">
                                                <button onClick={() => navigateTo('simulador', prato)} className="text-blue-600 hover:underline text-sm font-medium">Editar/Simular</button>
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