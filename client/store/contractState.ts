import { atom, useRecoilState } from 'recoil';
import { Contract } from 'web3-eth-contract';

const contractState = atom<Contract | null>({
    key: '@contract',
    default: null,
});

const useContractState = () => useRecoilState(contractState);

export default useContractState;
