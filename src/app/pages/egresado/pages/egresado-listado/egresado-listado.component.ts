import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table'; // Importa MatTableDataSource
import { Egresado } from '@app/models/backend/egresado';

@Component({
  selector: 'app-egresado-listado',
  templateUrl: './egresado-listado.component.html',
  styleUrls: ['./egresado-listado.component.scss'],
})
export class EgresadoListadoComponent implements OnInit {
  loading$!: Observable<boolean | null>;

  displayedColumns: string[] = [
    'id',
    'anioEgreso',
    'apellidos',
    'discapacidad',
    'dni',
    'carrera',
    'nombre',
    'sexo',
    'telefono1',
    'telefono2',
    'titulado',
    'email',
    'estado',
    'fechaNacimiento',
    'username',
    'role',
  ];

  egresados$!: Observable<Egresado[] | null>;
  dataSource = new MatTableDataSource<Egresado>(); // Inicializa MatTableDataSource

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    // Despachamos la acción para obtener todos los egresados
    this.store.dispatch(new fromList.Read());

    // Nos suscribimos a los egresados y al loading desde el store
    this.egresados$ = this.store.pipe(select(fromList.getCarreras));
    this.loading$ = this.store.pipe(select(fromList.getLoading));

    // Suscribirse al observable de egresados
    this.egresados$.subscribe((egresados) => {
      // Asigna los datos a dataSource, asegurándote de que nunca sea null
      this.dataSource.data = egresados ?? []; // Si egresados es null, asigna un arreglo vacío
    });
  }
}
