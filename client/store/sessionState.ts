import { selector, useRecoilValueLoadable } from 'recoil';
import parseCookie from '@utils/parseCookie';
import { getUser } from 'service/networking';

const sessionSelector = selector({
    key: '@session/get',
    get: async ({ get }) => {
        if (!parseCookie()('refreshToken')) return undefined;
        const result = await getUser();
        return result;
    },
});

const useSessionState = () => useRecoilValueLoadable(sessionSelector);

export default useSessionState;
