import {AfterContentInit, Component, Injector, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { Category } from '../../categories/shared/category.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
    selector: 'app-entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

    public categories: Array<Category>;

    public imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

    public ptBR = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
            'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
            'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        today: 'Hoje',
        clear: 'Limpar'
    };

    constructor(protected entryService: EntryService, protected activatedRoute: ActivatedRoute, protected injector: Injector) {
        super(injector, new Entry(), entryService, Entry.fromJSON);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadCategories();
    }

    get typeOptions(): Array<any> {
        return Object.entries(Entry.types).map(
            ([value, text]) => {
                return {
                    text,
                    value
                };
            });
    }

    protected buildResourceForm() {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null],
            type: ['expense', [Validators.required]],
            amount: [null, [Validators.required]],
            date: [null, [Validators.required]],
            paid: [true, [Validators.required]],
            categoryId: [null, [Validators.required]],
        });
    }

    protected creationPageTitle(): string {
        return `Cadastro de novo Lançamento`;
    }

    protected editionPageTitle(): string {
        return `Editando Lançamento: ${this.resource.name || ''}`;
    }

    protected loadCategories() {
        this.categories = this.activatedRoute.snapshot.data.categories;
    }
}
