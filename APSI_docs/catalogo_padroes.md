# Catálogo de Padrões

Este catálogo foi elaborado por engenharia reversa do projeto desenvolvido nas sprints 2 e 3 do Estágio AI/ML da Compass UOL. Ele diferencia padrões identificáveis na implementação dos padrões que seriam alternativas possíveis, mas não estão efetivamente implementados.

## 1. Padrões GRASP

### 1.1. Controller (Controlador)

* **Onde ocorre:** `src/controllers/articleController.js`.
* **Responsabilidade:** `articleSearchController` e `articlePopularController` recebem as requisições encaminhadas pelas rotas, coordenam a chamada ao serviço e constroem a resposta HTTP.
* **Justificativa:** O objeto controlador representa o sistema perante a interface e evita que a rota contenha a lógica de integração com a API externa. É o padrão GRASP mais evidente no projeto.

### 1.2. Information Expert (Especialista na Informação)

* **Onde ocorre:** `src/services/articleService.js`.
* **Responsabilidade:** O serviço conhece os endpoints, parâmetros e formatos necessários para consultar o NYT.
* **Justificativa:** A responsabilidade de consultar a fonte externa foi atribuída ao módulo que possui as informações específicas dessa integração. O serviço devolve os dados da API; não há, no código atual, um mapeamento para uma classe `ArticleDTO`.

### 1.3. High Cohesion (Alta Coesão)

* **Onde ocorre:** na divisão entre `routes`, `controllers`, `services`, `services/validate` e `helpers`.
* **Justificativa:** Cada grupo de módulos concentra responsabilidades relacionadas: roteamento, protocolo HTTP, integração, valores de pesquisa e representação de erros. O serviço ainda acumula chamada externa e tratamento da resposta, portanto a coesão é adequada, mas não absoluta.

### 1.4. Low Coupling (Baixo Acoplamento)

* **Onde ocorre:** principalmente na separação entre rotas, controladores e serviços.
* **Justificativa:** A rota não conhece os detalhes da API do NYT e o controlador não monta a requisição HTTP externa. Entretanto, o serviço importa diretamente o Axios e as URLs do NYT; portanto, trata-se de baixo acoplamento relativo, não de independência completa.

### 1.5. Protected Variations (Variações Protegidas)

* **Aplicabilidade:** parcial e implícita.
* **Justificativa:** O controlador está protegido de detalhes de montagem da requisição externa porque chama o serviço. Porém, não existe uma interface ou adaptador explícito que permita trocar o provedor sem alterar o serviço. Portanto, este padrão pode ser apresentado como uma intenção arquitetural parcial, não como uma implementação completa.

## 2. Padrões GoF e padrões arquiteturais

### 2.1. Facade (Fachada)

* **Onde ocorre:** nas funções exportadas por `src/services/articleService.js`.
* **Justificativa:** O serviço oferece operações simples para a aplicação, ocultando do controlador os detalhes de autenticação, URL, parâmetros, Axios e tratamento da resposta do NYT. Ele funciona como uma fachada de integração.
* **Limite da identificação:** A fachada não transforma a resposta em um modelo próprio. A pesquisa retorna `{ docs, meta }` e a operação de populares retorna o corpo da API.

### 2.2. Module (Módulo) — observação de implementação

O uso de módulos CommonJS organiza as responsabilidades e limita o acesso ao que é exportado. Isso é uma técnica de modularização da linguagem/runtime, não deve ser confundido com a implementação de um Singleton GoF.

## 3. Padrões não identificados e justificativa

### 3.1. Singleton

O cache de módulos do CommonJS pode reutilizar o valor exportado, mas o projeto não define uma instância única controlada, construtor privado ou operação de acesso global. Por isso, Singleton não deve ser apresentado como padrão implementado. O cache é uma característica do runtime, não uma decisão explícita de projeto.

### 3.2. DTO (Data Transfer Object)

Não há classe, função de mapeamento ou contrato `ArticleDTO` no código. O back-end retorna estruturas próximas às respostas da API e o front-end lê seus campos diretamente. Assim, DTO não deve ser listado como padrão utilizado.

### 3.3. Outros padrões GoF

Não foram identificadas evidências suficientes de Factory, Adapter, Strategy, Observer ou Repository. A ausência é compatível com uma aplicação pequena, sem persistência e com um único provedor externo. Incluir esses padrões apenas por serem possíveis alternativas reduziria a precisão da engenharia reversa.

## 4. Síntese:

Os padrões que podem ser defendidos com maior segurança são:

* GRASP Controller;
* GRASP Information Expert;
* GRASP High Cohesion e Low Coupling;
* GoF Facade, aplicada à integração com o NYT.

Protected Variations pode ser mencionada como aplicação parcial. Singleton e DTO não são implementados, com as justificativas acima.
