import DeviceSwitch from '@components/common/DeviceSwitch';
import Mobile from '@components/Home/Mobile';
import Pc from '@components/Home/Pc';
import type { NextPage } from 'next';

const Home: NextPage = (props) => {
    return <DeviceSwitch Pc={Pc} Mobile={Mobile} props={props} />;
};

export default Home;
