/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Trash2, PlusCircle, PieChart } from "lucide-react";
import { useState, useMemo } from "react";
import { ResponsiveContainer, Pie, Cell, Tooltip, Legend } from "recharts";
import { Header } from "../../components/Header";
import type { Prato, Page, PratoStatus } from "../../types";

interface Ingrediente {
  id: number;
  nome: string;
  precoCompra: number;
  undCompra: string;
  qtdUsada: number;
  undUsada: string;
}

interface SimuladorPrecoPageProps {
  navigateTo: (page: Page, prato?: Prato) => void;
  pratoInicial?: Prato & { ingredientes?: Ingrediente[]; custoEmbalagem?: number; taxaApp?: number; custosIndiretos?: number; pratosVendidosMes?: number; margemDesejada?: number; maoDeObra?: number; };
  onSave: (prato: Prato) => void;
  isTestMode?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

export const SimuladorPrecoPage = ({ navigateTo, pratoInicial, onSave, isTestMode }: SimuladorPrecoPageProps) => {
    const [nomePrato, setNomePrato] = useState(pratoInicial?.nome || '');
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>(pratoInicial?.ingredientes || [{ id: 1, nome: 'Frango', precoCompra: 20, undCompra: 'kg', qtdUsada: 0.2, undUsada: 'kg' }]);
    const [custoEmbalagem, setCustoEmbalagem] = useState<number>(pratoInicial?.custoEmbalagem || 1.50);
    const [taxaApp, setTaxaApp] = useState<number>(pratoInicial?.taxaApp || 20);
    const [custosIndiretosMensais, setCustosIndiretosMensais] = useState<number>(pratoInicial?.custosIndiretos || 1500);
    const [pratosVendidosMes, setPratosVendidosMes] = useState<number>(pratoInicial?.pratosVendidosMes || 500);
    const [margemLucroDesejada, setMargemLucroDesejada] = useState<number>(pratoInicial?.margemDesejada || 30);
    const [maoDeObra, setMaoDeObra] = useState<number>(pratoInicial?.maoDeObra || 3.0);

    const handleAddIngrediente = () => {
        setIngredientes([...ingredientes, { id: Date.now(), nome: '', precoCompra: 0, undCompra: 'kg', qtdUsada: 0, undUsada: 'kg' }]);
    };
    
    const handleRemoveIngrediente = (id: number) => {
        setIngredientes(ingredientes.filter(i => i.id !== id));
    };

    const handleIngredienteChange = (id: number, field: keyof Ingrediente, value: string | number) => {
        setIngredientes(ingredientes.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const calculos = useMemo(() => {
      const custoTotalIngredientes = ingredientes.reduce((acc, ing) => {
        const custo = ing.precoCompra * ing.qtdUsada;
        return acc + custo;
      }, 0);
      
      const custoIndiretoPorPrato = custosIndiretosMensais / (pratosVendidosMes || 1);
      
      const custosFixosPorPrato = custoEmbalagem + maoDeObra + custoIndiretoPorPrato;
      
      const custoTotalSemApp = custoTotalIngredientes + custosFixosPorPrato;
      
      const precoDeVendaSugerido = custoTotalSemApp / (1 - (margemLucroDesejada / 100) - (taxaApp / 100));
      
      const lucroBruto = precoDeVendaSugerido - custoTotalSemApp - (precoDeVendaSugerido * (taxaApp / 100));

      const margemReal = precoDeVendaSugerido > 0 ? (lucroBruto / precoDeVendaSugerido) * 100 : 0;
      
      const composicaoCustoData = [
          { name: 'Ingredientes', value: custoTotalIngredientes },
          { name: 'Taxa App', value: precoDeVendaSugerido * (taxaApp / 100) },
          { name: 'Embalagem', value: custoEmbalagem },
          { name: 'Mão de Obra', value: maoDeObra },
          { name: 'Custos Indiretos', value: custoIndiretoPorPrato },
          { name: 'Lucro', value: lucroBruto > 0 ? lucroBruto : 0 },
      ].filter(item => item.value > 0);

      return {
          custoTotalIngredientes,
          custoIndiretoPorPrato,
          custoTotalSemApp,
          precoDeVendaSugerido,
          lucroBruto,
          margemReal,
          composicaoCustoData
      };
    }, [ingredientes, custoEmbalagem, taxaApp, custosIndiretosMensais, pratosVendidosMes, margemLucroDesejada, maoDeObra]);


    const handleSave = () => {
        const status: PratoStatus = calculos.margemReal < 0 ? 'prejuizo' : (calculos.margemReal < 15 ? 'atencao' : 'ok');
        const pratoData: Prato = {
            id: pratoInicial?.id || Date.now(),
            nome: nomePrato,
            categoria: 'Não definida',
            precoVenda: calculos.precoDeVendaSugerido,
            margem: Math.round(calculos.margemReal),
            status
        };
        onSave(pratoData);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
          { !isTestMode && <Header user={{ nome: "Usuário", email: "usuario@email.com", nomeNegocio: "Meu Negócio" }} onLogout={()=>{}} navigateTo={navigateTo} /> }
           <div className="container mx-auto p-4 sm:p-8">
                {isTestMode && (
                  <div className="text-center mb-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                    <p className="font-bold">Modo de Teste</p>
                    <p>Você está usando uma versão simplificada. <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('cadastro')}} className="font-bold underline">Crie uma conta</a> para salvar pratos e acessar todos os recursos.</p>
                  </div>
                )}
               <button onClick={() => navigateTo(isTestMode ? 'landing' : 'dashboard')} className="flex items-center gap-2 text-green-600 font-medium mb-4 hover:underline">
                   <ArrowLeft size={18} />
                   Voltar
               </button>
               <h2 className="text-3xl font-bold text-gray-800 mb-6">{pratoInicial ? 'Editando / Simulando Prato' : 'Simulador de Preço de Venda'}</h2>

               <div className="flex flex-col lg:flex-row gap-8">
                   {/* Coluna de Formulários */}
                   <div className="lg:w-2/3 space-y-6">
                       <div className="bg-white p-6 rounded-2xl shadow-md">
                           <h3 className="text-xl font-bold text-gray-700 mb-4">1. Informações do Prato</h3>
                           <input type="text" placeholder="Nome do Prato (Ex: Marmita de Frango)" value={nomePrato} onChange={e => setNomePrato(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"/>
                       </div>

                       <div className="bg-white p-6 rounded-2xl shadow-md">
                           <h3 className="text-xl font-bold text-gray-700 mb-4">2. Ingredientes (Custo por Mercadoria Vendida - CMV)</h3>
                           <div className="space-y-4">
                               {ingredientes.map((ing, _index) => (
                                   <div key={ing.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center border-b pb-4">
                                       <input type="text" placeholder="Nome" value={ing.nome} onChange={e => handleIngredienteChange(ing.id, 'nome', e.target.value)} className="md:col-span-4 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                       <div className="md:col-span-3 flex items-center">
                                            <span className="text-gray-500 mr-1">R$</span>
                                            <input type="number" placeholder="Preço Compra" value={ing.precoCompra} onChange={e => handleIngredienteChange(ing.id, 'precoCompra', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                       </div>
                                       <div className="md:col-span-2">
                                           <input type="number" placeholder="Qtd. Usada" value={ing.qtdUsada} onChange={e => handleIngredienteChange(ing.id, 'qtdUsada', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                       </div>
                                       <div className="md:col-span-2">
                                            <select value={ing.undUsada} onChange={e => handleIngredienteChange(ing.id, 'undUsada', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                                                <option>kg</option><option>g</option><option>l</option><option>ml</option><option>un</option>
                                            </select>
                                       </div>
                                       <button onClick={() => handleRemoveIngrediente(ing.id)} className="md:col-span-1 text-red-500 hover:text-red-700 p-2 rounded-full flex justify-center">
                                           <Trash2 size={18}/>
                                       </button>
                                   </div>
                               ))}
                           </div>
                           <button onClick={handleAddIngrediente} className="mt-4 text-green-600 font-semibold flex items-center gap-2 hover:text-green-800">
                               <PlusCircle size={18}/> Adicionar Ingrediente
                           </button>
                       </div>

                       <div className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <h3 className="text-xl font-bold text-gray-700 mb-4">3. Custos Diretos</h3>
                               <div className="space-y-3">
                                   <div>
                                       <label className="text-sm font-medium text-gray-600">Custo da Embalagem (por prato)</label>
                                       <div className="flex items-center mt-1">
                                           <span className="text-gray-500 mr-1">R$</span>
                                           <input type="number" value={custoEmbalagem} onChange={e => setCustoEmbalagem(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                       </div>
                                   </div>
                                   <div>
                                       <label className="text-sm font-medium text-gray-600">Mão de Obra (por prato)</label>
                                       <div className="flex items-center mt-1">
                                           <span className="text-gray-500 mr-1">R$</span>
                                           <input type="number" value={maoDeObra} onChange={e => setMaoDeObra(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                       </div>
                                   </div>
                                   <div>
                                       <label className="text-sm font-medium text-gray-600">Taxa do App de Delivery</label>
                                       <div className="flex items-center mt-1">
                                           <input type="number" value={taxaApp} onChange={e => setTaxaApp(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                           <span className="text-gray-500 ml-1">%</span>
                                       </div>
                                   </div>
                               </div>
                            </div>
                           <div>
                               <h3 className="text-xl font-bold text-gray-700 mb-4">4. Custos Indiretos</h3>
                               <div className="space-y-3">
                                   <div>
                                       <label className="text-sm font-medium text-gray-600">Custos Fixos Mensais (Gás, Aluguel, etc)</label>
                                       <div className="flex items-center mt-1">
                                           <span className="text-gray-500 mr-1">R$</span>
                                           <input type="number" value={custosIndiretosMensais} onChange={e => setCustosIndiretosMensais(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                       </div>
                                   </div>
                                   <div>
                                       <label className="text-sm font-medium text-gray-600">Qtd. de Pratos Vendidos/Mês</label>
                                       <input type="number" value={pratosVendidosMes} onChange={e => setPratosVendidosMes(parseFloat(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"/>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Coluna de Resultados */}
                   <div className="lg:w-1/3">
                        <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg">
                           <h3 className="text-2xl font-bold text-gray-800 mb-4">5. Simulação e Preço Final</h3>
                           
                           <div className="mb-6">
                               <label className="text-sm font-bold text-gray-600">Margem de Lucro Desejada</label>
                               <div className="flex items-center mt-1">
                                   <input type="number" value={margemLucroDesejada} onChange={e => setMargemLucroDesejada(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 text-xl font-bold bg-gray-50 border border-gray-300 rounded-md"/>
                                   <span className="text-gray-500 ml-2 text-xl font-bold">%</span>
                               </div>
                           </div>

                           <div className="bg-green-50 p-4 rounded-lg space-y-3 text-center">
                               <p className="text-sm text-green-800 font-semibold">PREÇO DE VENDA SUGERIDO</p>
                               <p className="text-5xl font-extrabold text-green-700">
                                   R$ {calculos.precoDeVendaSugerido.toFixed(2).replace('.', ',')}
                               </p>
                           </div>

                           <div className="mt-6 space-y-2">
                               <div className="flex justify-between text-sm">
                                   <span className="text-gray-600">Custo Total dos Ingredientes:</span>
                                   <span className="font-medium text-gray-800">R$ {calculos.custoTotalIngredientes.toFixed(2).replace('.', ',')}</span>
                               </div>
                               <div className="flex justify-between text-sm">
                                   <span className="text-gray-600">Custo Total (sem app):</span>
                                   <span className="font-medium text-gray-800">R$ {calculos.custoTotalSemApp.toFixed(2).replace('.', ',')}</span>
                               </div>
                               <hr className="my-2"/>
                               <div className="flex justify-between text-lg font-bold">
                                   <span className={calculos.lucroBruto < 0 ? 'text-red-600' : 'text-green-600'}>LUCRO BRUTO ESTIMADO:</span>
                                   <span className={calculos.lucroBruto < 0 ? 'text-red-600' : 'text-green-600'}>R$ {calculos.lucroBruto.toFixed(2).replace('.', ',')}</span>
                               </div>
                               <div className="flex justify-between text-lg font-bold">
                                   <span className={calculos.margemReal < 0 ? 'text-red-600' : 'text-green-600'}>MARGEM REAL ALCANÇADA:</span>
                                   <span className={calculos.margemReal < 0 ? 'text-red-600' : 'text-green-600'}>{calculos.margemReal.toFixed(1).replace('.', ',')}%</span>
                               </div>
                           </div>
                           
                           <div className="mt-6 h-48">
                                <p className="text-center text-sm font-semibold text-gray-600 mb-2">Composição do Preço de Venda</p>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={calculos.composicaoCustoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                                            {calculos.composicaoCustoData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                                    </PieChart>
                                </ResponsiveContainer>
                           </div>

                            {!isTestMode && (
                               <button onClick={handleSave} className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition">
                                   {pratoInicial ? 'Salvar Alterações' : 'Salvar Prato'}
                               </button>
                            )}
                        </div>
                   </div>
               </div>
           </div>
        </div>
    );
};