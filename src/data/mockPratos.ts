import type { Prato } from '../types';

export const initialPratos: Prato[] = [
  { id: 1, nome: 'Marmita de Frango Grelhado', categoria: 'Marmitas', precoVenda: 25.00, margem: 28, status: 'ok' },
  { id: 2, nome: 'Hambúrguer Artesanal Bacon', categoria: 'Lanches', precoVenda: 32.50, margem: 35, status: 'ok' },
  { id: 3, nome: 'Pizza de Calabresa G', categoria: 'Pizzas', precoVenda: 55.00, margem: 12, status: 'atencao' },
  { id: 4, nome: 'Açaí 500ml com Frutas', categoria: 'Sobremesas', precoVenda: 18.00, margem: 45, status: 'ok' },
  { id: 5, nome: 'Combo Prato Feito + Refri', categoria: 'Combos', precoVenda: 29.90, margem: -5, status: 'prejuizo' },
];