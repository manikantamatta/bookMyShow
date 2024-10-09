import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-format',
  templateUrl: './select-format.component.html',
  styleUrls: ['./select-format.component.scss']
})
export class SelectFormatComponent implements OnInit {

  selectedFormat: string | null = null;
  selectedLanguage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<SelectFormatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formats: string[], languages: string[] }
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    this.dialogRef.close({selectedFormat:this.selectedFormat,selectedLanguage:this.selectedLanguage});
  }

  ngOnInit(): void {
  }

}
