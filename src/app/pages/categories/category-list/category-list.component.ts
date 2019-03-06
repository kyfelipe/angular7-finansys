import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Category[] = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getAll().subscribe(
            (categories) => this.categories = categories,
            (error) => console.log('Error ao carregar a lista de categorias', error)
        );
    }

    public deleteCategory(category) {
        const mustDelete = confirm('Deseja realmente deletar essa categoria?');
        
        if(mustDelete) {
            this.categoryService.delete(category.id).subscribe(
                () => this.categories = this.categories.filter((element) => element !== category),
                (error) => console.log('Error ao tentar excluir a categoria: ', error)
            );
        }
    }
}
