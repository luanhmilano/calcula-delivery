import { useState, useMemo } from "react";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { Header } from "../../components/Header";
import type { Prato, Page, PratoStatus, Ingrediente, OutroCusto } from "../../types";

import { CustosForm } from './components/CustosForm';
import { IngredienteInputRow } from './components/IngredienteInputRow';
import { OutrosCustosForm } from './components/OutrosCustosForm';

interface SimuladorPrecoPageProps {
    navigateTo: (page: Page, prato?: Prato) => void;
    pratoInicial?: Prato & { ingredientes?: Ingrediente[], outrosCustos?: OutroCusto[], categoria?: string, custoEmbalagem?: number; taxaApp?: number; custosIndiretos?: number; pratosVendidosMes?: number; margemDesejada?: number; maoDeObra?: number; };
    onSave: (prato: Prato) => void;
    isTestMode?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#AE4DFF', '#ff4d4d'];

// Fatores de conversão para a unidade base (g, ml, un)
const fatoresUnidadeBase = {
    'kg': 1000, 'g': 1,
    'l': 1000, 'ml': 1,
    'dúzia': 12, 'un': 1
};

export const SimuladorPrecoPage = ({ navigateTo, pratoInicial, onSave, isTestMode }: SimuladorPrecoPageProps) => {
    // Estados do Formulário
    const [nomePrato, setNomePrato] = useState(pratoInicial?.nome || 'Marmita de Bife à Cavalo');
    const [categoria, setCategoria] = useState(pratoInicial?.categoria || 'Marmitas');
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>(pratoInicial?.ingredientes || [
        { id: Date.now() + 1, nome: 'Alcatra', precoPago: 45, unidadePreco: 'kg', qtdUsada: 130, unidadeUsada: 'g' },
        { id: Date.now() + 2, nome: 'Ovo Branco', precoPago: 12, unidadePreco: 'dúzia', qtdUsada: 1, unidadeUsada: 'un' },
    ]);
    const [outrosCustos, setOutrosCustos] = useState<OutroCusto[]>(pratoInicial?.outrosCustos || []);
    const [custoEmbalagem, setCustoEmbalagem] = useState<number>(pratoInicial?.custoEmbalagem || 1.50);
    const [taxaApp, setTaxaApp] = useState<number>(pratoInicial?.taxaApp || 20);
    const [custosIndiretosMensais, setCustosIndiretosMensais] = useState<number>(pratoInicial?.custosIndiretos || 1500);
    const [pratosVendidosMes, setPratosVendidosMes] = useState<number>(pratoInicial?.pratosVendidosMes || 500);
    const [margemLucroDesejada, setMargemLucroDesejada] = useState<number>(pratoInicial?.margemDesejada || 25);
    const [maoDeObra, setMaoDeObra] = useState<number>(pratoInicial?.maoDeObra || 3.0);
    const [isModoEvento, setIsModoEvento] = useState(false);
    const [custosEvento, setCustosEvento] = useState({ aluguel: 0, frete: 0, equipeExtra: 0 });

    // Handlers para Ingredientes e Outros Custos
    const handleAddIngrediente = () => setIngredientes([
        ...ingredientes,
        {
            id: Date.now(),
            nome: '',
            precoPago: 0,
            unidadePreco: 'kg',
            qtdUsada: 0,
            unidadeUsada: 'g'
        }
    ]);
    const handleRemoveIngrediente = (id: number) => setIngredientes(ingredientes.filter(i => i.id !== id));
    const handleIngredienteChange = (id: number, field: keyof Ingrediente, value: string | number) => setIngredientes(ingredientes.map(i => i.id === id ? { ...i, [field]: value } : i));
    
    const handleAddOutroCusto = () => setOutrosCustos([...outrosCustos, { id: Date.now(), nome: '', valor: 0 }]);
    const handleRemoveOutroCusto = (id: number) => setOutrosCustos(outrosCustos.filter(c => c.id !== id));
    const handleOutroCustoUpdate = (id: number, field: 'nome' | 'valor', value: string | number) => setOutrosCustos(outrosCustos.map(c => c.id === id ? { ...c, [field]: value } : c));

    // Lógica de Cálculo aprimorada
    const calculos = useMemo(() => {
        const getCustoIngrediente = (ing: Ingrediente): number => {
            const fatorBasePreco = fatoresUnidadeBase[ing.unidadePreco] || 1;
            const precoPorUnidadeBase = (ing.precoPago || 0) / fatorBasePreco;

            const fatorBaseUso = fatoresUnidadeBase[ing.unidadeUsada as keyof typeof fatoresUnidadeBase] || 1;
            return precoPorUnidadeBase * (ing.qtdUsada || 0) * fatorBaseUso;
        }

        const custoTotalIngredientes = ingredientes.reduce((acc, ing) => acc + getCustoIngrediente(ing), 0);
        const custoTotalOutrosCustos = outrosCustos.reduce((acc, custo) => acc + (custo.valor || 0), 0);
        
        const custoTotalEvento = isModoEvento ? custosEvento.aluguel + custosEvento.frete + custosEvento.equipeExtra : 0;
        const custoIndiretoPorPrato = (custosIndiretosMensais / (pratosVendidosMes || 1)) + (custoTotalEvento / (pratosVendidosMes || 1));
        
        const custosFixosPorPrato = custoEmbalagem + maoDeObra + custoIndiretoPorPrato + custoTotalOutrosCustos;
        const custoTotalSemApp = custoTotalIngredientes + custosFixosPorPrato;
        
        const divisor = 1 - (margemLucroDesejada / 100) - (taxaApp / 100);
        const precoDeVendaSugerido = divisor > 0 && divisor < 1 ? custoTotalSemApp / divisor : custoTotalSemApp;
        
        const lucroBruto = precoDeVendaSugerido - custoTotalSemApp - (precoDeVendaSugerido * (taxaApp / 100));
        const margemReal = precoDeVendaSugerido > 0 ? (lucroBruto / precoDeVendaSugerido) * 100 : 0;
        
        const composicaoCustoData = [
            { name: 'Ingredientes', value: custoTotalIngredientes },
            { name: 'Taxa App', value: precoDeVendaSugerido * (taxaApp / 100) },
            { name: 'Embalagem', value: custoEmbalagem },
            { name: 'Mão de Obra', value: maoDeObra },
            { name: 'Outros Custos', value: custoTotalOutrosCustos},
            { name: 'Custos Indiretos', value: custoIndiretoPorPrato },
            { name: 'Lucro', value: Math.max(0, lucroBruto) },
        ].filter(item => item.value > 0.01);

        return { custoTotalSemApp, precoDeVendaSugerido, lucroBruto, margemReal, composicaoCustoData };
    }, [ingredientes, outrosCustos, custoEmbalagem, taxaApp, custosIndiretosMensais, pratosVendidosMes, margemLucroDesejada, maoDeObra, isModoEvento, custosEvento]);

    const handleSave = () => {
        const status: PratoStatus = calculos.margemReal < 0 ? 'prejuizo' : (calculos.margemReal < 15 ? 'atencao' : 'ok');
        const pratoData: Prato = {
            id: pratoInicial?.id || Date.now(),
            nome: nomePrato,
            categoria: categoria,
            precoVenda: calculos.precoDeVendaSugerido,
            margem: Math.round(calculos.margemReal),
            status,
        };
        onSave(pratoData);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {!isTestMode && <Header user={{ nome: "Usuário", email: "usuario@email.com", nomeNegocio: "Meu Negócio" }} onLogout={() => {}} navigateTo={navigateTo} />}
            <div className="container mx-auto p-4 sm:p-8">
                {isTestMode && (
                    <div className="text-center mb-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                        <p className="font-bold">Modo de Teste</p>
                        <p>Você está usando uma versão simplificada. <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('cadastro') }} className="font-bold underline">Crie uma conta</a> para salvar pratos e acessar todos os recursos.</p>
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
                        <div className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xl font-medium text-gray-700">1. Nome do Prato</label>
                                <input type="text" placeholder="Ex: Marmita de Frango" value={nomePrato} onChange={e => setNomePrato(e.target.value)} className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="text-xl font-medium text-gray-700">Categoria</label>
                                <input type="text" placeholder="Ex: Marmitas" value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"/>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-700 mb-4">2. Ingredientes (CMV)</h3>
                            <div className="space-y-4">
                                {ingredientes.map((ing) => (
                                    <IngredienteInputRow 
                                        key={ing.id}
                                        ingrediente={ing}
                                        onRemove={handleRemoveIngrediente}
                                        onChange={handleIngredienteChange}
                                    />
                                ))}
                            </div>
                            <button onClick={handleAddIngrediente} className="mt-6 text-green-600 font-semibold flex items-center gap-2 hover:text-green-800">
                                <PlusCircle size={18} /> Adicionar Ingrediente
                            </button>
                        </div>
                        
                        <OutrosCustosForm 
                            outrosCustos={outrosCustos}
                            onAdd={handleAddOutroCusto}
                            onRemove={handleRemoveOutroCusto}
                            onUpdate={handleOutroCustoUpdate}
                        />

                        <CustosForm 
                            custoEmbalagem={custoEmbalagem} setCustoEmbalagem={setCustoEmbalagem}
                            maoDeObra={maoDeObra} setMaoDeObra={setMaoDeObra}
                            taxaApp={taxaApp} setTaxaApp={setTaxaApp}
                            custosIndiretosMensais={custosIndiretosMensais} setCustosIndiretosMensais={setCustosIndiretosMensais}
                            pratosVendidosMes={pratosVendidosMes} setPratosVendidosMes={setPratosVendidosMes}
                            isModoEvento={isModoEvento} setIsModoEvento={setIsModoEvento}
                            custosEvento={custosEvento} setCustosEvento={setCustosEvento}
                        />

                    </div>

                    {/* Coluna de Resultados */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">5. Simulação e Preço Final</h3>
                            <div className="mb-6">
                                <label className="text-sm font-bold text-gray-600">Margem de Lucro Desejada</label>
                                <div className="flex items-center mt-1">
                                    <input type="number" value={margemLucroDesejada} onChange={e => setMargemLucroDesejada(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 text-xl font-bold bg-gray-50 border border-gray-300 rounded-md" />
                                    <span className="text-gray-500 ml-2 text-xl font-bold">%</span>
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg space-y-3 text-center">
                                <p className="text-sm text-green-800 font-semibold">PREÇO DE VENDA SUGERIDO</p>
                                <p className="text-5xl font-extrabold text-green-700">R$ {calculos.precoDeVendaSugerido.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <div className="mt-6 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Custo Total (sem app):</span>
                                    <span className="font-medium text-gray-800">R$ {calculos.custoTotalSemApp.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between text-base font-bold">
                                    <span className={calculos.lucroBruto < 0 ? 'text-red-600' : 'text-green-600'}>LUCRO BRUTO:</span>
                                    <span className={calculos.lucroBruto < 0 ? 'text-red-600' : 'text-green-600'}>R$ {calculos.lucroBruto.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold">
                                    <span className={calculos.margemReal < 0 ? 'text-red-600' : 'text-green-600'}>MARGEM REAL:</span>
                                    <span className={calculos.margemReal < 0 ? 'text-red-600' : 'text-green-600'}>{calculos.margemReal.toFixed(1).replace('.', ',')}%</span>
                                </div>
                            </div>
                            <div className="mt-6 h-48">
                                <p className="text-center text-sm font-semibold text-gray-600 mb-2">Composição do Preço de Venda</p>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={calculos.composicaoCustoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                                            {calculos.composicaoCustoData.map((_entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
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
