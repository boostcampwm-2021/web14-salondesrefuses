import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomAuthGuard } from 'src/auth/guard/CustomAuthGuard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { postCategoriesApiBody } from './swagger';

@Controller('categories')
@ApiTags('카테고리 컨트롤러')
export class CategoryContoller {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: '카테고리 조회 API' })
    @ApiResponse({ type: [Category] })
    getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories();
    }

    @Post()
    @UseGuards(CustomAuthGuard)
    @ApiOperation({ summary: '카테고리 생성 API' })
    @ApiProperty({ type: Category })
    @ApiBody(postCategoriesApiBody)
    postCategories(@Body('name') name: string): Promise<Category> {
        return this.categoryService.createCategory(name);
    }
}
