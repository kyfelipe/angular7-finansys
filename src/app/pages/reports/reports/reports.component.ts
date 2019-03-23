import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    public meses: { text: string, value: string }[];

    constructor() { }

    ngOnInit() {
        this.meses = [
            {text: 'Selecione um mês', value: ''},
            {text: 'Janeiro', value: '1'},
            {text: 'Fevereiro', value: '2'},
            {text: 'Março', value: '3'},
            {text: 'Abril', value: '4'},
            {text: 'Maio', value: '5'},
            {text: 'Junho', value: '6'},
            {text: 'Julho', value: '7'},
            {text: 'Agosto', value: '8'},
            {text: 'Setembro', value: '9'},
            {text: 'Outubro', value: '10'},
            {text: 'Novembro', value: '11'},
            {text: 'Dezembro', value: '12'}
        ];
    }

}
