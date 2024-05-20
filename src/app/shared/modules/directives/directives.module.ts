import { NgModule } from '@angular/core';
import {InputClassDirective} from "./directives/input-class.directive";



@NgModule({
  declarations: [
    InputClassDirective
  ],
  exports: [
    InputClassDirective
  ]
})
export class DirectivesModule { }
