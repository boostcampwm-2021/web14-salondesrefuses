import React from 'react';
import { isMobile } from '../../utils/isMobile';
interface Props {
    Pc: () => JSX.Element;
    Mobile: () => JSX.Element;
    props?: {} | undefined;
}
const DeviceSwitch = ({ Pc, Mobile, props = {} }: Props) =>
    isMobile() ? <Mobile {...props} /> : <Pc {...props} />;

export default DeviceSwitch;
