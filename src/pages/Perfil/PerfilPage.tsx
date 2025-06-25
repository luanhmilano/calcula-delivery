import { Sidebar } from "../../components/Sidebar";
import type { Page, User } from "../../types";

interface PerfilPageProps {
  navigateTo: (page: Page) => void;
  user: User;
}

export const PerfilPage = ({ navigateTo, user }: PerfilPageProps) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="perfil" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Perfil e Configurações</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
                            <h3 className="text-xl font-bold text-gray-700">Dados do Usuário</h3>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Nome do Estabelecimento</label>
                                <input type="text" defaultValue={user.nomeNegocio} className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"/>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <input type="email" defaultValue={user.email} disabled className="mt-1 w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg cursor-not-allowed"/>
                            </div>
                            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Salvar Dados</button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
                            <h3 className="text-xl font-bold text-gray-700">Configurações Gerais</h3>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Meta de Margem Mínima Padrão</label>
                                <div className="flex items-center mt-1">
                                    <input type="number" defaultValue="15" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"/>
                                    <span className="ml-2 text-gray-500">%</span>
                                </div>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-500">Moeda</label>
                                <select className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                                    <option>Real Brasileiro (BRL)</option>
                                    <option disabled>Dólar Americano (USD)</option>
                                </select>
                            </div>
                            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Salvar Configurações</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}