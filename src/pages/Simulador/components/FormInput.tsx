import { InfoTooltip } from './InfoTooltip';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    unit?: string;
    tooltipTitle?: string;
    tooltipContent?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({ label, unit, tooltipTitle, tooltipContent, ...props }) => {
    return (
        <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                {label}
                {tooltipTitle && tooltipContent && (
                    <InfoTooltip title={tooltipTitle}>
                        {tooltipContent}
                    </InfoTooltip>
                )}
            </label>
            <div className="flex items-center mt-1">
                {unit === "R$" && <span className="text-gray-500 mr-1">{unit}</span>}
                <input
                    {...props}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                {unit && unit !== "R$" && <span className="text-gray-500 ml-2">{unit}</span>}
            </div>
        </div>
    );
};