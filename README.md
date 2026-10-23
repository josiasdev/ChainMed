# ChainMed

**Prescrição médica digital com segurança e rastreabilidade via blockchain.**

Plataforma Web3 para emissão, armazenamento e compartilhamento de prescrições médicas na rede Ethereum Sepolia. Os dados da prescrição são registrados on-chain por meio de um contrato inteligente em Solidity, e a interface consome a blockchain diretamente via MetaMask.

## Sobre

O ChainMed conecta médicos e pacientes por meio de um contrato inteligente que registra prescrições de forma imutável e rastreável. O paciente controla quem acessa suas prescrições, compartilhando-as com outros médicos sob sua decisão. O front-end é uma aplicação SPA React que interage com a blockchain Ethereum (rede de teste Sepolia) via carteira MetaMask, sem backend intermediário.

Destaques:

- Anti-fraude: prescrições imutáveis registradas em blockchain
- Rastreabilidade: histórico completo e auditável de emissão e compartilhamento
- Controle do paciente: compartilhamento sob decisão do titular
- Confiança médica: registro de profissionais com CRM e especialidade

## Tecnologias

### Front-end

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.3.1 | Biblioteca de interfaces |
| TypeScript | 5.6.3 | Tipagem estática |
| Vite | 5.4.18 | Build tool e dev server |
| React Router DOM | 6.30.0 | Roteamento SPA |
| Tailwind CSS | 3.4.17 | Estilização utilitária |
| shadcn/ui | — | Componentes de UI (Radix UI + Tailwind) |
| Radix UI | 1.x–2.x | Primitivos de acessibilidade (~30 pacotes) |
| TanStack React Query | 5.59.16 | Gerenciamento de estado assíncrono |
| ethers.js | 5.8.0 | Integração com Ethereum (JSON-RPC) |
| React Hook Form | 7.53.1 | Gerenciamento de formulários |
| Zod | 3.23.8 | Validação de schemas |
| lucide-react | 0.462.0 | Ícones |
| qrcode.react | 4.2.0 | Geração de QR Code de prescrições |
| sonner | 1.5.0 | Notificações (toasts) |
| date-fns | 3.6.0 | Manipulação de datas |
| class-variance-authority | 0.7.1 | Variantes de componentes |
| clsx | 2.1.1 | Concatenação condicional de classes |
| tailwind-merge | 2.5.4 | Fusão de classes Tailwind |
| tailwindcss-animate | 1.0.7 | Animações para Tailwind |
| next-themes | 0.3.0 | Tema claro/escuro |

Componentes adicionais do ecossistema shadcn/ui presentes no projeto: recharts, vaul (drawer), cmdk (command palette), embla-carousel-react, react-day-picker, react-resizable-panels, input-otp, entre outros.

### Contrato inteligente

| Tecnologia | Versão | Uso |
|---|---|---|
| Solidity | 0.8.26 | Linguagem do contrato |
| Ethereum (Sepolia) | Chain ID 11155111 | Rede de execução |
| MetaMask | — | Carteira e assinatura de transações |

O contrato `TuringRX.sol` é autocontido (sem dependências externas, como OpenZeppelin) e implementa:

- Cadastro de médicos (nome, CRM, especialidade) e pacientes (nome, CPF)
- Criação de prescrições por médicos registrados
- Compartilhamento controlado pelo paciente
- Consulta de prescrições com verificação de permissão
- Eventos para listagem e rastreabilidade

Contrato implantado em Sepolia: `0xD78f5D898Fb070D798edCC6Ca6d386aF9c1c90d3`

### Ferramentas de desenvolvimento

| Ferramenta | Versão | Uso |
|---|---|---|
| ESLint | 9.13.0 | Análise estática de código |
| typescript-eslint | 8.11.0 | Regras ESLint para TypeScript |
| PostCSS | 8.4.47 | Processamento de CSS |
| Autoprefixer | 10.4.20 | Prefixedos automáticos de CSS |
| lovable-tagger | 1.1.8 | Tagging de componentes (ambiente Lovable) |

