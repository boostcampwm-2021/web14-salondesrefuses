import { Module } from '@nestjs/common';
import { PortController } from './port.controller';

@Module({
    controllers: [ PortController ]
})
export class PortModule {}
