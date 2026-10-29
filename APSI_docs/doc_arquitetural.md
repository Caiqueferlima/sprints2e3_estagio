# Documento Arquitetural

## 1. Visão geral

O sistema tem uma  **arquitetura em camadas** implementada com Node.js e Express. O fluxo principal é:

```text
Interface web -> Rota -> Controlador -> Serviço -> API do NYT
                                      |
                                      +-> Validação e tratamento de erros
```

As rotas reais da aplicação são `GET /articles`, para pesquisa, `GET /popular`, para notícias populares, e `GET /`, para servir a página inicial. Os diagramas devem utilizar essas rotas, e não `/articles/search` ou `/articles/popular`.

## 2. Organização em camadas

### 2.1. Apresentação

A camada de apresentação está em `public/`. `index.html` define a interface, `css/` define a aparência e `js/` realiza as requisições ao back-end e monta os cards de artigos. O navegador não acessa diretamente a API do NYT nem recebe sua chave.

### 2.2. Rotas

`src/routes/articleRoutes.js` configura os endpoints HTTP e associa cada endpoint ao controlador correspondente. A rota não contém regra de negócio.

### 2.3. Controladores

`src/controllers/articleController.js` contém os controladores de pesquisa e de notícias populares. Eles extraem os parâmetros da requisição, invocam o serviço e transformam o resultado em resposta HTTP. Também distinguem `CustomError` de erros não previstos.

### 2.4. Serviços

`src/services/articleService.js` concentra a integração com a API do NYT. Há uma operação para Article Search e outra para Most Popular. O serviço monta as requisições, utiliza `NYT_API_KEY`, verifica a resposta e devolve ao controlador os dados retornados pela API.

O serviço não implementa um `ArticleDTO` separado: na pesquisa, retorna `{ docs, meta }`, e, nas notícias populares, retorna o corpo da resposta do NYT. Os objetos são interpretados e apresentados no front-end.

### 2.5. Validação e tratamento de erros

`src/services/validate/validityQuery.js` preenche valores padrão para parâmetros ausentes e rejeita a ausência do termo `q`. `src/helpers/CustomError.js` define um erro com `statusCode` para comunicação entre serviço e controlador.

Essa validação é simples e não constitui um mecanismo completo de validação de formato e consistência de datas. Essa delimitação deve ser considerada na defesa do artefato.

## 3. Princípios SOLID

### 3.1. SRP — Responsabilidade Única

Há aplicação parcial e predominante do SRP:

* rotas registram endpoints;
* controladores lidam com o protocolo HTTP;
* serviços coordenam a consulta ao NYT;
* `validityQuery.js` trata os valores padrão da pesquisa;
* `CustomError` representa erros com código HTTP.

O serviço ainda concentra montagem da URL, chamada externa e tratamento da resposta. Portanto, é mais preciso afirmar que existe separação de responsabilidades em módulos, e não que cada módulo possui uma única operação.

### 3.2. OCP — Aberto/Fechado

O uso de `CustomError` cria um ponto comum para erros HTTP e facilita a inclusão de novos tipos de erro. Isso é uma evidência de extensibilidade.

### 3.3. DIP — Inversão de Dependência

O DIP não está implementado de forma plena. O controlador depende diretamente das funções exportadas por `articleService`, e o serviço depende diretamente do Axios e das URLs do NYT. Existe, contudo, uma separação que evita que o controlador faça a comunicação HTTP externa diretamente.

Essa separação reduz o acoplamento entre controlador e infraestrutura, mas não deve ser apresentada como injeção de dependência ou como uma abstração formal.

### 3.4. LSP e ISP

Não há hierarquia de classes de domínio nem interfaces de provedores no projeto. Consequentemente, não há evidência suficiente para afirmar aplicação prática do LSP ou do ISP.

## 4. Decisões e limitações arquiteturais

* A API do NYT é uma dependência externa e o sistema não mantém banco de dados ou cache próprio.
* A chave da API permanece no servidor, em variável de ambiente.
* O formato devolvido pelo back-end permanece próximo ao formato da API externa; o front-end conhece a estrutura dos artigos.
* O Docker e o Docker Compose fazem parte da implantação. A execução containerizada foi validada no ambiente do projeto.
