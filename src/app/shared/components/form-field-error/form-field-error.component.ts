import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-form-field-error',
    template: `
        <p class="text-danger">
            {{errorMessage}}
        </p>
    `,
    styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {
    @Input('form-control') formControl: FormControl;

    constructor() { }

    ngOnInit() { }

    public get errorMessage(): string | null {
        if (this.formControl.invalid && this.formControl.touched) {
            return this.getErrorMessage();
        } else {
            return null;
        }
    }

    private getErrorMessage(): string | null {
        if (this.formControl.errors.required) {
            return 'Dado obrigatório';
        } else if (this.formControl.errors.minlenght) {
            return `Deve ter no mínimo ${this.formControl.errors.minlenght.requiredLenght} caracteres`;
        } else if (this.formControl.errors.maxlenght) {
            return `Deve ter no máximo ${this.formControl.errors.maxlenght.requiredLenght} caracteres`;
        } else if (this.formControl.errors.email) {
            return 'Formato de email inválido';
        } else {
            return null;
        }
    }
}
