# Microserviço de Geração de Relatórios

Este projeto é um microserviço desenvolvido em Node.js utilizando Express, Prisma e JsReport, responsável por gerar relatórios em formato PDF. Ele faz parte de uma arquitetura maior e utiliza autenticação baseada em chave de API.

## Estrutura do Projeto

```Bash
assets/
|
└── nomeDoRelatorio
|   ├── header.hbs                           # Arquivo hbs header e footer do relatório 
|   ├── helper.js                            # Arquivo JS dos helpers específicos do relatório
|   └── template.hbs                         # Arquivo hbs do corpo do relatório
|
src/
│
├── infra/
│   ├── auth/
│   │   └── apiKeyAuthGuard.ts               # Middleware para autenticação por chave de API
│   ├── report/
│   │   ├── report.service.ts                # Serviço para geração de relatórios
│   │   ├── report.service.interface.ts      # Interface para o serviço de relatório
│   │   └── jsreport/                        # Módulo para integração com o Jsreport
│   └── database/
│       └── prisma.service.ts                # Configuração do Prisma
│
├── modules/
│   └── reports/
│       └── nomeDoRelatorio/                 # Diretório para estratégias específicas de relatórios
│           ├── teste.dataset.interface.ts   # Interface do dataset para o relatório específico
│           ├── teste.report.interface.ts    # Interface do relatório específico
│           └── teste.strategy.ts            # Implementação da estratégia de relatório
│
└── app/
    └── router.ts                            # Definição das rotas da aplicação
```

## Instalação

1. Clone o repositório:

```Bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Instale as dependências:

```Bash
yarn
```

3. Configure as variáveis de ambiente:
   Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```Bash
DATABASE_URL="seu-database-url-aqui"
API_KEY="sua-api-key-aqui"
```

4. Execute as migrações do banco de dados:

```Bash
npx prisma migrate dev
```

5. Inicie o servidor:

```Bash
npm start
```

## Uso

### Endpoint para Geração de Relatórios

- Rota: GET /report
- Autenticação: Chave de API (apiKeyAuthGuard)
- Descrição: Gera um relatório em PDF com base nos filtros fornecidos e retorna o PDF no corpo da resposta.

Exemplo de Requisição:

```Bash
GET /report
Content-Type: application/json
x-api-key: sua-api-key-aqui

{
  "filters": {
    "dataInicio": "2024-01-01",
    "dataFim": "2024-01-31"
  },
  "reportName": "nomeDoRelatorio",
  "user": {
    "email": "usuario@example.com",
    "name": "Nome do Usuário"
  }
}
```

Exemplo de Resposta:

- `200 OK`: Retorna um arquivo PDF gerado de acordo com os parâmetros fornecidos.

## Implementação de Estratégias de Relatório

Para adicionar novos relatórios, siga o padrão estabelecido na pasta src/modules/reports/. Cada novo relatório deve implementar a interface IReportService e ser registrado na fábrica de relatórios (reportFactory).

Exemplo de Estratégia de Relatório:

```Typescript
export class TesteStrategy implements ReportStrategy {
  constructor() {
    registerStrategy('testeStrategy')
  }
  async generate(report: ITesteReport): Promise<Buffer> {
    const jsReport = new JsreportService()
    const prismaData = await prisma.atividade.findMany()
    const reportDataset: IJsReportReport<ITesteDataset> = {
      reportName: report.reportName,
      dataset: { ...prismaData }
    }
    return await jsReport.generate(reportDataset)
  }
}
```
