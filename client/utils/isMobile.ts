import { UAParser } from 'ua-parser-js';

enum MoibleDeviceType {
    Mobile = 'mobile',
    Tablet = 'tablet',
}

const parser = new UAParser();

export const isMobile = () =>
    Object.values(MoibleDeviceType).includes(
        parser.getDevice().type as MoibleDeviceType,
    );
