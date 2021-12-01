import { Get, Post, Put, Req, Body, Param, Query, ParseIntPipe, ValidationPipe, BadRequestException, UploadedFile, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomAuthGuard } from 'src/auth/guard/CustomAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionDetailDTO, ExhibitionDto, HoldExhibitionDTO } from './dto/exhibition.dto';
import { User } from 'src/user/user.entity';
import { UpdateResult } from 'typeorm';
import {
    _ExhibitionController,
    GetExhibitionsIdsApi,
    GetExhibitionsSortedByDeadlineApi,
    GetExhibitionsSortedByInterestApi,
    GetNewestExhibitionsApi,
    GetRandomExhibitionsApi,
    GetSpecificExhibitionApi,
    HoldExhibitionApi,
    UpdateExhibitionApi,
} from './decorator';

@_ExhibitionController()
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    @Get()
    @GetExhibitionsIdsApi()
    getExhibitionsIds(): Promise<number[]> {
        return this.exhibitionService.getExhibitionIds();
    }

    @Get('/random')
    @GetRandomExhibitionsApi()
    getRandomExhibitions(): Promise<ExhibitionDto[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @GetNewestExhibitionsApi()
    getNewestExhibitions(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDto[]> {
        if (page < 0) {
            throw new BadRequestException('Page must be greater than or equal to 0');
        }
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @GetExhibitionsSortedByDeadlineApi()
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDto[]> {
        if (page < 0) {
            throw new BadRequestException('Page must be greater than or equal to 0');
        }
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @GetExhibitionsSortedByInterestApi()
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDto[]> {
        if (page < 0) {
            throw new BadRequestException('Page must be greater than or equal to 0');
        }
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }

    @Get('/:exhibitionId')
    @GetSpecificExhibitionApi()
    getSpecificExhibition(@Param('exhibitionId', ParseIntPipe) id: number): Promise<ExhibitionDetailDTO> {
        return this.exhibitionService.getSpecificExhibition(id);
    }

    @Post('/post')
    @UseGuards(CustomAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @HoldExhibitionApi()
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
    @UpdateExhibitionApi()
    updateExhibition(
        @UploadedFile() image: Express.Multer.File,
        @Body() updateExhibitionDTO: HoldExhibitionDTO,
    ): Promise<UpdateResult> {
        if(!updateExhibitionDTO.id) {
            throw new BadRequestException('Exhibition id is empty')
        }
        return this.exhibitionService.updateExhibition(image, updateExhibitionDTO);
    }
}
