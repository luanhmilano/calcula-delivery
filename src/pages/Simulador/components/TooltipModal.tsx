import { X } from 'lucide-react';

interface TooltipModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export const TooltipModal: React.FC<TooltipModalProps> = ({ title, children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                <div className="text-gray-600 space-y-4">
                    {children}
                </div>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};