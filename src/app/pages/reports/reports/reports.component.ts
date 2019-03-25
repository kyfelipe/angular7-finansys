import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../categories/shared/category.service';
import { EntryService } from '../../entries/shared/entry.service';
import currencyFormatter from 'currency-formatter';
import { Category } from '../../categories/shared/category.model';
import { Entry } from '../../entries/shared/entry.model';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    expenseTotal: any = 0;
    revenueTotal: any = 0;
    balance: any = 0;

    expenseChartData: any;
    revenueChartData: any;

    chartOptions = {
        scales: {
            yAxes: [
                { ticks: { beginAtZero: true } }
            ]
        }
    };

    categories: Category[] = [];
    entries: Entry[] = [];

    @ViewChild('month') month: ElementRef = null;
    @ViewChild('year') year: ElementRef = null;

    public meses: { text: string, value: string }[];

    constructor(private categoryService: CategoryService, private entryService: EntryService) { }

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

        this.categoryService.getAll().subscribe((categories) => this.categories = categories);

    }

    public generateReports() {
        const month = this.month.nativeElement.value;
        const year = this.year.nativeElement.value;

        if (!month || !year) {
            alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios!');
        } else {
            this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
        }
    }

    private setValues(entries: Entry[]) {
        this.entries = entries;
        this.calculateBalance();
        this.setChartData();
    }

    private calculateBalance() {
        let expenseTotal = 0;
        let revenueTotal = 0;

        this.entries.forEach((entry) => {
            if (entry.type === 'revenue') {
                revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
            } else {
                expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' });
            }
        });

        this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
        this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
        this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {code: 'BRL'});
    }

    private setChartData() {
        this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
        this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#E03131');
    }

    private getChartData(entryType: string, title: string, color: string) {
        const chartData = [];
        this.categories.forEach((category) => {
            const filteredEntries = this.entries.filter(
                (entry) => (entry.categoryId === category.id) && (entry.type === entryType)
            );

            if (filteredEntries.length > 0) {
                const totalAmount = filteredEntries.reduce(
                    (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }), 0
                );

                chartData.push({categoryName: category.name, totalAmount});
            }
        });

        return {
            labels: chartData.map(item => item.categoryName),
            datasets: [{
                label: title,
                backgroundColor: color,
                data: chartData.map(item => item.totalAmount)
            }]
        };
    }
}
