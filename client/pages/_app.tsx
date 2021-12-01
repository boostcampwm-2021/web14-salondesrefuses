import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import theme from '@styles/theme';
import { RecoilRoot } from 'recoil';

import Mobile from '@components/Home/Mobile';
import { isMobile } from '@utils/isMobile';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>{isMobile() ? <Mobile /> : <Component {...pageProps} />}</ThemeProvider>
        </RecoilRoot>
    );
}
export default MyApp;
