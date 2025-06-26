import React from 'react';

interface ConfigCardProps {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const ConfigCard: React.FC<ConfigCardProps> = ({ title, children, footer }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md flex flex-col">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">{title}</h3>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
            {footer && (
                <div className="bg-gray-50 p-4 rounded-b-2xl border-t border-gray-200 mt-auto">
                    {footer}
                </div>
            )}
        </div>
    );
};
