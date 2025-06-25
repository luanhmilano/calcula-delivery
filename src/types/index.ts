export type PratoStatus = 'ok' | 'atencao' | 'prejuizo';

export interface Prato {
  id: number;
  nome: string;
  categoria: string;
  precoVenda: number;
  margem: number;
  status: PratoStatus;
}

export interface User {
    nome: string;
    email: string;
    nomeNegocio: string;
}

export type Page = 
  | 'landing' 
  | 'login' 
  | 'cadastro' 
  | 'recuperarSenha' 
  | 'dashboard' 
  | 'simulador' 
  | 'simuladorTeste' 
  | 'listaPratos' 
  | 'relatorios' 
  | 'perfil';
