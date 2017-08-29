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
      "name": "new test patch",
      "osc1Volume": 1.0,
      "osc1Octave": 0,
      "osc1Detune": 0,
      "osc1Waveform": "sawtooth",
      "osc1Unison": 1,
      "osc1Panning": 0,
      "osc1TremoloAmp": 0,
      "osc1TremoloFreq": 0,
      "osc1Attack": 0.1,
      "osc1Decay": 0.1,
      "osc1Sustain": 0.6,
      "osc1Release": 0.4,
      "filterFrequency": 4500,
      "filterQ": 5,
      "filterEnv": 4500,
      "filterTremoloAmp": 0,
      "filterTremoloFreq": 0,
      "filterAttack": 0.2,
      "filterDecay": 0,
      "filterSustain": 1,
      "filterRelease": 0.5
    }
  }'

echo
