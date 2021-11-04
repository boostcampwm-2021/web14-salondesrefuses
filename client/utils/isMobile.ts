import { UAParser } from 'ua-parser-js';

enum MobileDeviceType {
    Mobile = 'mobile',
    Tablet = 'tablet',
}

const parser = new UAParser();

export const isMobile = () =>
    Object.values(MobileDeviceType).includes(
        parser.getDevice().type as MobileDeviceType,
    );
