import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { GeneralService } from '@app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-egresado-nuevo',
  templateUrl: './movimiento-egresado-nuevo.component.html',
  styleUrls: ['./movimiento-egresado-nuevo.component.scss'],
})
export class MovimientoEgresadoNuevoComponent implements OnInit {
  loading$!: Observable<boolean | null>;
  years: number[] = [];
  usuarioId!: number; // Variable para almacenar el ID del usuario
  userId: number = 0; // Para manejar el ID del usuario desde la ruta

  constructor(
    private store: Store<fromRoot.State>,
    private generalService: GeneralService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.usuarioId = user.id || null; // Asegúrate de que `id` esté presente
    console.log('ID del Usuario:', this.usuarioId); // Verifica si el valor se está extrayendo correctamente

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
        egresado: { id: this.usuarioId }, // Incluye el ID del egresado aquí
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

      // Opcionalmente, redirigir a otra página después de un registro exitoso
      this.router.navigate(['/']); // Cambia '/ruta-deseada' por la ruta a donde quieras navegar
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
