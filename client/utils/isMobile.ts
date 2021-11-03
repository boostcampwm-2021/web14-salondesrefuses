import { UAParser } from 'ua-parser-js';

enum MoilbeDeviceType {
    Mobile = 'mobile',
    Tablet = 'tablet',
}

const parser = new UAParser();

export const isMobile = () =>
    Object.values(MoilbeDeviceType).includes(
        parser.getDevice().type as MoilbeDeviceType,
    );
