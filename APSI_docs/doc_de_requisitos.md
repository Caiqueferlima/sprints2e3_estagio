# Documento de Requisitos

## 1. Escopo e contexto

Este documento foi elaborado por engenharia reversa a partir da aplicação existente. O sistema é uma aplicação web que consulta a API do The New York Times e apresenta notícias ao usuário. O back-end funciona como intermediário entre a interface e a API externa, mantendo a chave de acesso no servidor.

O escopo compreende:

* visualização de notícias populares do período de sete dias disponibilizadas pelo endpoint Most Popular do NYT;
* pesquisa de artigos pelo endpoint Article Search;
* filtros de período e ordenação;
* apresentação dos resultados e acesso ao artigo original.

Não fazem parte do escopo autenticação de usuários, persistência de notícias, administração de conteúdo ou publicação de artigos.

**Atores:** o ator principal é o **Usuário**, que interage com a interface web. A **API do The New York Times** é um sistema externo integrado, não um usuário do sistema.

## 2. Requisitos funcionais

* **RF01 — Visualizar notícias populares**
  * **Descrição:** O sistema deve permitir ao usuário visualizar as notícias mais populares visualizadas nos últimos sete dias, obtidas da API Most Popular do NYT.
  * **Implementação observada:** requisição `GET /popular`, que consulta o endpoint `/svc/mostpopular/v2/viewed/7.json`.

* **RF02 — Pesquisar notícias por termo**
  * **Descrição:** O sistema deve permitir ao usuário informar um termo e pesquisar artigos no NYT.
  * **Implementação observada:** requisição `GET /articles` com o parâmetro `q`.

* **RF03 — Informar data inicial**
  * **Descrição:** O sistema deve permitir informar a data inicial do período da pesquisa.
  * **Implementação observada:** parâmetro `begin_date`, enviado no formato `YYYYMMDD`.

* **RF04 — Informar data final**
  * **Descrição:** O sistema deve permitir informar a data final do período da pesquisa.
  * **Implementação observada:** parâmetro `end_date`, enviado no formato `YYYYMMDD`.

* **RF05 — Ordenar resultados**
  * **Descrição:** O sistema deve permitir selecionar a ordenação por mais recentes, mais antigas ou relevância.
  * **Implementação observada:** parâmetro `sort` com os valores `newest`, `oldest` ou `relevance`.

* **RF06 — Exibir resultados da pesquisa**
  * **Descrição:** O sistema deve apresentar os artigos retornados para os critérios informados, incluindo os metadados da pesquisa.

* **RF07 — Exibir informações do artigo**
  * **Descrição:** Para cada artigo, o sistema deve apresentar título, resumo, data de publicação, imagem quando disponível e link para o artigo original.

* **RF08 — Acessar artigo original**
  * **Descrição:** O sistema deve permitir que o usuário abra o artigo no endereço disponibilizado pelo NYT.

* **RF09 — Informar pesquisa sem resultados**
  * **Descrição:** Quando a pesquisa retornar uma lista vazia, o sistema deve informar que nenhum artigo foi encontrado.

* **RF10 — Informar falhas de integração**
  * **Descrição:** Quando a consulta ao serviço externo falhar, o back-end deve retornar uma resposta HTTP de erro e a interface deve apresentar uma mensagem ao usuário.

## 3. Requisitos não funcionais

* **RNF01 — Interface web**
  * **Descrição:** As funcionalidades devem ser disponibilizadas por uma interface web composta por HTML, CSS e JavaScript.

* **RNF02 — Integração externa**
  * **Descrição:** O back-end deve integrar-se à API do NYT por meio de requisições HTTP.

* **RNF03 — Arquitetura em camadas**
  * **Descrição:** O back-end deve separar rotas, controladores, serviços, validação e auxiliares, conforme descrito no Documento Arquitetural.

* **RNF04 — Proteção da credencial**
  * **Descrição:** A chave da API do NYT deve ser fornecida ao back-end por meio da variável de ambiente `NYT_API_KEY`, não sendo enviada pela interface web.

* **RNF05 — Execução containerizada**
  * **Descrição:** A aplicação deve poder ser executada em um contêiner Docker, com exposição da porta configurada para o servidor.

* **RNF06 — Tratamento de erros**
  * **Descrição:** O back-end deve distinguir respostas bem-sucedidas de falhas de
integração e retornar código HTTP e mensagem compatíveis com o erro identificado.

* **RNF07 — Compatibilidade com a API externa**
  * **Descrição:** O sistema deve consumir os formatos de resposta dos endpoints de
pesquisa e de notícias populares do NYT.

## 4. Rastreabilidade entre requisitos e implementação

| Requisito | Principais elementos relacionados |
|---|---|
| RF01 | `src/routes/articleRoutes.js`, `src/controllers/articleController.js`, `src/services/articleService.js`, `public/js/articlePopular/` |
| RF02–RF05 | `public/js/articleSearch/search.js`, `src/services/validate/validityQuery.js`, `src/services/articleService.js` |
| RF06–RF09 | `public/js/articleSearch/cards.js`, `public/js/articlePopular/cards.js`, `public/js/articleSearch/meta.js` |
| RF10 e RNF06 | `src/helpers/CustomError.js`, controladores e serviços |
| RNF01 | `public/index.html`, `public/css/` e `public/js/` |
| RNF02 e RNF07 | `src/services/articleService.js` |
| RNF03 | `src/routes/`, `src/controllers/`, `src/services/` e `src/helpers/` |
| RNF04 | `src/server.js` e `src/services/articleService.js` |
| RNF05 | `Dockerfile` e `docker-compose.yml` |
