import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthModule,
  MODULE_ROUTE as AUTH_MODULE_ROUTE,
} from "./modules/auth/auth.module";
import {
  MainModule,
  MODULE_ROUTE as MAIN_MODULE_ROUTE,
} from "./modules/main/main.module";
import {
  OfficeModule,
  MODULE_ROUTE as OFFICE_MODULE_ROUTE,
} from "./modules/office/office.module";

const routes: Routes = [
  {
    path: AUTH_MODULE_ROUTE,
    loadChildren: () => AuthModule
  },
  {
    path: MAIN_MODULE_ROUTE,
    loadChildren: () => MainModule
  },
  {
    path: OFFICE_MODULE_ROUTE,
    loadChildren: () => OfficeModule
  },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
