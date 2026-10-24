# Documento Arquitetural

## 1. Arquitetura Adotada e Organização em Camadas
O sistema adota uma **Arquitetura em Camadas (Layered Architecture)** baseada no ecossistema Node.js com Express. Essa abordagem separa as responsabilidades da aplicação, garantindo que o fluxo de dados seja unidirecional (da requisição para o processamento e, em seguida, para a resposta), facilitando a manutenção e a escalabilidade.

O back-end está organizado nas seguintes camadas principais:
*   **Camada de Rotas (`src/routes`):** Responsável por interceptar as requisições HTTP (`/articles/popular`, `/articles/search`) e direcioná-las para os controladores adequados. Ela atua como a porta de entrada da aplicação.
*   **Camada de Controladores (`src/controllers`):** Atua como mediadora. O `articleController.js` recebe os dados da requisição (parâmetros, *query strings*), invoca os serviços correspondentes para processar a lógica e retorna a resposta formatada ao cliente (código HTTP 200, 400, 500, etc.).
*   **Camada de Serviços (`src/services`):** Contém a **Regra de Negócio Principal**. O `articleService.js` é responsável por fazer a integração com a API externa (The New York Times), processar os dados recebidos e tratá-los antes de enviá-los de volta ao controlador.
*   **Camada de Validação e Auxiliares (`src/helpers` e `src/services/validate`):** Camadas transversais que fornecem suporte ao sistema. O `validityQuery.js` centraliza a validação de dados de entrada, enquanto o `CustomError.js` padroniza o lançamento de exceções.

## 2. Aplicação dos Princípios SOLID
A estrutura do projeto demonstra a aplicação clara de vários princípios SOLID:

*   **SRP (Single Responsibility Principle - Princípio da Responsabilidade Única):** É o princípio mais evidente no projeto.
    *   O `articleController` cuida *apenas* de lidar com requisições e respostas HTTP.
    *   O `articleService` cuida *apenas* da comunicação com a API do NYT.
    *   O `validityQuery` cuida *apenas* de validar se a busca do usuário está correta.
    *   Nenhuma classe ou arquivo faz mais de uma coisa.
*   **OCP (Open/Closed Principle - Princípio do Aberto/Fechado):** A criação da classe `CustomError` (que estende a classe `Error` nativa do JavaScript) permite que novos tipos de erros personalizados sejam criados futuramente sem a necessidade de alterar a lógica principal de captura de erros.
*   **DIP (Dependency Inversion Principle - Princípio da Inversão de Dependência):** Embora o Node.js não utilize interfaces rígidas como Java ou C#, o princípio é aplicado conceitualmente. O `articleController` não lida com requisições diretas à internet (como `axios` ou `fetch`); ele depende de uma abstração (o `ArticleService`). Se amanhã a API do NYT for trocada pela API de outro provedor, apenas o Serviço precisará ser alterado, blindando o Controlador.
