#!/bin/bash

CURRENT_PATH=`pwd -P`
NFT_PATH=${CURRENT_PATH%/*}

echo '> nft 빌드'

if [ ! -d $NFT_PATH/nft/build ]; then
    truffle migrate --reset
fi

if [ ! -d $NFT_PATH/server/src/cronTask/ethereum ]; then
    mkdir $NFT_PATH/server/src/cronTask/ethereum
fi

if [ ! -d $NFT_PATH/client/public/ethereum ]; then
    mkdir $NFT_PATH/client/public/ethereum
fi

cp $NFT_PATH/nft/build/address/SalonDesRefusesAddress.json $NFT_PATH/server/src/cronTask/ethereum/address.json
cp $NFT_PATH/nft/build/address/SalonDesRefusesAddress.json $NFT_PATH/client/public/ethereum/address.json

cp $NFT_PATH/nft/build/contracts/SalonDesRefuse.json $NFT_PATH/server/src/cronTask/ethereum/abi.json
cp $NFT_PATH/nft/build/contracts/SalonDesRefuse.json $NFT_PATH/client/public/ethereum/abi.json

echo '> nft 빌드끝'