
## Descrição

O indexer-tree é uma aplicação em nodejs para o mapeamento de diretórios e arquivos, onde o objetivo é salvar os endereços no mongoDB para diminuir o tempo de procura e navegação em diretórios. 

## Justificativa

A ideia por traz do projeto é simplificar a vida de pequenas empresas/projetos que necessitam de um controle sobre seus arquivos, logo a maneira mais eficaz é a indexação dos arquivos e controle através de uma interface onde não há latencia da navegação entre os diretórios mas somente o tempo de busca no mongoDB.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn dev

# production mode
$ yarn prod
```

## Planejamento

O projeto é open source e contamos com a ajuda da comunidade para crescer com o projeto. Hoje temos as seguintes ideias:

- Melhorar log de eventos da aplicação;
- Maior controle da aplicação através de mais variáveis de ambientes disponíveis;
- Criar interface Web para busca dos arquivos e download;
- Criar imagens docker separadas com e sem a interface web;
- Salvar a tipagem de arquivos para mais opções de busca;

## Questionamentos

O projeto ainda é novo e não sabemos onde poderemos chegar mas já temos um questionamento há respeito do futuro do projeto. Teremos suporte somente para o MongoDb ? Está é uma pergunta que ainda não sabemos responder, depende muito do crescimento do projeto e da necessidade da comunidade;

## Stay in touch

- Authors - [Marcos Paulo](https://github.com/MarcosPaulo775) and [Leonardo Farias](https://github.com/leofdss)

## License

Indexer Tree is [MIT licensed](LICENSE).
