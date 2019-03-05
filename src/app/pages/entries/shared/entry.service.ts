import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators"
import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  	providedIn: 'root'
})
export class EntryService {

	private apiPath: string = 'api/entries';

	constructor(private http: HttpClient, private categoryService: CategoryService) { }
	  
	public getAll(): Observable<Entry[]> {
		return this.http.get(this.apiPath).pipe(
			catchError(this.handleError),
			map(this.jsonDataToEntries)
		);
	}

	public getById(id: number): Observable<Entry> {
		const url: string = `${this.apiPath}/${id}`;
		return this.http.get(url).pipe(
			catchError(this.handleError),
			map(this.jsonDataToEntry)
		);
	}

	public create(entry: Entry): Observable<Entry> {
		return this.categoryService.getById(entry.categoryId).pipe(
			flatMap((category) => {
				entry.category = category;
				return this.http.post(this.apiPath, entry).pipe(
					catchError(this.handleError),
					map(this.jsonDataToEntry)
				);
			})
		);
		
		/* 
		return this.http.post(this.apiPath, entry).pipe(
			catchError(this.handleError),
			map(this.jsonDataToEntry)
		);
		*/
	}

	public update(entry: Entry): Observable<Entry> {
		const url: string = `${this.apiPath}/${entry.id}`;

		return this.categoryService.getById(entry.categoryId).pipe(
			flatMap((category) => {
				entry.category = category;
				return this.http.put(url, entry).pipe(
					catchError(this.handleError),
					map(() => entry)
				);
			})
		);
 
		/*
		const url: string = `${this.apiPath}/${entry.id}`;
		return this.http.put(url, entry).pipe(
			catchError(this.handleError),
			map(() => entry)
		);
		*/
	}

	public delete(id: number): Observable<any> {
		const url: string = `${this.apiPath}/${id}`;
		return this.http.delete(url).pipe(
			catchError(this.handleError),
			map(() => null)
		);
	}

	private jsonDataToEntries(jsonData: any[]): Entry[] {
		const entries: Entry[] = [];
		jsonData.forEach(element => entries.push(Object.assign(new Entry(), element)));
		return entries;
	}
	
	private jsonDataToEntry(jsonData: any): Entry {
		return Object.assign(new Entry(), jsonData);
	}

	private handleError(error: any): Observable<any> {
		console.log('Error: ', error);
		return throwError(error);
	}
}
