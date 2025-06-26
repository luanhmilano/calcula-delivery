import { Trash2 } from 'lucide-react';
import type { Ingrediente, UnidadePreco } from '../../../types';

interface IngredienteInputRowProps {
    ingrediente: Ingrediente;
    onRemove: (id: number) => void;
    onChange: (id: number, field: keyof Ingrediente, value: string | number) => void;
}

const unidadesDeUsoPorTipo: Record<string, string[]> = {
    peso: ['g', 'kg'],
    volume: ['ml', 'l'],
    unidade: ['un'],
};

export const IngredienteInputRow: React.FC<IngredienteInputRowProps> = ({ ingrediente, onRemove, onChange }) => {
    
    const getTipoUnidade = (unidade: UnidadePreco): keyof typeof unidadesDeUsoPorTipo => {
        if (['g', 'kg'].includes(unidade)) return 'peso';
        if (['ml', 'l'].includes(unidade)) return 'volume';
        return 'unidade';
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end border-b border-gray-200 pb-4">
            {/* Nome do Ingrediente */}
            <div className="md:col-span-4">
                <label className="text-xs font-medium text-gray-500">Nome do Ingrediente</label>
                <input
                    type="text"
                    placeholder="Ex: Alcatra"
                    value={ingrediente.nome}
                    onChange={e => onChange(ingrediente.id, 'nome', e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                />
            </div>

            {/* Custo de Compra Simplificado */}
            <div className="md:col-span-4 grid grid-cols-2 gap-1">
                <div>
                    <label className="text-xs font-medium text-gray-500">Preço Pago</label>
                    <div className="flex items-center mt-1">
                        <span className="text-gray-500 mr-1">R$</span>
                        <input
                            type="number"
                            value={ingrediente.precoPago}
                            onChange={e => onChange(ingrediente.id, 'precoPago', parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-2 bg-gray-50 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500">Por</label>
                    <select
                        value={ingrediente.unidadePreco}
                        onChange={e => onChange(ingrediente.id, 'unidadePreco', e.target.value)}
                        className="w-full mt-1 px-2 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="un">unidade</option>
                        <option value="dúzia">dúzia (12 un)</option>
                    </select>
                </div>
            </div>
            
            {/* Quantidade Usada na Receita */}
            <div className="md:col-span-3 grid grid-cols-2 gap-1">
                <div>
                     <label className="text-xs font-medium text-gray-500">Qtd. Usada</label>
                     <input
                        type="number"
                        value={ingrediente.qtdUsada}
                        onChange={e => onChange(ingrediente.id, 'qtdUsada', parseFloat(e.target.value) || 0)}
                        className="w-full mt-1 px-2 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    />
                </div>
                 <div>
                     <label className="text-xs font-medium text-gray-500">Unidade</label>
                     <select
                        value={ingrediente.unidadeUsada}
                        onChange={e => onChange(ingrediente.id, 'unidadeUsada', e.target.value as Ingrediente['unidadeUsada'])}
                        className="w-full mt-1 px-2 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    >
                        {unidadesDeUsoPorTipo[getTipoUnidade(ingrediente.unidadePreco)].map(un => (
                            <option key={un} value={un}>{un}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botão de Remover */}
            <div className="md:col-span-1 flex items-end justify-center">
                <button
                    onClick={() => onRemove(ingrediente.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full flex justify-center hover:bg-red-100 transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};