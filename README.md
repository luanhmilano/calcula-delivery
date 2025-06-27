# $ Calcula Delivery - Protótipo de Interface

> ⚠️ **IMPORTANTE**: Este projeto tem fins exclusivamente educacionais. É uma demonstração prática da metodologia de design de interface e não deve ser utilizado em um ambiente de produção real. Os dados são simulados e a aplicação não possui um backend persistente.

## 📋 Sobre o Projeto

* O **Calcula Delivery** é um protótipo funcional de alta fidelidade desenvolvido como projeto final para a disciplina de Design de Interface Humano-Computador (IHC). A aplicação simula uma ferramenta web onde donos de pequenos negócios de alimentação, como marmitarias e lancherias virtuais, podem calcular o preço de venda de seus pratos de forma estratégica e intuitiva.
* O objetivo é transformar o complexo processo de precificação em uma tarefa simples e visual, ajudando o pequeno empreendedor a entender seus custos, definir margens de lucro sustentáveis e tomar decisões mais seguras, evitando o comum problema de "vender muito e lucrar pouco".

### 🎯 Objetivos Acadêmicos

- Aplicar os **5 planos de design de interface** (Estratégia, Escopo, Estrutura, Esqueleto e Superfície)
- Demonstrar o processo completo de desenvolvimento de interface centrada no usuário
- Implementar um protótipo navegável funcional
- Validar conceitos de usabilidade e experiência do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário

### Bibliotecas e Dependências
- **Lucide React** - Ícones modernos e consistentes
- **Recharts** - Biblioteca para gráficos e visualização de dados
- **jsPDF** - Geração de relatórios em PDF
- **jsPDF AutoTable** - Criação de tabelas em PDF

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processador de CSS
- **GitHub Pages** - Deploy e hospedagem

## 📁 Estrutura do Projeto

```
calcula-delivery/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── DashboardCard.tsx
│   │   ├── DicaRapidaFooter.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Aprenda/        # Seção educativa
│   │   ├── Cenarios/       # Simulação de cenários
│   │   ├── CentralDeAjuda/ # Suporte ao usuário
│   │   ├── Dashboard/      # Painel principal
│   │   ├── Landing/        # Página inicial
│   │   ├── ListaPratos/    # Gestão de cardápio
│   │   ├── Login/          # Autenticação
│   │   ├── Perfil/         # Perfil do usuário
│   │   ├── Relatorios/     # Relatórios e analytics
│   │   └── Simulador/      # Calculadora de preços
│   ├── data/              # Dados mockados
│   │   ├── faqData.ts
│   │   └── mockPratos.ts
│   ├── types/             # Definições TypeScript
│   └── App.tsx            # Componente principal
├── .github/workflows/     # CI/CD com GitHub Actions
└── docs/                  # Documentação do projeto
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/luanhmilano/calcula-delivery.git
   cd calcula-delivery
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173/calcula-delivery/
   ```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa verificação de código
- `npm run deploy` - Deploy para GitHub Pages

## 🎨 Funcionalidades Implementadas

O protótipo é navegável e simula as seguintes funcionalidades:

- 👤 Autenticação: Telas de Login, Cadastro e Recuperação de Senha.

- 🏠 Dashboard: Painel principal com visão geral, métricas e atalhos.

- 🧮 Simulador de Preços: Ferramenta central para calcular o preço de venda, incluindo CMV, custos diretos, indiretos e taxas.

- 🍽️ Gestão de Pratos: Lista de todos os pratos salvos com indicadores visuais de rentabilidade.

- 📈 Análise de Cenários: Ferramenta estratégica para simular o impacto de mudanças de custo e promoções.

- 📊 Relatórios: Geração e exportação de relatórios em PDF com os dados dos pratos.

- 💡 Seções de Ajuda: Páginas "Aprenda a Precificar" e "Central de Ajuda" com conteúdo educativo e FAQ.

## 🎓 Contexto Acadêmico

### Disciplina
**Design de Interface Humano-Computador (IHC)**

### Curso
**Análise e Desenvolvimento de Sistemas**

### Instituição
**Instituto Federal do Pará (IFPA)**

### Objetivos de Aprendizagem
- Compreender os princípios de design centrado no usuário
- Aplicar metodologias de desenvolvimento de interface
- Implementar protótipos funcionais
- Avaliar usabilidade e experiência do usuário
- Documentar o processo de design

## 📖 Documentação Adicional

Este projeto inclui documentação completa do processo de design, incluindo:

- **Briefing do projeto** - Definição de objetivos e requisitos
- **Protopersonas** - Perfis detalhados dos usuários-alvo
- **Wireframes** - Esboços das interfaces principais
- **Protótipo navegável** - Demonstração interativa das funcionalidades
- **Relatório de usabilidade** - Análise da experiência do usuário

## ⚖️ Licença e Uso

Este projeto foi desenvolvido exclusivamente para fins educacionais como parte do currículo acadêmico. Não possui licença para uso comercial e destina-se apenas à avaliação acadêmica e demonstração de competências em design de interface.

---

*Protótipo acadêmico - Não utilizar em produção*