import { NgModule } from '@angular/core';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntryFormResolver } from './entry-form/entry-form.resolver';

@NgModule({
    declarations: [
        EntryListComponent,
        EntryFormComponent
    ],
    imports: [
        SharedModule,
        EntriesRoutingModule,
        CalendarModule,
        IMaskModule
    ],
    providers: [EntryFormResolver]
})
export class EntriesModule { }
