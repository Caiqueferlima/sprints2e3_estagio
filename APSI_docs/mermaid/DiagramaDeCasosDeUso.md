# Diagrama de Casos de Uso

```mermaid
flowchart LR
    Usuario([Usuário])
    NYT[(API do<br/>The New York Times)]

    subgraph Sistema["Sistema de Notícias NYT"]
        UC01([UC01<br/>Visualizar notícias populares])
        UC02([UC02<br/>Pesquisar notícias por termo])
        UC03([UC03<br/>Filtrar por data])
        UC04([UC04<br/>Ordenar resultados])
        UC05([UC05<br/>Exibir resultados])
        UC06([UC06<br/>Exibir informações do artigo])
        UC07([UC07<br/>Acessar artigo original])
        UC08([UC08<br/>Informar ausência de resultados])
        UC09([UC09<br/>Informar erro de integração])
    end

    Usuario --> UC01
    Usuario --> UC02
    Usuario --> UC03
    Usuario --> UC04
    Usuario --> UC07

    UC01 -->|"<<include>>"| UC05
    UC02 -->|"<<include>>"| UC05
    UC05 -->|"<<include>>"| UC06
    UC05 -->|"<<extend>>"| UC08
    UC05 -->|"<<extend>>"| UC09
    UC06 -->|"<<extend>>"| UC07

    UC01 -->|consulta| NYT
    UC02 -->|consulta| NYT

    UC03 -.->|filtro opcional| UC02
    UC04 -.->|ordenação opcional| UC02

    classDef actor fill:#f9f,stroke:#333,stroke-width:2px;
    classDef external fill:#dff0d8,stroke:#333,stroke-width:2px;
    classDef usecase fill:#eef,stroke:#333,stroke-width:1px;

    class Usuario actor;
    class NYT external;
    class UC01,UC02,UC03,UC04,UC05,UC06,UC07,UC08,UC09 usecase;
```
