import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(private resourceService: BaseResourceService<T>) { }

    ngOnInit() {
        this.resourceService.getAll().subscribe(
            (resources) => this.resources = resources.sort((a,b) => b.id - a.id),
            (error) => console.log('Error ao carregar a lista de despesas/receitas', error)
        );
    }

    public deleteResource(resource: T) {
        const mustDelete = confirm('Deseja realmente deletar esse item?');
        
        if(mustDelete) {
            this.resourceService.delete(resource.id).subscribe(
                () => this.resources = this.resources.filter((element) => element !== resource),
                (error) => console.log('Error ao tentar excluir despesa/receita: ', error)
            );
        }
    }
}
