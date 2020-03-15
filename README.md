# Webpage

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Stack: Traefik reverse-proxy + letsencrypt, Loopback V4 Backend, Angular V9 Frontend

## Development

Build and start Loopback backend server

```shell
$ npm run rebuild:api
```

Create OpenApi spec file

```shell
$ npm run create:spec
```

Manually create backend SDK files for the Angular client

```shell
$ npm run create:sdk
```

Install the client and start angular development server

```shell
$ cd client
$ npm install
$ ng serve -o
```

## Docker

Use docker-compose to deploy the stack

Reverse proxy will be listening on Port 80

```
docker-compose build && docker-compose up
```
