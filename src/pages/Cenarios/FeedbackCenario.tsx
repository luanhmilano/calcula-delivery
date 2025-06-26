import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface FeedbackCenarioProps {
    margemOriginal: number;
    margemSimulada: number;
}

export const FeedbackCenario: React.FC<FeedbackCenarioProps> = ({ margemOriginal, margemSimulada }) => {
    const diferencaMargem = margemSimulada - margemOriginal;

    if (margemSimulada < 0) {
        return (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-2xl border border-red-300 flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold">Alerta de Prejuízo!</h4>
                    <p>Com essa configuração, você venderá o prato com uma margem de {margemSimulada.toFixed(1)}%, resultando em prejuízo a cada venda. É altamente recomendável ajustar os custos ou o preço.</p>
                </div>
            </div>
        );
    }
    
    if (Math.abs(diferencaMargem) > 0.1) {
        const isMelhora = diferencaMargem > 0;
        return (
             <div className={`mt-6 p-4 rounded-2xl border flex items-start gap-4 ${isMelhora ? 'bg-green-50 text-green-800 border-green-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}`}>
                {isMelhora ? <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" /> : <TrendingDown className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />}
                <div>
                    <h4 className="font-bold">Dica Estratégica</h4>
                    <p>Essa mudança <span className="font-bold">{isMelhora ? 'aumenta' : 'diminui'}</span> sua margem de lucro em <span className="font-bold">{Math.abs(diferencaMargem).toFixed(1)}%</span>. Sua nova margem será de {margemSimulada.toFixed(1)}%.</p>
                </div>
            </div>
        )
    }

    return null;
}