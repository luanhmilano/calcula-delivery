import React from 'react';
import { DollarSign, User } from 'lucide-react';
import type { User as UserType, Page } from '../types';

interface HeaderProps {
    user: UserType | null;
    navigateTo: (page: Page) => void;
    onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, navigateTo, onLogout }) => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center cursor-pointer" onClick={() => navigateTo(user ? 'dashboard' : 'landing')}>
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <h1 className="ml-2 text-xl sm:text-2xl font-bold text-gray-800">Calcula<span className="text-green-600">Delivery</span></h1>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {user ? (
                        <>
                            <span className="hidden sm:inline text-gray-600">Olá, {user.nome}</span>
                            <button onClick={() => navigateTo('perfil')} className="p-2 rounded-full hover:bg-gray-100 transition">
                                <User className="h-6 w-6 text-gray-600" />
                            </button>
                            <button onClick={onLogout} className="bg-red-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-red-600 transition text-sm font-medium">Sair</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigateTo('login')} className="text-gray-600 hover:text-green-600 font-medium transition px-2">Login</button>
                            <button onClick={() => navigateTo('cadastro')} className="bg-green-600 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-green-700 transition font-bold text-sm">Cadastre-se</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
);
