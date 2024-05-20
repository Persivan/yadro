import {Component, Input} from '@angular/core';
import {SidebarOptionsInterface} from "../../types/sidebarOptions.interface";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() sibebarOptions!: SidebarOptionsInterface[]

  constructor() {
    this.sibebarOptions = [
      {
        route: '/office/profile',
        title: 'Профиль',
        icon: 'account_circle'
      },
      {
        route: '/office/currency',
        title: 'Валюты',
        icon: 'language'
      },
    ]
  }

}
