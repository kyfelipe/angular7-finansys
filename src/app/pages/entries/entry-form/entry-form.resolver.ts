import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Category} from '../../categories/shared/category.model';
import {CategoryService} from '../../categories/shared/category.service';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EntryFormResolver implements Resolve<Observable<Category[]>> {

    constructor(private categoryService: CategoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this.categoryService.getAll();
    }

}
