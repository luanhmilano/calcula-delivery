import { Sidebar } from '../../components/Sidebar';
import type { Page } from '../../types';
import { ArrowLeft, TrendingUp, DollarSign, Percent } from 'lucide-react';

interface AprendaAPrecificarPageProps {
    navigateTo: (page: Page) => void;
}

const ArticleCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-3">
            <div className="p-2 bg-green-100 text-green-700 rounded-full mr-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{children}</p>
    </div>
);

export const AprendaAPrecificarPage: React.FC<AprendaAPrecificarPageProps> = ({ navigateTo }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="aprenda" />
            <main className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-10">
                <div className="container mx-auto">
                    <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-green-600 font-medium mb-6 hover:underline mt-12 lg:mt-0">
                       <ArrowLeft size={18} />
                       Voltar para o Dashboard
                    </button>
                    
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Aprenda a Precificar</h2>
                        <p className="text-base sm:text-lg text-gray-600 mt-2">Conceitos chave para dominar a arte da precificação e aumentar seu lucro.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <ArticleCard icon={<DollarSign />} title="Custo Fixo vs. Custo Variável">
                            <strong>Custos Fixos</strong> são despesas que não mudam com o volume de vendas (ex: aluguel, internet). <strong>Custos Variáveis</strong> mudam conforme você vende mais (ex: ingredientes, embalagens). Separar os dois é o primeiro passo para uma precificação correta.
                        </ArticleCard>
                        
                        <ArticleCard icon={<Percent />} title="O que é Margem de Lucro?">
                            Não é apenas "o que sobra". A margem é o percentual do preço de venda que corresponde ao lucro, após descontar TODOS os custos (ingredientes, taxas, fixos rateados). Uma margem saudável garante a sustentabilidade do seu negócio.
                        </ArticleCard>

                        <ArticleCard icon={<TrendingUp />} title="Ponto de Equilíbrio (Break-Even)">
                            É o faturamento mínimo que você precisa atingir para "empatar", ou seja, cobrir todos os seus custos fixos e variáveis. Saber seu ponto de equilíbrio te ajuda a definir metas de vendas realistas e a evitar prejuízos.
                        </ArticleCard>

                         <ArticleCard icon={<TrendingUp />} title="CMV: O Custo da sua Mercadoria">
                            CMV (Custo de Mercadoria Vendida) se refere ao custo exato dos ingredientes usados em um prato. Calcular o CMV corretamente é essencial para não ter surpresas e garantir que o preço de venda cubra o que você gastou para produzir.
                        </ArticleCard>
                    </div>
                </div>
            </main>
        </div>
    );
};