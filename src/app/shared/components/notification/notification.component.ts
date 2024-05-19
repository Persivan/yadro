import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {NotificationInterface} from "../../types/notifyCard.interface";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NotificationTypes} from "../../services/dialog.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatIconButton, MatDialogClose, NgIf]
})
export class NotificationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: NotificationInterface) {
  }

  protected readonly NotificationTypes = NotificationTypes;
}
