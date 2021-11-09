import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthCredentialDto {
    @IsNotEmpty()
    @ApiProperty()
    code: string;

    @IsNotEmpty()
    @ApiProperty()
    strategy: string;
}