# Catálogo de Padrões

Nesta seção, identificamos e justificamos os padrões de projeto (GRASP e GoF) aplicados na solução para resolver problemas comuns de design de software.

## 1. Padrões GRASP (General Responsibility Assignment Software Patterns)

*   **Controlador (Controller):**
    *   **Onde ocorre:** Em `src/controllers/articleController.js`.
    *   **Justificativa:** O padrão dita que deve haver um componente responsável por receber e coordenar as operações do sistema oriundas da interface com o usuário. O `articleController` cumpre exatamente esse papel, recebendo as chamadas do front-end e coordenando as respostas.
*   **Especialista na Informação (Information Expert):**
    *   **Onde ocorre:** Em `src/services/articleService.js`.
    *   **Justificativa:** A responsabilidade de buscar e formatar os artigos foi atribuída ao `ArticleService` porque ele é o "especialista" que possui as informações necessárias (a URL base da API do NYT, a chave de acesso, e o conhecimento do formato do JSON de retorno).
*   **Alta Coesão e Baixo Acoplamento (High Cohesion & Low Coupling):**
    *   **Onde ocorre:** Em toda a arquitetura de pastas (`routes`, `controllers`, `services`, `helpers`).
    *   **Justificativa:** Ao separar a validação (`validityQuery.js`) do controlador, e a comunicação externa (`articleService.js`) da rota, o projeto garante que cada módulo seja altamente coeso (focado em uma única tarefa) e pouco acoplado (não dependem fortemente da implementação interna uns dos outros).

## 2. Padrões GoF (Gang of Four) e Padrões Arquiteturais

*   **Facade (Fachada):**
    *   **Onde ocorre:** `ArticleService` atua como uma fachada para a API do New York Times.
    *   **Justificativa:** A API do NYT possui diversos parâmetros complexos, regras de autenticação e retorna um JSON massivo com dezenas de propriedades irrelevantes para este sistema. O `ArticleService` esconde toda essa complexidade do resto do sistema, fornecendo métodos simples como `searchArticles()`, que internamente lidam com a complexidade de rede e filtragem de dados.
*   **Singleton:**
    *   **Onde ocorre:** Em módulos importados do Node.js (ex: quando é feito o `require('./services/articleService')`).
    *   **Justificativa:** No Node.js, os módulos são cacheados (*cached*) após a primeira vez que são carregados. Isso significa que instâncias de rotas, controladores e serviços atuam como Singletons naturais durante o ciclo de vida do servidor. Não há necessidade de instanciar múltiplas vezes o mesmo serviço para atender diferentes requisições.
*   **DTO (Data Transfer Object) - *Padrão Arquitetural Auxiliar*:**
    *   **Onde ocorre:** No retorno do `articleService` para o `articleController`.
    *   **Justificativa:** Ao invés de trafegar o JSON completo da API do NYT entre as camadas e enviá-lo ao front-end (o que consumiria banda desnecessária), o serviço mapeia os dados e cria um "Objeto de Transferência" leve contendo estritamente o que a interface precisa (título, resumo, imagem, url e data).