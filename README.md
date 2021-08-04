<center>

[![docker-starts](https://img.shields.io/docker/stars/marcospaulo775/indexer-tree?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)
[![docker-pulls](https://img.shields.io/docker/pulls/marcospaulo775/indexer-tree?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)
[![docker-version](https://img.shields.io/docker/v/marcospaulo775/indexer-tree/latest?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)
[![docker-size](https://img.shields.io/docker/image-size/marcospaulo775/indexer-tree/latest?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)

</center>

## Descrição

O indexer-tree é uma aplicação em nodejs para o mapeamento de diretórios e arquivos, onde o objetivo é salvar os endereços no mongoDB para diminuir o tempo de procura e navegação em diretórios.

## Justificativa

A ideia por traz do projeto é simplificar a vida de pequenas empresas/projetos que necessitam de um controle sobre seus arquivos, logo a maneira mais eficaz é a indexação dos arquivos e controle através de uma interface onde não há latencia da navegação entre os diretórios mas somente o tempo de busca no mongoDB.

## Instalação

```bash
$ yarn install
```

## Inicializando a aplicação

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

## Mantenha contato

- Autores - [Marcos Paulo](https://github.com/MarcosPaulo775) e [Leonardo Farias](https://github.com/leofdss).

## Licensa

Indexer Tree é [MIT licensed](LICENSE).
