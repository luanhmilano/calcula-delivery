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
    fotoUrl?: string; 
    localizacao?: string; 
    tipoConta?: 'Básica' | 'Premium';
    custosFixosMensais?: number; 
    pratosVendidosMes?: number; 
    margemMinimaPadrao?: number; 
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
  | 'perfil'
  | 'aprenda'
  | 'cenarios'
  | 'centralDeAjuda';

export type UnidadePreco = 'kg' | 'g' | 'l' | 'ml' | 'un' | 'dúzia';

export interface Ingrediente {
    id: number;
    nome: string;
    precoPago: number;
    unidadePreco: UnidadePreco;
    qtdUsada: number;
    unidadeUsada: 'g' | 'kg' | 'ml' | 'l' | 'un';
}

export interface OutroCusto {
    id: number;
    nome: string;
    valor: number;
}