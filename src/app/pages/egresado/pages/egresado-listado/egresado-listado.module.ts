import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgresadoListadoRoutingModule } from './egresado-listado-routing.module';
import { EgresadoListadoComponent } from './egresado-listado.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from '@app/shared/indicators';
import { EntityPhotoModule } from '@app/shared/layouts';
import { PopupsModule } from '@app/shared/popups';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [EgresadoListadoComponent],
  imports: [
    CommonModule,
    EgresadoListadoRoutingModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    SpinnerModule,
    EntityPhotoModule,
    PopupsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class EgresadoListadoModule {}
