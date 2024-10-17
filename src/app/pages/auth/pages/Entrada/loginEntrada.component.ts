import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store } from '@ngrx/store';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginEntrada',
  templateUrl: './loginEntrada.component.html',
  styleUrls: ['./loginEntrada.component.scss'],
  animations: [],
})
export class LoginEntradaComponent implements OnInit {
  loading$!: Observable<boolean | null>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  ngOnInit(): void {}

  navigateToDocente() {
    this.router.navigate(['auth/login']);
  }

  navigateToEstudiante() {
    this.router.navigate(['auth/loginEstudiante']);
  }
}
