#!/bin/bash

API="http://localhost:4741"
URL_PATH="/patches"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "patch": {
      "name": "new test patch"
    }
  }'

echo
