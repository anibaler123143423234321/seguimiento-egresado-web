import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egresado-nuevo',
  templateUrl: './egresado-nuevo.component.html',
  styleUrls: ['./egresado-nuevo.component.scss'],
})
export class EgresadoNuevoComponent implements OnInit {
  loading$!: Observable<boolean | null>;
  years: number[] = [];
  egresado = {
    titulado: false,
    discapacidad: false,
  };

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

      const egresadoCreateRequest: fromList.EgresadoCreateRequest = {
        dni: form.value.dni,
        nombre: form.value.nombre,
        apellidos: form.value.apellidos,
        sexo: form.value.sexo,
        fechaNacimiento: form.value.fechaNacimiento,
        idCarrera: form.value.idCarrera,
        anioEgreso: form.value.anioEgreso?.toString(),
        telefono1: form.value.telefono1,
        telefono2: form.value.telefono2,
        titulado: form.value.titulado,
        discapacidad: form.value.discapacidad,
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
