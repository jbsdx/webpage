#!/bin/bash

# download openapi spec file
curl http://localhost:3000/openapi.json > api.spec.yaml

# generate angular api sdk
node_modules/.bin/openapi-generator generate --skip-validate-spec -i api.spec.yaml -g typescript-angular -o client/src/sdk

