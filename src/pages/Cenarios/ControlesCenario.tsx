import { FormInput } from '../Simulador/components/FormInput';

interface ControlesCenarioProps {
    aumentoCusto: number;
    setAumentoCusto: (n: number) => void;
    desconto: number;
    setDesconto: (n: number) => void;
}

export const ControlesCenario: React.FC<ControlesCenarioProps> = ({ aumentoCusto, setAumentoCusto, desconto, setDesconto }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Simular Cenários</h3>
        <p className="text-sm text-gray-500 mb-6">Altere as variáveis abaixo para ver o impacto em tempo real no seu lucro e margem.</p>
        <div className="space-y-6">
            <FormInput
                label="Aumento no Custo dos Insumos"
                unit="%"
                value={aumentoCusto}
                onChange={e => setAumentoCusto(parseFloat(e.target.value) || 0)}
                tooltipTitle="Simular Aumento de Custos"
                tooltipContent={<p>Use este campo para simular o que aconteceria se o preço dos seus ingredientes subisse. Por exemplo, se o queijo ficar 10% mais caro, qual será o impacto no seu lucro final?</p>}
            />
            <FormInput
                label="Desconto Promocional no Prato"
                unit="%"
                value={desconto}
                onChange={e => setDesconto(parseFloat(e.target.value) || 0)}
                tooltipTitle="Simular Promoções"
                tooltipContent={<p>Veja o impacto exato de uma promoção antes de lançá-la. Insira o percentual de desconto que você pretende oferecer para saber se a sua margem de lucro continuará saudável.</p>}
            />
        </div>
    </div>
);