# 1. Documento de Requisitos

Nesta seção, estão identificados e descritos os requisitos funcionais e não funcionais do sistema de busca e visualização de notícias.

## 1.1. Requisitos Funcionais

Os requisitos funcionais (RF) descrevem as ações e comportamentos que o sistema deve suportar para atender às necessidades do usuário.

* **RF01 — Exibir notícias populares**
  * **Descrição:** O sistema deve permitir ao usuário visualizar as notícias mais populares da semana disponibilizadas pela API do The New York Times.

* **RF02 — Realizar pesquisa de notícias**
  * **Descrição:** O sistema deve permitir que o usuário pesquise notícias informando um termo de busca.

* **RF03 — Filtrar pesquisa por data inicial**
  * **Descrição:** O sistema deve permitir que o usuário informe uma data inicial para a pesquisa de notícias.

* **RF04 — Filtrar pesquisa por data final**
  * **Descrição:** O sistema deve permitir que o usuário informe uma data final para a pesquisa de notícias.

* **RF05 — Ordenar resultados**
  * **Descrição:** O sistema deve permitir que o usuário selecione a ordenação dos resultados entre as mais recentes, as mais antigas e pela relevância.

* **RF06 — Exibir resultados da pesquisa**
  * **Descrição:** O sistema deve apresentar ao usuário as notícias retornadas pela pesquisa.

* **RF07 — Exibir informações das notícias**
  * **Descrição:** Para cada notícia retornada, o sistema deve apresentar informações como título, resumo, data de publicação e imagem (quando disponível).

* **RF08 — Acessar notícia original**
  * **Descrição:** O sistema deve permitir que o usuário acesse a notícia original disponibilizada pelo The New York Times.

* **RF09 — Informar ausência de resultados**
  * **Descrição:** O sistema deve informar ao usuário quando nenhuma notícia for encontrada para os critérios de pesquisa utilizados.

## 1.2. Requisitos Não Funcionais

Os requisitos não funcionais (RNF) definem os critérios que podem ser usados para julgar a operação de um sistema, em vez de seus comportamentos específicos.

* **RNF01 — Interface web**
  * **Descrição:** O sistema deve disponibilizar suas funcionalidades por meio de uma interface web.

* **RNF02 — Integração com serviço externo**
  * **Descrição:** O sistema deve realizar integração com a API do The New York Times para obtenção dos dados das notícias.

* **RNF03 — Arquitetura em camadas**
  * **Descrição:** O back-end deve organizar suas responsabilidades em camadas distintas, incluindo rotas, controladores, serviços e validação.

* **RNF04 — Configuração por variáveis de ambiente**
  * **Descrição:** Informações de configuração e credenciais da API devem ser obtidas por meio de variáveis de ambiente.

* **RNF05 — Containerização**
  * **Descrição:** A aplicação deve poder ser executada em ambiente containerizado utilizando Docker.

* **RNF06 — Tratamento de erros**
  * **Descrição:** O sistema deve tratar erros decorrentes das requisições realizadas à API externa e retornar respostas HTTP adequadas.