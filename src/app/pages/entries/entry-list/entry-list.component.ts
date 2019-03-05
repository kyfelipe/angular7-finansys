import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

    entries: Entry[] = [];

    constructor(private entryService: EntryService) { }

    ngOnInit() {
        this.entryService.getAll().subscribe(
            (entries) => this.entries = entries,
            (error) => console.log('Error ao carregar a lista de despesas/receitas', error)
        );
    }

    public deleteEntry(entry) {
        const mustDelete = confirm('Deseja realmente deletar essa despesa/receita?');
        
        if(mustDelete) {
            this.entryService.delete(entry.id).subscribe(
                () => this.entries = this.entries.filter((element) => element !== entry),
                (error) => console.log('Error ao tentar excluir despesa/receita: ', error)
            );
        }
    }
}
