# Webpage

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Stack: Traefik reverse-proxy + letsencrypt, Loopback V4 Backend, Angular V9 Frontend

## Usage

Create OpenApi spec file to generate the Angular Backend-SDK source files
Loopback server needs to be up and running

```shell
sh bin/openapi.sh
```

## Docker

Use docker-compose to deploy the stack

Reverse proxy will be listening on Port 80

```
docker-compose build && docker-compose up
```
