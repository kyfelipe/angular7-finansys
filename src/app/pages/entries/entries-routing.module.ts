import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import {EntryFormResolver} from './entry-form/entry-form.resolver';

const routes: Routes = [
    { path: '', component: EntryListComponent },
    { path: 'new', component: EntryFormComponent, resolve: { categories: EntryFormResolver } },
    { path: ':id/edit', component: EntryFormComponent, resolve: { categories: EntryFormResolver } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [EntryFormResolver],
    exports: [RouterModule]
})
export class EntriesRoutingModule { }