## Estrutura do projeto

```
ChainMed/
├── contracts/
│   └── TuringRX.sol            # Contrato inteligente (Solidity 0.8.26)
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Layout compartilhado (header, nav, footer)
│   │   └── ui/                 # 49 componentes shadcn/ui
│   ├── hooks/                  # use-toast, use-mobile
│   ├── lib/utils.ts            # Helper cn() (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── Login.tsx           # Conexão MetaMask e registro on-chain
│   │   ├── NotFound.tsx        # Página 404
│   │   ├── doctor/             # Prescriptions, NewPrescription, SharedPrescriptions, Profile
│   │   └── patient/            # Prescriptions, SharePrescription, SharedPrescriptions, Profile
│   ├── types/global.d.ts       # Tipagem de window.ethereum (EIP-1193)
│   ├── utils/web3.ts           # Camada de integração blockchain (ethers + ABI)
│   ├── App.tsx                 # Definição de rotas e guards
│   └── main.tsx                # Ponto de entrada
├── public/                     # Assets estáticos
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── tailwind.config.ts
├── postcss.config.js
└── eslint.config.js
```

## Funcionalidades

### Papéis

- **Médico**: consulta suas prescrições emitidas, cria novas prescrições para pacientes registrados e visualiza prescrições que pacientes compartilharam com ele.
- **Paciente**: consulta suas prescrições, compartilha prescrições com médicos (por CRM) e acompanha o que já foi compartilhado.

### Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page pública |
| `/login` | Conexão MetaMask, seleção de rede Sepolia e registro on-chain |
| `/doctor/prescriptions` | Lista de prescrições do médico (com QR Code) |
| `/doctor/prescriptions/new` | Emissão de nova prescrição |
| `/doctor/shared` | Prescrições compartilhadas com o médico |
| `/doctor/profile` | Perfil do médico |
| `/patient/prescriptions` | Prescrições do paciente (com QR Code) |
| `/patient/share` | Compartilhamento de prescrição com um médico |
| `/patient/shared` | Prescrições que o paciente compartilhou |
| `/patient/profile` | Perfil do paciente |

### Integração com blockchain

- Conexão com MetaMask via EIP-1193 (`window.ethereum`)
- Troca/adicionação automática da rede Sepolia (Chain ID `0xaa36a7`)
- Listagens resolvidas por eventos (`PrescriptionCreated`, `PrescriptionShared`) via `contract.queryFilter`
- QR Code gerado a partir dos dados da prescrição para compartilhamento off-chain

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- npm (ou Bun)
- Extensão MetaMask instalada no navegador

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:8080`.

### Build de produção

```bash
npm run build
```

### Visualizar build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Screenshots

### Tela principal

![image](https://github.com/user-attachments/assets/24193083-98b0-4583-b580-daa00da20196)

### Tela prescrição (médico)

![image](https://github.com/user-attachments/assets/b6f963d0-fcd6-4f15-900b-0da61b43747a)
![image](https://github.com/user-attachments/assets/4e924d32-13a9-41a7-8c5e-a7d4af1f610f)
![image](https://github.com/user-attachments/assets/00ddc548-c325-4b07-bebf-90c1b5e14f02)
![image](https://github.com/user-attachments/assets/e095a140-b1c5-4fe6-9b49-7ec4d98b32f7)

### Tela paciente

![image](https://github.com/user-attachments/assets/f87fb87d-2e8a-4c56-9578-31c10ad78891)
![image](https://github.com/user-attachments/assets/abe16171-a853-4230-b25b-a14edacacac2)
![image](https://github.com/user-attachments/assets/d7ec1d18-93a1-44c3-8639-4d5c7f81fdc5)
![image](https://github.com/user-attachments/assets/77ee4c22-eb53-4698-8d3c-a7ea52d2e8c0)

## Licença

MIT
