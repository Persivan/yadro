import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationComponent} from "../components/notification/notification.component";
import {ConfirmDialogComponent} from "../components/dialog/confirm-dialog.component";


export enum NotificationTypes {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) {
  }

  notify(text: string, type: NotificationTypes) {
    return this.dialog.open(
      NotificationComponent, {
        width: '250px',
        data: {
          text: text,
          type: type,
          title: 'Оповещение'
        }
      })
  }


  confirm(text: string, cancelTxt: string, acceptTxt: string): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: text,
        closeText: cancelTxt,
        successText: acceptTxt,
      },
    })
  }

}
