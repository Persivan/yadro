import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {RouterModule, Routes} from "@angular/router";
import { OfficeComponent } from './office.component';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CurrencyComponent } from './components/currency/currency.component';
import {MatDividerModule} from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

export const MODULE_ROUTE = 'office';

const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {path: 'profile', component: ProfileComponent},
      {path: 'currency', component: CurrencyComponent},
    ]
  },

];

@NgModule({
  declarations: [
    ProfileComponent,
    OfficeComponent,
    SidebarComponent,
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButton,
    MatIcon,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class OfficeModule { }
