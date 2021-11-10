import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async getCategoriesWithCategoryIds(categoryIds: number[]): Promise<Category[]> {
        return this.categoryRepository.findByIds(categoryIds);
    }

    async createCategory(name: string): Promise<Category> {
        const category = this.categoryRepository.create({
            name: name,
        });
        return this.categoryRepository.save(category);
    }
}
