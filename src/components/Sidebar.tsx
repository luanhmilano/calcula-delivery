import { DollarSign, BarChart2, PlusCircle, Settings, PieChart as PieChartIcon, BarChart3, type LucideIcon, BookOpen, LifeBuoy, Menu, X } from 'lucide-react';
import { useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);
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
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-white shadow-lg flex-shrink-0 fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="p-4">
                     <div className="flex items-center cursor-pointer mb-8" onClick={() => { navigateTo('dashboard'); setIsOpen(false); }}>
                        <DollarSign className="h-8 w-8 text-green-600" />
                        <h1 className="ml-2 text-2xl font-bold text-gray-800">Calcula<span className="text-green-600">Delivery</span></h1>
                    </div>
                    <nav>
                        <ul>
                            {menuItems.map(item => (
                                <li key={item.id}>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); navigateTo(item.id); setIsOpen(false); }}
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
        </>
    );
};