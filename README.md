# $ Calcula Delivery

**Protótipo de Interface para Cálculo de Preços de Delivery**

> ⚠️ **IMPORTANTE**: Este é um projeto acadêmico desenvolvido exclusivamente para a disciplina de **Design de Interface Humano-Computador (IHC)** do curso de **Análise e Desenvolvimento de Sistemas** do IFPA. Trata-se de um protótipo funcional com fins educacionais e não deve ser utilizado em ambiente de produção.

## 📋 Sobre o Projeto

O **Calcula Delivery** é um protótipo de aplicação web desenvolvido para demonstrar a aplicação prática dos conceitos de design de interface e experiência do usuário. O projeto simula uma plataforma para cálculo de preços de delivery, permitindo que restaurantes e estabelecimentos possam estimar custos de entrega de forma intuitiva e eficiente.

### 🎯 Objetivos Acadêmicos

- Aplicar os **5 planos de design de interface** (Estratégia, Escopo, Estrutura, Esqueleto e Superfície)
- Demonstrar o processo completo de desenvolvimento de interface centrada no usuário
- Implementar um protótipo navegável funcional
- Validar conceitos de usabilidade e experiência do usuário

## 🔬 Metodologia de Design

O projeto foi desenvolvido seguindo a metodologia dos **5 Planos de Design de Interface**:

### 1. 📊 **Estratégia**
- **Briefing**: Definição dos objetivos e necessidades do projeto
- **Protopersonas**: Criação de perfis de usuários-alvo
- **Análise de requisitos**: Identificação das funcionalidades essenciais

### 2. 📝 **Escopo**
- Definição das funcionalidades principais
- Especificação de requisitos funcionais e não-funcionais
- Delimitação do MVP (Produto Mínimo Viável)

### 3. 🏗️ **Estrutura**
- Arquitetura da informação
- Fluxos de navegação
- Organização hierárquica do conteúdo

### 4. 🖼️ **Esqueleto**
- Wireframes de baixa e média fidelidade
- Layout das páginas principais
- Definição de componentes de interface

### 5. 🎨 **Superfície**
- Design visual final
- Paleta de cores e tipografia
- Elementos gráficos e iconografia

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
   git clone [URL_DO_REPOSITORIO]
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
   http://localhost:5173
   ```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa verificação de código
- `npm run deploy` - Deploy para GitHub Pages

## 🎨 Funcionalidades Implementadas

### 🏠 **Dashboard**
- Visão geral dos dados de delivery
- Cards informativos com métricas principais
- Interface responsiva e intuitiva

### 🧮 **Simulador de Preços**
- Calculadora interativa para custos de delivery
- Diferentes cenários de cálculo
- Visualização em tempo real dos resultados

### 📊 **Relatórios**
- Geração de relatórios em PDF
- Gráficos e visualizações de dados
- Exportação de informações

### 🍽️ **Gestão de Cardápio**
- Lista de pratos com preços
- Interface para visualização de produtos
- Dados mockados para demonstração

### 📚 **Central de Ajuda**
- FAQ interativo
- Seção educativa sobre delivery
- Suporte ao usuário

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