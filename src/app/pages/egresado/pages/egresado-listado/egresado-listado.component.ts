import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table'; // Importa MatTableDataSource
import { Egresado } from '@app/models/backend/egresado';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; // Importa MatPaginator

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
  dataSource = new MatTableDataSource<Egresado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginator

  private currentPage: number = 0;
  public elementosPorPagina: number = 5;
  totalItems: number = 0; // Define la propiedad totalItems

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.fetchEgresados();
    this.loading$ = this.store.pipe(select(fromList.getLoading));

    this.store.pipe(select(fromList.getCarreras)).subscribe((egresados) => {
      this.dataSource.data = egresados ?? [];
      this.dataSource.paginator = this.paginator; // Vincular paginator al dataSource
    });
  }

  fetchEgresados(): void {
    this.store.dispatch(
      new fromList.Read(this.currentPage, this.elementosPorPagina)
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // Actualiza la página actual
    this.elementosPorPagina = event.pageSize; // Actualiza los elementos por página

    console.log(
      `Página: ${this.currentPage}, Elementos por página: ${this.elementosPorPagina}`
    );

    // Llama a la función que vuelve a hacer la petición con los nuevos valores
    this.fetchEgresados();
  }
}
