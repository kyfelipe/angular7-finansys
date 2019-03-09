import { Injectable, Injector } from '@angular/core';
import { Observable } from "rxjs";
import { flatMap, catchError } from "rxjs/operators";

import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  	providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

	constructor(
		protected injector: Injector,
		private categoryService: CategoryService
	) {
		super('api/entries', injector, Entry.fromJSON);
	}

	public create(entry: Entry): Observable<Entry> {
		return this.setCategoryAndSendToServer(entry, super.create.bind(this));
	}

	public update(entry: Entry): Observable<Entry> {
		return this.setCategoryAndSendToServer(entry, super.update.bind(this));
	}

	private setCategoryAndSendToServer(entry: Entry, sendFN: any): Observable<Entry> {
		return this.categoryService.getById(entry.categoryId).pipe(
			flatMap((category) => {
				entry.category = category;
				return sendFN(entry);
			}),
			catchError(this.handleError)
		);
	}
}