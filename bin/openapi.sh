#!/bin/bash

echo "param $1"
# download openapi spec file
curl http://localhost:3000/openapi.json > api.spec.json

# generate angular api sdk
rm -rf $1

node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator generate \
 --skip-validate-spec \
 -i api.spec.json \
 -g typescript-angular \
 -o $1

