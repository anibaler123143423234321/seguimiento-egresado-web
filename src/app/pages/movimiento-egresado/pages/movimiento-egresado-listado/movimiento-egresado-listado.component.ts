import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'environments/environment';
import { MovimientoEgresadoResponse } from '@src/app/pages/movimiento-egresado/store/save/save.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store/user/index';
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

  // Definimos el rol del usuario (puedes obtenerlo del store o localStorage)
  userRole: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRoot.UserState>
  ) {}

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole(): void {
    // Aquí puedes obtener el rol desde el Store o desde el localStorage
    // Si usas NGRX, asegúrate de que el store tenga el rol del usuario guardado

    this.store.select(fromRoot.getUser).subscribe((user) => {
      this.userRole = user?.role || null;
      if (this.userRole) {
        this.fetchMovimientos();
      }
    });
  }

  fetchMovimientos(): void {
    const apiEndpoint =
      this.userRole === 'ADMIN'
        ? `${environment.url}api/movimientos-egresados`
        : `${environment.url}api/movimientos-egresados/movimientos`;

    this.httpClient.get<MovimientoEgresadoResponse[]>(apiEndpoint).subscribe({
      next: (movimientos) => {
        this.dataSource.data = movimientos;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error al cargar los movimientos:', error);
      },
    });
  }
}
