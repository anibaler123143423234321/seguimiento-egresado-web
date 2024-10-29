import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'environments/environment';
import { MovimientoEgresadoResponse } from '@src/app/pages/movimiento-egresado/store/save/save.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
@Component({
  selector: 'app-egresado-listado',
  templateUrl: './movimiento-egresado-listado.component.html',
  styleUrls: ['./movimiento-egresado-listado.component.scss'],
})
export class MovimientoEgresadoListadoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombreEgresado',
    'empresa',
    'cargo',
    'fechaInicio',
    'fechaFin',
    'observaciones',
  ];
  dataSource = new MatTableDataSource<MovimientoEgresadoResponse>();
  loading$!: Observable<boolean | null>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.fetchMovimientos(); // Llama a la función para cargar los movimientos
  }

  fetchMovimientos(): void {
    this.httpClient
      .get<MovimientoEgresadoResponse[]>(
        `${environment.url}api/movimientos-egresados/movimientos`
      )
      .subscribe({
        next: (movimientos) => {
          this.dataSource.data = movimientos; // Asigna los movimientos al dataSource
          this.dataSource.paginator = this.paginator; // Asigna el paginador al dataSource
        },
        error: (error) => {
          console.error('Error al cargar los movimientos:', error);
        },
      });
  }
}
