#!/bin/bash

echo 'test'

npm install
npm run deploy

mv ./build/contracts/SalonDesRefuse.json ../client/public/etherium/abi.json
mv ./build/address/SalonDesRefusesAddress.json ../client/public/etherium/address.json
