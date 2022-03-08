<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MarcosPaulo775/indexer-tree-docker/Jest?label=Jest&logo=Jest)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MarcosPaulo775/indexer-tree-docker/Docker%20CI?label=Docker%20CI&logo=docker&logoColor=white)

[![docker-starts](https://img.shields.io/docker/stars/marcospaulo775/indexer-tree?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)
[![docker-pulls](https://img.shields.io/docker/pulls/marcospaulo775/indexer-tree?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)
[![docker-version](https://img.shields.io/docker/v/marcospaulo775/indexer-tree/latest?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)
[![docker-size](https://img.shields.io/docker/image-size/marcospaulo775/indexer-tree/latest?color=light-green)](https://hub.docker.com/r/marcospaulo775/indexer-tree)

</div>

## Description

The indexer-tree is an application in nodejs for mapping directories and files, where the objective is to save the path in mongoDB to decrease the search and browsing time in directories.

## Installation

```bash
$ yarn install
```

## Starting the application

```bash
# node development - edit variables on ./env/node.env
$ yarn start

# node production mode - edit variables on ./env/node.env
$ yarn build
$ yarn start:prod

# docker development - edit variables on ./env/docker.env
$ yarn dev

# docker production mode - edit variables on ./env/docker.env
$ yarn prod
```

## Environments variables

`BULL_QUEUE` (default: `fileIndexer`)

`BULL_MAX` (default: `10`): Max jobs run per second.

`BULL_BOARD` (default: `false`): if true bull-board runing on `/bull-board`.

`INTERVAL` (default: `100`): Interval of file system polling, in milliseconds.

`BINARY_INTERVAL` (default: `300`): Interval of file system
polling for [binary files](https://github.com/sindresorhus/binary-extensions/blob/master/binary-extensions.json).

`MONGO_COLLECTION` (default: `files`)

##### Redis

`REDIS_HOST` (required)

`REDIS_PORT` (required)

`REDIS_PASS`

##### MongoDb

`MONGO_HOST` (required)

`MONGO_PORT` (required)

`MONGO_DATABASE` (default: `indexer-tree`)

`MONGO_USER` (required)

`MONGO_PASS` (required)

`MONGO_AUTH_SOURCE` (default: `admin`)

##### S3 (If want to send for AWS S3)

`S3_REGION` (required)

`S3_ACCESS_KEY_ID` (required)

`S3_SECRET_ACCESS_KEY` (required)

`S3_API_VERSION` (required)

`S3_BUCKET` (required)

`S3_PREFIX_KEY`

## Stay in touch

- Authors - [Marcos Paulo](https://github.com/MarcosPaulo775) and [Leonardo Farias](https://github.com/leofdss).

## License

Indexer Tree is [MIT licensed](LICENSE).
