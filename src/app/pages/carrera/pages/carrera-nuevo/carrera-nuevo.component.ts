import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrera-nuevo',
  templateUrl: './carrera-nuevo.component.html',
  styleUrls: ['./carrera-nuevo.component.scss'],
})
export class CarreraNuevoComponent implements OnInit {
  loading$!: Observable<boolean | null>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {}

  registrarCarrera(form: NgForm): void {
    if (form.valid) {
      this.loading$ = this.store.pipe(select(fromList.getLoading));

      const carreraCreateRequest: fromList.CarreraCreateRequest = {
        nombre: form.value.nombre,
      };
      this.store.dispatch(new fromList.Create(carreraCreateRequest));

      // Show success alert
      Swal.fire({
        title: 'Éxito',
        text: 'La carrera fue registrada exitosamente!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
