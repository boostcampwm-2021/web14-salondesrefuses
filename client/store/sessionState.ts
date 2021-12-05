import { selector, useRecoilValueLoadable } from 'recoil';
import { getUser, onResponseSuccess } from 'service/networking';

const sessionSelector = selector({
    key: '@session/get',
    get: async ({ get }) => {
        try {
            const response = await getUser();
            if (!onResponseSuccess(response.status)) return undefined;
            return response.data;
        } catch (err) {
            console.log(err);
        }
    },
});

const useSessionState = () => useRecoilValueLoadable(sessionSelector);

export default useSessionState;
