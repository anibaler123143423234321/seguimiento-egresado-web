import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egresado-nuevo',
  templateUrl: './movimiento-egresado-nuevo.component.html',
  styleUrls: ['./movimiento-egresado-nuevo.component.scss'],
})
export class MovimientoEgresadoNuevoComponent implements OnInit {
  loading$!: Observable<boolean | null>;
  years: number[] = [];

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.initializeYears();
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    for (let year = currentYear; year >= startYear; year--) {
      this.years.push(year);
    }
  }

  registrarEgresado(form: NgForm): void {
    if (form.valid) {
      this.loading$ = this.store.pipe(select(fromList.getLoading));

      const egresadoCreateRequest: fromList.MovimientoEgresadoCreateRequest = {
        empresa: form.value.empresa,
        cargo: form.value.cargo,
        fechaInicio: form.value.fechaInicio,
        fechaFin: form.value.fechaFin,
        observaciones: form.value.observaciones,
      };

      // Dispatch action to create a new egresado
      this.store.dispatch(new fromList.Create(egresadoCreateRequest));

      // Show success alert
      Swal.fire({
        title: 'Éxito',
        text: 'El registro fue exitoso!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
