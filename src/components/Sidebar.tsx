import { DollarSign, BarChart2, PlusCircle, Settings, PieChart as PieChartIcon, BarChart3, type LucideIcon, BookOpen, LifeBuoy } from 'lucide-react';
import type { Page } from '../types';

interface MenuItem {
  id: Page;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  navigateTo: (page: Page) => void;
  activePage: Page;
}

export const Sidebar = ({ navigateTo, activePage }: SidebarProps) => {
    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
        { id: 'listaPratos', label: 'Meus Pratos', icon: PieChartIcon },
        { id: 'simulador', label: 'Simular Novo Prato', icon: PlusCircle },
        { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
        { id: 'aprenda', label: 'Aprenda a Precificar', icon: BookOpen },
        { id: 'centralDeAjuda', label: 'Central de Ajuda', icon: LifeBuoy },
        { id: 'perfil', label: 'Configurações', icon: Settings },
    ];
    
    return (
        <aside className="w-64 bg-white shadow-lg flex-shrink-0">
            <div className="p-4">
                 <div className="flex items-center cursor-pointer mb-8" onClick={() => navigateTo('dashboard')}>
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <h1 className="ml-2 text-2xl font-bold text-gray-800">Calcula<span className="text-green-600">Delivery</span></h1>
                </div>
                <nav>
                    <ul>
                        {menuItems.map(item => (
                            <li key={item.id}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}
                                    className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors ${activePage === item.id ? 'bg-green-100 text-green-700 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};