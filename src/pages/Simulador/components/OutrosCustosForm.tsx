import { PlusCircle, Trash2 } from 'lucide-react';
import type { OutroCusto } from '../../../types';

interface OutrosCustosFormProps {
    outrosCustos: OutroCusto[];
    onAdd: () => void;
    onRemove: (id: number) => void;
    onUpdate: (id: number, field: 'nome' | 'valor', value: string | number) => void;
}

export const OutrosCustosForm: React.FC<OutrosCustosFormProps> = ({ outrosCustos, onAdd, onRemove, onUpdate }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-4">3. Outros Custos Diretos</h3>
            <div className="space-y-4">
                {outrosCustos.map(custo => (
                    <div key={custo.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                            <input
                                type="text"
                                placeholder="Descrição do custo (ex: Gás extra)"
                                value={custo.nome}
                                onChange={e => onUpdate(custo.id, 'nome', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="col-span-5">
                             <div className="flex items-center">
                                <span className="text-gray-500 mr-1">R$</span>
                                <input
                                    type="number"
                                    placeholder="Valor"
                                    value={custo.valor}
                                    onChange={e => onUpdate(custo.id, 'valor', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                             <button onClick={() => onRemove(custo.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full flex justify-center w-full">
                                <Trash2 size={18}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={onAdd} className="mt-4 text-green-600 font-semibold flex items-center gap-2 hover:text-green-800">
                <PlusCircle size={18}/> Adicionar Outro Custo
            </button>
        </div>
    );
};