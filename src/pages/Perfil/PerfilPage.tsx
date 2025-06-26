import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { FormInput } from '../Simulador/components/FormInput';
import { ConfigCard } from './components/ConfigCard';
import type { Page, User } from '../../types';
import { Camera, Check, ShieldCheck } from 'lucide-react';

interface PerfilPageProps {
    navigateTo: (page: Page) => void;
    user: User;
    onUpdateUser: (updatedUser: User) => void;
}

export const PerfilPage: React.FC<PerfilPageProps> = ({ navigateTo, user, onUpdateUser }) => {
    const [nomeNegocio, setNomeNegocio] = useState(user.nomeNegocio);
    const [localizacao, setLocalizacao] = useState(user.localizacao || '');
    const [custosFixos, setCustosFixos] = useState(user.custosFixosMensais || 1500);
    const [pratosMes, setPratosMes] = useState(user.pratosVendidosMes || 500);
    const [margemPadrao, setMargemPadrao] = useState(user.margemMinimaPadrao || 15);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleSave = () => {
        setSaveStatus('saving');
        const updatedUser: User = {
            ...user,
            nomeNegocio,
            localizacao,
            custosFixosMensais: custosFixos,
            pratosVendidosMes: pratosMes,
            margemMinimaPadrao: margemPadrao,
        };
        onUpdateUser(updatedUser);
        
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1000);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="perfil" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Perfil e Configurações</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Coluna do Perfil */}
                        <div className="lg:col-span-1 space-y-8">
                            <ConfigCard title="Perfil do Negócio">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-4">
                                        <img 
                                            src={user.fotoUrl || `https://ui-avatars.com/api/?name=${user.nomeNegocio}&background=0D834E&color=fff&size=128`} 
                                            alt="Foto do perfil"
                                            className="w-32 h-32 rounded-full object-cover ring-4 ring-green-200"
                                        />
                                        <button className="absolute bottom-1 right-1 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                    <FormInput label="Nome do Estabelecimento" value={nomeNegocio} onChange={e => setNomeNegocio(e.target.value)} type="text" />
                                    <FormInput label="Localização (Cidade/Estado)" value={localizacao} onChange={e => setLocalizacao(e.target.value)} type="text" />
                                </div>
                            </ConfigCard>
                            <ConfigCard title="Tipo de Conta">
                                <div className="text-center">
                                    <p className="inline-block bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-full">{user.tipoConta || 'Premium'}</p>
                                    <button className="w-full mt-4 text-sm text-blue-600 hover:underline">Gerenciar Assinatura</button>
                                </div>
                            </ConfigCard>
                        </div>

                        {/* Coluna de Configurações */}
                        <div className="lg:col-span-2 space-y-8">
                             <ConfigCard 
                                title="Padrões do Simulador"
                                footer={
                                    <p className="text-xs text-gray-500">
                                        <strong>Ajuda:</strong> Estes valores serão usados como padrão ao simular um novo prato, agilizando seu trabalho. Você sempre poderá alterá-los diretamente no simulador.
                                    </p>
                                }
                            >
                                <FormInput label="Custos Fixos Mensais Padrão" unit="R$" value={custosFixos} onChange={e => setCustosFixos(parseFloat(e.target.value) || 0)} />
                                <FormInput label="Estimativa de Pratos Vendidos/Mês" value={pratosMes} onChange={e => setPratosMes(parseFloat(e.target.value) || 0)} />
                                <FormInput label="Margem Mínima de Alerta Padrão" unit="%" value={margemPadrao} onChange={e => setMargemPadrao(parseFloat(e.target.value) || 0)} />
                            </ConfigCard>
                             <ConfigCard 
                                title="Preferências de Exibição"
                                footer={
                                     <div className="flex items-start gap-2 text-xs text-gray-500">
                                        <ShieldCheck className="w-8 h-8 text-gray-400 flex-shrink-0" />
                                        <p><strong>Segurança dos Dados:</strong> Suas informações são salvas de forma segura e usadas exclusivamente para os cálculos dentro do sistema. Nunca compartilhamos seus dados.</p>
                                    </div>
                                }
                             >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-700">Modo de Exibição Simplificado</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                            </ConfigCard>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saveStatus !== 'idle'}
                            className={`px-8 py-3 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${
                                saveStatus === 'idle' ? 'bg-green-600 hover:bg-green-700' : 
                                saveStatus === 'saving' ? 'bg-gray-400' : 'bg-blue-500'
                            }`}
                        >
                           {saveStatus === 'saved' && <Check size={20} />}
                           {saveStatus === 'idle' && 'Salvar Alterações'}
                           {saveStatus === 'saving' && 'Salvando...'}
                           {saveStatus === 'saved' && 'Salvo!'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
