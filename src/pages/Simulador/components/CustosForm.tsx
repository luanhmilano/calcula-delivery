import { FormInput } from './FormInput';
import { InfoTooltip } from './InfoTooltip';

interface CustosFormProps {
    custoEmbalagem: number;
    setCustoEmbalagem: (value: number) => void;
    maoDeObra: number;
    setMaoDeObra: (value: number) => void;
    taxaApp: number;
    setTaxaApp: (value: number) => void;
    custosIndiretosMensais: number;
    setCustosIndiretosMensais: (value: number) => void;
    pratosVendidosMes: number;
    setPratosVendidosMes: (value: number) => void;
    isModoEvento: boolean;
    setIsModoEvento: (value: boolean) => void;
    custosEvento: { aluguel: number, frete: number, equipeExtra: number };
    setCustosEvento: (custos: { aluguel: number, frete: number, equipeExtra: number }) => void;
}

export const CustosForm: React.FC<CustosFormProps> = ({
    custoEmbalagem, setCustoEmbalagem,
    maoDeObra, setMaoDeObra,
    taxaApp, setTaxaApp,
    custosIndiretosMensais, setCustosIndiretosMensais,
    pratosVendidosMes, setPratosVendidosMes,
    isModoEvento, setIsModoEvento,
    custosEvento, setCustosEvento
}) => {
    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700">3. Custos Gerais e Modo Evento</h3>
                    <div className="flex items-center">
                        <label htmlFor="modo-evento" className="mr-2 text-sm font-medium text-gray-900">Modo Evento</label>
                        <input
                            id="modo-evento"
                            type="checkbox"
                            checked={isModoEvento}
                            onChange={(e) => setIsModoEvento(e.target.checked)}
                            className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                        />
                         <div className="ml-2">
                             <InfoTooltip title="O que é o Modo Evento?">
                                <p>Ative esta opção para adicionar custos únicos de um evento específico (como feiras, festas ou festivais) ao cálculo de um prato.</p>
                                <p>Isso permite simular um preço de venda ideal para situações fora do seu delivery normal.</p>
                            </InfoTooltip>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Custos Diretos e Indiretos */}
                    <div className="space-y-4">
                        <FormInput label="Custo da Embalagem" unit="R$" value={custoEmbalagem} onChange={e => setCustoEmbalagem(parseFloat(e.target.value) || 0)} />
                        <FormInput label="Mão de Obra (por prato)" unit="R$" value={maoDeObra} onChange={e => setMaoDeObra(parseFloat(e.target.value) || 0)} />
                        <FormInput label="Taxa do App de Delivery" unit="%" value={taxaApp} onChange={e => setTaxaApp(parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-4">
                        <FormInput label="Custos Fixos Mensais" unit="R$" value={custosIndiretosMensais} onChange={e => setCustosIndiretosMensais(parseFloat(e.target.value) || 0)} />
                        <FormInput label="Qtd. de Pratos Vendidos/Mês" value={pratosVendidosMes} onChange={e => setPratosVendidosMes(parseFloat(e.target.value) || 0)} />
                    </div>
                </div>
            </div>

            {/* Custos do Evento (condicional) */}
            {isModoEvento && (
                <div className="bg-white p-6 rounded-2xl shadow-md animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Custos Adicionais do Evento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <FormInput 
                            label="Aluguel do Espaço" 
                            unit="R$" 
                            value={custosEvento.aluguel}
                            onChange={e => setCustosEvento({...custosEvento, aluguel: parseFloat(e.target.value) || 0})}
                        />
                         <FormInput 
                            label="Frete / Logística" 
                            unit="R$" 
                            value={custosEvento.frete}
                            onChange={e => setCustosEvento({...custosEvento, frete: parseFloat(e.target.value) || 0})}
                        />
                         <FormInput 
                            label="Equipe Extra" 
                            unit="R$" 
                            value={custosEvento.equipeExtra}
                            onChange={e => setCustosEvento({...custosEvento, equipeExtra: parseFloat(e.target.value) || 0})}
                        />
                    </div>
                </div>
            )}
        </>
    );
};