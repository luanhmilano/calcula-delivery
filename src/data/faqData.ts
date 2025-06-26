export interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export const faqData: FaqItem[] = [
    {
        id: 1,
        question: "Como sei quantos pratos vendo por mês para colocar no cálculo?",
        answer: "Se você não tem um sistema de gestão (PDV), uma ótima forma de começar é fazer uma estimativa manual. Anote suas vendas diárias por uma ou duas semanas e depois calcule a média mensal. Lembre-se: é melhor ter um número estimado do que nenhum. Com o tempo, você pode refinar esse valor."
    },
    {
        id: 2,
        question: "Eu mesmo cozinho e entrego. Preciso colocar um custo de mão de obra?",
        answer: "Sim, com certeza! Este é um dos erros mais comuns. Seu tempo é um recurso valioso. Pense em quanto você pagaria a um funcionário para fazer o seu trabalho. Defina um valor por prato (ex: R$ 2,00 a R$ 4,00) como seu 'salário'. Não fazer isso mascara seu lucro real e impede o crescimento do negócio."
    },
    {
        id: 3,
        question: "Posso incluir o custo do delivery que eu mesmo faço com minha moto?",
        answer: "Deve! Calcule os custos variáveis da sua entrega, como gasolina e manutenção. Uma forma simples é definir um custo fixo por entrega (ex: R$ 3,00) e adicioná-lo como um 'Custo Direto' no simulador, assim como a embalagem. Isso garante que o cliente que pede delivery está cobrindo essa despesa."
    },
    {
        id: 4,
        question: "Como o sistema lida com promoções como 'compre 1, leve 2' ou cupons de desconto?",
        answer: "A melhor forma de simular promoções é na nossa página de 'Análise de Cenários'. Lá, você pode selecionar um prato e aplicar um percentual de 'Desconto Promocional' para ver o impacto exato na sua margem de lucro antes de lançar a campanha para seus clientes."
    },
    {
        id: 5,
        question: "O preço do meu principal ingrediente muda toda semana. Como gerencio isso?",
        answer: "Recomendamos que você salve seus pratos principais na 'Lista de Pratos'. Quando o preço de um insumo mudar, vá em 'Editar/Simular' no prato correspondente, atualize o custo do ingrediente no passo 2 e salve novamente. Manter os custos atualizados é crucial para garantir que sua margem permaneça saudável."
    },
    {
        id: 6,
        question: "O que eu coloco em 'Custos Fixos Mensais'?",
        answer: "Neste campo, você deve somar todas as despesas que você tem todo mês, independentemente do volume de vendas. Isso inclui: aluguel (da cozinha ou casa), conta de luz, conta de água, internet, gás, seu salário fixo (pró-labore), mensalidade de softwares, etc. O sistema rateia esse valor total entre os pratos vendidos."
    },
];