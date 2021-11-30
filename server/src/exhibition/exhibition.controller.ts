import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionDetailDTO, ExhibitionDto, HoldExhibitionDTO } from './dto/exhibition.dto';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiProperty,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {
    getExhibitionsSortedByDeadlineApiOperation,
    getExhibitionsSortedByInterestApiOperation,
    getExhibtionIdsApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionsAPiOperation,
    getSpecificExhibitionApiOperation,
    holdExhibitionApiBody,
    updateExhibitionApiOperation,
} from './swagger';
import { User } from 'src/user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomAuthGuard } from 'src/auth/guard/CustomAuthGuard';
import { UpdateResult } from 'typeorm';

@Controller('/exhibitions')
@ApiTags('전시회 컨트롤러')
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    @Get('')
    @ApiOperation(getExhibtionIdsApiOperation)
    getExhibitionsIds(): Promise<number[]> {
        return this.exhibitionService.getExhibitionIds();
    }

    @Get('/random')
    @ApiOperation(getRandomExhibitionsAPiOperation)
    @ApiResponse({ type: ExhibitionDto })
    @ApiProperty({})
    getRandomExhibitions(): Promise<ExhibitionDto[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @ApiOperation(getNewestExhibitionApiOperation)
    @ApiResponse({ type: ExhibitionDto })
    @ApiQuery({ name: 'page', type: Number })
    getNewestExhibitions(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDto[]> {
        if (page < 0) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @ApiOperation(getExhibitionsSortedByDeadlineApiOperation)
    @ApiResponse({ type: ExhibitionDto })
    @ApiQuery({ name: 'page', type: Number })
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDto[]> {
        if (page < 0) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @ApiOperation(getExhibitionsSortedByInterestApiOperation)
    @ApiResponse({ type: ExhibitionDto })
    @ApiQuery({ name: 'page', type: Number })
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDto[]> {
        if (page < 0) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }

    @Get('/:exhibitionId')
    @ApiOperation(getSpecificExhibitionApiOperation)
    @ApiParam({ name: 'exhibitionId', type: Number })
    @ApiResponse({ type: ExhibitionDetailDTO })
    getSpecificExhibition(@Param('exhibitionId', ParseIntPipe) id: number): Promise<ExhibitionDetailDTO> {
        return this.exhibitionService.getSpecificExhibition(id);
    }

    @Post('/post')
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: '전시회 등록 api' })
    @ApiBody(holdExhibitionApiBody)
    holdExhibition(
        @UploadedFile() image: Express.Multer.File,
        @Body() holdExhibitionDTO: HoldExhibitionDTO,
        @Req() { user }: Request & { user: User },
    ): Promise<ExhibitionDetailDTO> {
        return this.exhibitionService.holdExhibition(image, holdExhibitionDTO, user);
    }

    @Put('/update')
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @ApiOperation(updateExhibitionApiOperation)
    updateExhibition(
        @UploadedFile() image: Express.Multer.File,
        @Body() updateExhibitionDTO: HoldExhibitionDTO,
    ): Promise<UpdateResult> {
        if (!updateExhibitionDTO.id) {
            throw new BadRequestException('exhibition id is not empty');
        }
        return this.exhibitionService.updateExhibition(image, updateExhibitionDTO);
    }
}
