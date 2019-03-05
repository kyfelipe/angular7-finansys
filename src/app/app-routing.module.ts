import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },
    { path: 'entries', loadChildren: './pages/entries/entries.module#EntriesModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }