## Indexer Tree

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MarcosPaulo775/indexer-tree-docker)

### Description

Indexer Tree is an application in nodejs for mapping directories and files, where the objective is to save the addresses in mongoDB to reduce the search and browsing time in directories.

## Example with docker-compose:

##### .env

```
APP_PORT=3001
APP_INDEXER_VOLUME=/home
APP_IGNORE_INITIAL=FALSE
APP_MONGO_COLLECTION=files
APP_REMOVE_FILENAME=FALSE

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASS=redis_123
REDIS_VOLUME_PATH=/mnt/redis/indexer-tree-docker

MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DATABASE=indexer-tree
MONGO_USER=mongo_123
MONGO_PASS=mongo_123
MONGO_VOLUME_PATH=/mnt/mongo/indexer-tree-docker
```

##### docker-compose.yml

```
version: '3'

services:
  redis:
    image: redis:alpine
    container_name: redis-indexer-tree
    restart: always
    command: redis-server --requirepass ${REDIS_PASS}
    ports:
      - ${REDIS_PORT}:6379
    volumes:
      - ${REDIS_VOLUME_PATH}:/data
    networks:
      - indexer-tree

  mongo:
    image: mongo
    container_name: mongo-indexer-tree
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS}
    ports:
      - ${MONGO_PORT}:27017
    volumes:
      - ${MONGO_VOLUME_PATH}:/data/db
    networks:
      - indexer-tree

  app-indexer-tree:
    image: marcospaulo775/indexer-tree:v1.0
    restart: always
    ports:
      - ${APP_PORT}:3000
    env_file:
      - ${ENV_FILE}
    volumes:
      - ${APP_INDEXER_VOLUME}:/usr/src/indexer-tree/files
    networks:
      - indexer-tree
    depends_on:
      - redis
      - mongo

networks:
  indexer-tree:
    driver: bridge

```

## Environments variables
##### App

`APP_IGNORE_INITIAL` (default: `true`)

`APP_REMOVE_FILENAME` (default: `true`)

`APP_BULL_QUEUE` (default: `fileIndexer`)

`APP_MONGO_COLLECTION` (default: `files`)

##### Redis

`REDIS_HOST` (Required)

`REDIS_PORT` (Required)

`REDIS_PASS`

`REDIS_VOLUME_PATH`

##### MongoDb

`MONGO_HOST` (Required)

`MONGO_PORT` (Required)

`MONGO_DATABASE` (default: `indexer-tree`)

`MONGO_USER` (Required)

`MONGO_PASS` (Required)

`MONGO_VOLUME_PATH`

`MONGO_AUTH_SOURCE` (default: `admin`)

## Results

##### Directory example:

<img src="https://uploaddeimagens.com.br/images/003/352/565/original/print_directory.png?1627318493" width=800px>

##### File example:

<img src="https://uploaddeimagens.com.br/images/003/352/606/original/print_file.png?1627319156" width=800px>
