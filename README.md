# The New York Times API

Projeto desenvolvido para a avaliação da segunda e terceira sprints do programa de bolsas Compass UOL para formação em machine learning para AWS.

O objetivo do projeto desenvolvido é criar um sistema em Nodejs que possibilite consumir uma API pública externa e realizar o deploy na AWS dentro de um container docker.

A API escolhida foi a do The New York Times, onde o sistema realiza buscas em notícias populares da semana e a possibilidade de fazer pesquisar utilizando filtros.

![interface](https://live.staticflickr.com/65535/53930648062_34e371f9c7_h.jpg)

## Índice

1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Funcionalidades do Sistema](#funcionalidades-do-sistema)
3. [Desenvolvimento do Projeto](#desenvolvimento-do-projeto)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Dificuldades Conhecidas](#dificuldades-conhecidas)
6. [Instalação e Execução](#instalação-e-execução)
7. [Deploy](#deploy)
8. [Equipe](#equipe)



## Tecnologias utilizadas

| Stack   | Tecnologias    | 
| :---------- | :--------- |
| Back-end   |  `Nodejs`, `JavaScript`, `Express.js`   |
| Front-end   |  `html`, `css`, `JavaScript`, `Bootstrap`   | 
| Infra e DevOps |  `AWS` , `Docker`    | 

## Funcionalidades do Sistema

1. A tela principal da aplicação trás de forma dinâmica as últimas notícias mais importantes da semana na seção *News of the week*.
![interface](https://live.staticflickr.com/65535/53932267774_4fa45362c2_h.jpg)

2. Acima da seção *News of the week*, temos a seção de pesquisa com filtragem, onde é possível filtrar por data, ordernar ou simplesmente pesquisar sem uso do filtro.
![interface](https://live.staticflickr.com/65535/53932382770_fd533b8406_h.jpg)


## Desenvolvimento do Projeto
### Organização da equipe
A equipe se organizou utilizando a ferramenta `Trello` com o metodogia ágil `SCRUM`. Era feito uma reunião onde era criada as tasks e dividido de forma dinamica onde cada membro escolhia sua task. Após a conclusão da task, o membro subia para o GitHub utilizando `Commit semàntico` para fins de organziação

[Link para o quadro da equipe no Trello](https://trello.com/invite/b/66a8dac8d51e1e89f636352d/ATTIe40537a430a2fbf44538e3dae1622ad0C46474B5/compass-pb-aws-2024-julho-a-sprints-2-3-pb-aws-julho-a)

### Desenvolvimento da camada Back-end
O Back-end foi desenvolvido baseado na `Layered Architecture` ou Arquitetura em Camadas, para manter uma organização clara e separar as responsabilidades. Abaixo os papéis das camadas:

- Controller: responsável por lidar com requisição **HTTP**.
- Service: responsável pela **regra de negócio**, fazer a consulta e repassar para o controller.
- Validate: responsável por validar os **dados de entrada** no service.
- CustomErro: Criação de **erros dinâmicos** para lidar com respostas HTTP.
- Routes: responsável por fazer o controle das **rotas de acesso**.
- server.js: Arquivo responsável por **concentrar**, **comunicar** e **executar** aplicação.

[Link para CustomError](https://javascript.info/custom-errors)

### Desenvolvimento da camada Front-end
O desenvolvimento da camada de Front-end foi baseado em uma Arquitetura simples em `Vanilla`. O Front é dividido basicamente me 3 partes principais: **index.html**, **css** e **js**.

- index.html: responsável por **gerar a página inicial** da aplicação com `Boostrap`.
- js: pasta responsável por reunir:
    - articlePopular: pasta responsável por enviar requisição para API local e enviar para os cards dados das noticias populares.
    - articleSearch: também faz uma requisição para API local e enviar para os cards dados dos artigos.
    - config: pasta responsável por **concentrar informações úteis** para ser utilizado no front.
    - main.js: arquivo responsável por **iniciar envio da requisição** para gerar os cards com as noticias da semana.
- css: Responsável pela **estilziação da página**.
- assets: contém todo os **arquivos estáticos** da aplicação.

### Arquivos de configuração
Para manter um projeto padronizado e que todos mantessem o padrão, foi utilizado o `eslint` configurado com `prettier`. E a utilziação de `Dockerfile` e `docker-compose` para containizar a aplicação. Além disso, criamos uma pasta `.vscode` para que todos os membros tivessem indicação de extensões para o desenvolvimento do projeto.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SERVER_PORT`=8080

`SERVER_HOSTNAME`=0.0.0.0

`WEB_HOSTNAME`=seu-ip-publico

`NYT_API_KEY`=sua-chave-do-the-new-york-times 

`BASE_API_SEARCH`=https://api.nytimes.com/svc/search/v2/articlesearch.json


## Dificuldades Conhecidas

- Dificuldade em manter as contribuições de forma organizada sem que criasse conflitos no GitHub.
- Falta de conhecimento prático com determinadas tecnologias, como Docker e AWS.
- Dificuldade em manter aulas de estágio em paralelo com desenvolvimento do projeto.
## Instalação e Execução

- [Configuração da instância EC2](#configuração-da-instância-ec2)
- [Configuração do projeto](#configuração-do-projeto)
- [Configuração do Docker](#configuração-do-docker)
- [Acessando a aplicação](#acessando-a-aplicação)

### Configuração da instância EC2

1. Instalar Node.js e NPM usando nvm

   ```bash
   sudo su -
   ```

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
   ```

   ```bash
   . ~/.nvm/nvm.sh
   ```

   ```bash
   nvm install node
   ```

   ```bash
   node -v
   npm -v
   ```

2. Instalação do Git e Docker

   ```bash
   sudo yum update -y
   ```

   ```bash
   sudo yum install git -y
   ```

   ```bash
   sudo yum install docker -y
   ```

   ```bash
   sudo usermod -aG docker ec2-user
   ```

   ```bash
   sudo service docker start
   ```

   ```bash
   docker info
   ```

   ```bash
   git --version
   docker --version
   ```

### Configuração do projeto

1. Abra o terminal.
2. Escolha o diretório onde deseja clonar o repositório.
3. Clone o repositório:

   ```bash
   git clone https://github.com/Compass-pb-aws-2024-JULHO-A/sprints-2-3-pb-aws-julho-a.git
   ```

4. Acesse a pasta que foi clonada:

   ```bash
   cd sprints-2-3-pb-aws-julho-a
   ```

5. Antes de manipular a branch, faça o login:

   ```bash
   # username: seu-user-name
   # password: chave-token
   ```

6. Puxe as branches remotas:

   ```bash
   git fetch --all
   ```

7. Visualize as branches remotas:

   ```bash
   git branch -r
   ```

8. Acesse a branch da equipe:

   ```bash
   git checkout grupo-5
   ```

9. Instale as dependências:

   ```bash
   npm install
   ```

10. Crie um arquivo `.env` na raiz:

    ```bash
    touch .env
    ```

11. Edite o arquivo `.env` com suas credenciais:

    ```bash
    nano .env
    ```

    Cole o exemplo de `.env.example` e preencha com suas credenciais. 

12. Salve as alterações no `nano`:

    ```bash
    ctrl + o
    enter
    ctrl + x
    ```

13. Faça o mesmo processo no arquivo `config/index.js`:

    ```javascript
    export const config = {
        WEB_HOSTNAME: 'seu-ip-publico-aqui',
        SERVER_PORT: '8080',
    };
    ```

### Configuração do Docker

14. Execute o Docker Compose:

    ```bash
    docker-compose up --build
    ```

### Acessando a aplicação

15. Acessando através do Docker:

    ```bash
    http://seu-ip-publico-aqui:8080/
    ```

16. Acessando localmente:

    ```bash
    npm run dev
    ```

    Acesse:

    ```bash
    http://localhost:8080/
    ```


## Deploy

[Link para acessar deploy da aplicação](http://18.207.104.70:8080/)

## Equipe
<table align="center">
  <tr align="center">
    <td>
      <a href="https://github.com/RubensLFerreira">
        <img src="https://avatars.githubusercontent.com/RubensLFerreira" width=100 />
        <p>Rubens <br/>Lima</p>
      </a>
    </td>
    <td>
      <a href="https://github.com/Caiqueferlima">
        <img src="https://avatars.githubusercontent.com/u/130234796?v=4" width=100 />
        <p>Caíque <br/>Fernandes</p>
      </a>
    </td>
    <td>
      <a href="https://github.com/devrodrigocsoares">
        <img src="https://avatars.githubusercontent.com/u/63052661?v=4" width=100 />
        <p>Rodrigo <br/>Cadeira</p>
      </a>
    </td>
      <td>
      <a href="https://github.com/Ivo-Aragao">
        <img src="https://avatars.githubusercontent.com/u/105293872?v=4" width=100 />
        <p>Ivo <br/>Aragão</p>
      </a>
    </td>
  </tr>
