#!/bin/bash

echo "saving file $1"
# download openapi spec file

curl http://localhost:3000/openapi.json > $2

# generate angular api sdk
rm -rf $1

node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator generate \
 --skip-validate-spec \
 -i $2 \
 -g typescript-angular \
 -o $1

