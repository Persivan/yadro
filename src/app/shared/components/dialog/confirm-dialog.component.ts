import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogInterface} from "../../types/confirmDialog.interface";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  standalone: true,
  imports: [MatDialogModule, MatButton]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInterface
  ) {}
  closeDialog(result: boolean | null): void {
    this.dialogRef.close(result);
  }
}
