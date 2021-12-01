import { Get, Post, Body, UseGuards } from '@nestjs/common';
import { _CategoryController, GetCategoriesApi, PostCategoriesApi } from './decorator';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CustomAuthGuard } from 'src/auth/guard/CustomAuthGuard';

@_CategoryController()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @GetCategoriesApi()
    getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories();
    }

    @Post()
    @UseGuards(CustomAuthGuard)
    @PostCategoriesApi()
    postCategories(@Body('name') name: string): Promise<Category> {
        return this.categoryService.createCategory(name);
    }
}
