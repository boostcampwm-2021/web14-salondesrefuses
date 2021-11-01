import type { NextPage } from 'next';
import { ThemeProvider } from '@emotion/react';
import DeviceSwitch from '@components/common/DeviceSwitch';
import Mobile from '@components/Home/Moblile';
import Pc from '@components/Home/Pc';
import theme from '@styles/theme';

const Home: NextPage = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <DeviceSwitch Pc={Pc} Mobile={Mobile} props={props} />
        </ThemeProvider>
    );
};

export default Home;
