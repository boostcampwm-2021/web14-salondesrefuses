import type { NextPage } from 'next';
import DeviceSwitch from '@components/common/DeviceSwitch';
import Mobile from '@components/Home/Mobile';
import Pc from '@components/Home/Pc';
import theme from '@styles/theme';

const Home: NextPage = (props) => {
    return <DeviceSwitch Pc={Pc} Mobile={Mobile} props={props} />;
};

export default Home;
