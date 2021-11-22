import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import ABI from '@public/ethereum/abi.json';
import contractAddress from '@public/ethereum/address.json';

let account: string | null;

const BoughtArtworkPage = () => {
    const [contract, setContract] = useState<Contract>();
    const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_HOST!));

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            account = accounts[0];
        });
        setContract(new web3.eth.Contract(ABI.abi as AbiItem[], contractAddress.address));
    }, []);

    useEffect(() => {
        if (!contract) return;
        (async () => {
            await window.ethereum.enable();
            [account] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const balanceOf = await contract.methods.balanceOf(account!).call();

            const myNFTs = await Promise.all(
                Array.from({ length: balanceOf }).map((_, idx) => {
                    return contract.methods.tokenOfOwnerByIndex(account!, idx).call();
                }),
            );
            console.log(myNFTs);
        })();
    }, [contract]);

    return <div></div>;
};

const ETHEREUM_HOST = process.env.ETHEREUM_HOST;

export default BoughtArtworkPage;
