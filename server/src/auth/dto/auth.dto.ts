import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @ApiProperty()
    code: string;

    @IsNotEmpty()
    @ApiProperty()
    strategy: string;
}