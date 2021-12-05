import { Controller, Get } from '@nestjs/common';

@Controller('port')
export class PortController {

    @Get('')
    getPort(): string {
        return process.env.PORT;
    }
}
