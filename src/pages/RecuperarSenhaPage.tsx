import { useState } from "react";
import { CheckCircle } from 'lucide-react';
import type { Page } from "../types";

interface RecuperarSenhaPageProps {
  navigateTo: (page: Page) => void;
}

export const RecuperarSenhaPage = ({navigateTo}: RecuperarSenhaPageProps) => {
    const [linkEnviado, setLinkEnviado] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLinkEnviado(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Recuperar Senha</h2>
                    <p className="mt-2 text-sm text-gray-600">Digite seu e-mail e enviaremos um link para redefinir sua senha.</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    </div>
                    
                    {linkEnviado && (
                        <div className="p-3 bg-green-50 text-green-800 border border-green-200 rounded-md flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm font-medium">Se o e-mail existir, enviaremos um link de redefinição para ele.</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        disabled={linkEnviado}
                    >
                        {linkEnviado ? 'Link Enviado' : 'Enviar Link de Recuperação'}
                    </button>
                </form>
                 <p className="text-center text-sm text-gray-600 pt-4">
                    Lembrou a senha?{' '}
                    <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('login')}} className="font-medium text-green-600 hover:underline">
                        Faça login
                    </a>
                </p>
            </div>
        </div>
    );
};
