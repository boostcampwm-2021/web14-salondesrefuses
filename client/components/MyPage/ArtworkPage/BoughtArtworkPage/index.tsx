import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import ABI from '@public/ethereum/abi.json';
import contractAddress from '@public/ethereum/address.json';
import { getAllBoughtArtworks } from 'service/networking';
import { AuctionCardProps } from '@const/card-type';
import Card from '@components/common/Card';

let account: string | null;

const BoughtArtworkPage = () => {
    const [contract, setContract] = useState<Contract>();
    const [boughtArtworks, setBoughtArtworks] = useState<AuctionCardProps[]>([]);
    const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_HOST!));

    const getArtworks = async () => {
        if (!contract) return;
        await window.ethereum.enable();
        [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        const balanceOf = await contract.methods.balanceOf(account!).call();

        const myNFTs = await Promise.all(
            Array.from({ length: balanceOf }).map(async (_, idx) => {
                const token = await contract.methods.tokenOfOwnerByIndex(account!, idx).call();
                return +token;
            }),
        );
        const result = await getAllBoughtArtworks(myNFTs);
        return result;
    };

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            account = accounts[0];
        });
        setContract(new web3.eth.Contract(ABI.abi as AbiItem[], contractAddress.address));
    }, []);

    useEffect(() => {
        if (!contract) return;
        (async () => {
            const result = await getArtworks();
            setBoughtArtworks(result);
        })();
    }, [contract]);

    return (
        <Container>
            {boughtArtworks &&
                boughtArtworks.map((item) => {
                    item.thumbnailImage = (item as any).croppedImage;
                    return <Card width="md" content={item} key={item.id} />;
                })}
        </Container>
    );
};

const ETHEREUM_HOST = process.env.ETHEREUM_HOST;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
`;

export default BoughtArtworkPage;
