import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/Sidebar';
import type { Page } from '../../types';
import { faqData, type FaqItem } from '../../data/faqData';
import { Search, ChevronDown, LifeBuoy } from 'lucide-react';

const FaqAccordionItem = ({ faq, isOpen, onToggle }: { faq: FaqItem, isOpen: boolean, onToggle: () => void }) => (
    <div className="border-b border-gray-200">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 focus:outline-none"
        >
            <span className="font-semibold text-lg text-gray-800">{faq.question}</span>
            <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="p-4 pt-0 text-gray-600 animate-fade-in">
                <p>{faq.answer}</p>
            </div>
        )}
    </div>
);

export const CentralDeAjudaPage: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openId, setOpenId] = useState<number | null>(null);

    const filteredFaqs = useMemo(() => {
        if (!searchTerm) return faqData;
        const lowercasedFilter = searchTerm.toLowerCase();
        return faqData.filter(faq =>
            faq.question.toLowerCase().includes(lowercasedFilter) ||
            faq.answer.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm]);

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navigateTo={navigateTo} activePage="centralDeAjuda" />
            <main className="flex-1 p-6 sm:p-10">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center gap-4 mb-4">
                        <LifeBuoy className="h-10 w-10 text-blue-600" />
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800">Central de Ajuda</h2>
                            <p className="text-lg text-gray-600">Encontre respostas para as dúvidas mais comuns.</p>
                        </div>
                    </div>

                    <div className="relative my-8">
                        <input
                            type="text"
                            placeholder="Busque por um tópico... (ex: 'mão de obra', 'promoção')"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map(faq => (
                                <FaqAccordionItem
                                    key={faq.id}
                                    faq={faq}
                                    isOpen={openId === faq.id}
                                    onToggle={() => handleToggle(faq.id)}
                                />
                            ))
                        ) : (
                            <p className="p-8 text-center text-gray-500">Nenhum resultado encontrado para sua busca.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};