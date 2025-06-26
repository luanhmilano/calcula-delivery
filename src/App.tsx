import { useState } from 'react'
import { initialPratos } from './data/mockPratos';
import type { Prato, User, Page } from './types';

import { LandingPage } from './pages/Landing/LandingPage';
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ListaPratosPage } from './pages/ListaPratos/ListaPratosPage';
import { SimuladorPrecoPage } from './pages/Simulador/SimuladorPrecoPage';
import { RelatoriosPage } from './pages/Relatorios/RelatoriosPage';
import { PerfilPage } from './pages/Perfil/PerfilPage';
import { CadastroPage } from './pages/CadastroPage';
import { RecuperarSenhaPage } from './pages/RecuperarSenhaPage';
import { AprendaAPrecificarPage } from './pages/Aprenda/AprendaAPrecificarPage';
import { CenariosPage } from './pages/Cenarios/CenariosPage';
import { CentralDeAjudaPage } from './pages/CentralDeAjuda/CentralDeAjudaPage';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [pratos, setPratos] = useState<Prato[]>(initialPratos);
  const [selectedPrato, setSelectedPrato] = useState<Prato | null>(null);

  const navigateTo = (pageName: Page, prato?: Prato) => {
    setSelectedPrato(prato || null);
    setPage(pageName);
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string) => {
    const userName = email.split('@')[0].replace(/^\w/, c => c.toUpperCase());
    setUser({ nome: userName, email: email, nomeNegocio: `Restaurante do ${userName}` });
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('landing');
  };

  const handleSavePrato = (pratoData: Prato) => {
    if (pratoData.id && pratos.some(p => p.id === pratoData.id)) {
      setPratos(pratos.map(p => (p.id === pratoData.id ? pratoData : p)));
    } else {
      const newId = pratos.length > 0 ? Math.max(...pratos.map(p => p.id)) + 1 : 1;
      setPratos([...pratos, { ...pratoData, id: newId }]);
    }
    navigateTo('listaPratos');
  };

  const handleDeletePrato = (id: number) => {
    setPratos(pratos.filter(p => p.id !== id));
  };

  const handleApplyScenario = (pratoAtualizado: Prato) => {
    setPratos(pratos.map(p => p.id === pratoAtualizado.id ? pratoAtualizado : p));
};

  const renderPage = () => {
    if (!user && !['landing', 'login', 'cadastro', 'recuperarSenha', 'simuladorTeste'].includes(page)) {
      return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
    }

    switch (page) {
      case 'landing':
        return <LandingPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'cadastro':
        return <CadastroPage navigateTo={navigateTo} onLogin={handleLogin} />;
       case 'recuperarSenha':
        return <RecuperarSenhaPage navigateTo={navigateTo} />;
      case 'dashboard':
        return <DashboardPage navigateTo={navigateTo} user={user!} pratos={pratos} onLogout={handleLogout} />;
      case 'simulador':
      case 'simuladorTeste':
        return <SimuladorPrecoPage navigateTo={navigateTo} pratoInicial={selectedPrato || undefined} onSave={handleSavePrato} isTestMode={page === 'simuladorTeste'} />;
      case 'listaPratos':
        return <ListaPratosPage navigateTo={navigateTo} pratos={pratos} onDelete={handleDeletePrato} />;
      case 'relatorios':
        return <RelatoriosPage navigateTo={navigateTo} pratos={pratos} />;
      case 'perfil':
        return <PerfilPage navigateTo={navigateTo} user={user!} />;
      case 'aprenda':
        return <AprendaAPrecificarPage navigateTo={navigateTo} />;
      case 'cenarios':
            if (!selectedPrato) {
                 return <ListaPratosPage navigateTo={navigateTo} pratos={pratos} onDelete={()=>{}} />;
            }
            return <CenariosPage navigateTo={navigateTo} pratoOriginal={selectedPrato} onApplyScenario={handleApplyScenario} />;
      case 'centralDeAjuda':
        return <CentralDeAjudaPage navigateTo={navigateTo} />;
      default:
        return <LandingPage navigateTo={navigateTo} />;
    }
  };

  return <div className="bg-gray-50 min-h-screen font-sans">{renderPage()}</div>;
};

export default App
