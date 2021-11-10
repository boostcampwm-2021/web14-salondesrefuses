import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
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
import { ExhibitionDTO } from '../dto/exhibitionDTO';
import { ApiConsumes, ApiOperation, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    getExhibitionsSortedByDeadlineApiOperation,
    getExhibitionsSortedByInterestApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionsAPiOperation,
} from '../swagger';
import { User } from 'src/user/user.entity';
import { HoldExhibitionDTO } from '../dto/exhibitionDTOs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomAuthGuard } from 'src/auth/guard/CustomAuthGuard';

@Controller('/exhibitions')
@ApiTags('전시회 컨트롤러')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

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
    @UseInterceptors(FileInterceptor('thumnail'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: '전시회 등록 api' })
    holdExhibition(
        @UploadedFile() image: Express.Multer.File,
        @Body() holdExhibitionDTO: HoldExhibitionDTO,
        @Req() { user }: Request & { user: User },
    ) {
        return this.exhibitionService.holdExhibition(image, holdExhibitionDTO, user);
    }
}
