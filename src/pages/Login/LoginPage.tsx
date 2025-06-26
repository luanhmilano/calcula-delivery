import { DollarSign } from "lucide-react";
import { useState } from "react";
import type { Page } from "../../types";

interface LoginPageProps {
  navigateTo: (page: Page) => void;
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigateTo, onLogin }) => {
  const [email, setEmail] = useState('henrique@marmitas.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <DollarSign className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">Seja bem-vindo de volta!</h2>
          <p className="mt-2 text-sm text-gray-600">Faça login para gerenciar seus preços.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="password"className="text-sm font-medium text-gray-700">Senha</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('recuperarSenha')}} className="text-sm text-green-600 hover:underline">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Entrar
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('cadastro')}} className="font-medium text-green-600 hover:underline">
            Crie uma agora
          </a>
        </p>
      </div>
    </div>
  );
};