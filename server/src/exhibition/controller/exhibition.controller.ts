import {
    Body,
    Controller,
    Get, Param,
    ParseIntPipe, Patch,
    Post,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ExhibitionService } from '../service/exhibition.service';
import { ExhibitionDTO, HoldExhibitionDTO, UpdateExhibitionDTO } from '../dto/exhibitionDTO';
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
    getNewestExhibitionApiOperation,
    getRandomExhibitionsAPiOperation,
    getSpecificExhibitionApiOperation,
    holdExhibitionApiBody,
    updateExhibitionApiOperation,
} from '../swagger';
import { User } from 'src/user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomAuthGuard } from 'src/auth/guard/CustomAuthGuard';
import { UpdateResult } from 'typeorm';

@Controller('/exhibitions')
@ApiTags('전시회 컨트롤러')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/:exhibitionId')
    @ApiOperation(getSpecificExhibitionApiOperation)
    @ApiParam({ name: 'exhibitionId', type: Number })
    @ApiResponse({ type: HoldExhibitionDTO })
    getSpecificExhibition(@Param('exhibitionId', ParseIntPipe) id: number): Promise<HoldExhibitionDTO> {
        return this.exhibitionService.getSpecificExhibition(id);
    }

    @Get('/random')
    @ApiOperation(getRandomExhibitionsAPiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiProperty({})
    getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @ApiOperation(getNewestExhibitionApiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiQuery({ name: 'page', type: Number })
    getNewestExhibitions(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @ApiOperation(getExhibitionsSortedByDeadlineApiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiQuery({ name: 'page', type: Number })
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @ApiOperation(getExhibitionsSortedByInterestApiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiQuery({ name: 'page', type: Number })
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
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
    ): Promise<HoldExhibitionDTO> {
        return this.exhibitionService.holdExhibition(image, holdExhibitionDTO, user);
    }

    @Patch('/update')
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @ApiOperation(updateExhibitionApiOperation)
    updateExhibition(@Body() updateExhibitionDTO: UpdateExhibitionDTO): Promise<UpdateResult> {
        return this.exhibitionService.updateExhibition(updateExhibitionDTO);
    }

}
