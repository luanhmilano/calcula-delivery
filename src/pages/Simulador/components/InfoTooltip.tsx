import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { TooltipModal } from './TooltipModal';

interface InfoTooltipProps {
    title: string;
    children: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-gray-400 hover:text-green-600 transition-colors"
            >
                <HelpCircle size={16} />
            </button>
            {isModalOpen && (
                <TooltipModal title={title} onClose={() => setIsModalOpen(false)}>
                    {children}
                </TooltipModal>
            )}
        </>
    );
};