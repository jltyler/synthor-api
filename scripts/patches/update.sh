#!/bin/bash

API="http://localhost:4741"
URL_PATH="/patches"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "patch": {
      "name": "LOLOLO2",
      "osc1Volume": 0.2
    }
  }'

echo
