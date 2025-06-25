import { PlusCircle } from "lucide-react";
import { useState } from "react";
import type { Page } from "../types";

interface CadastroPageProps {
  navigateTo: (page: Page) => void;
  onLogin: (email: string) => void;
}

export const CadastroPage = ({ navigateTo, onLogin }: CadastroPageProps) => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email) onLogin(email);
  };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <PlusCircle className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">Comece a precificar com estratégia.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input type="text" required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de Negócio</label>
            <select required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option>Marmitaria</option>
                <option>Dark Kitchen</option>
                <option>Lanchonete</option>
                <option>Food Truck</option>
                <option>Outro</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input type="password" required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Criar conta
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('login')}} className="font-medium text-green-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
};