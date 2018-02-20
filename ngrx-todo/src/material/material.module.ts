import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioGroup,
    MatRadioButton,
    MatRadioModule,
    MatCheckboxModule,
} from '@angular/material';

@NgModule({
    imports: [
      MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatCheckboxModule
      ],
})
// This module contains all the material imports
export class MaterialModule { }
