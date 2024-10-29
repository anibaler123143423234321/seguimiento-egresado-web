import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '@app/services/general.service';
import { User } from '@app/models/backend/user/index';
import { Egresado } from '@app/models/backend/egresado/index';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();

  @Input() isAuthorized!: boolean | null;
  @Input() user: User | null = null;
  @Input() egresado!: Egresado | null;

  @Output() signOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  closeMenu(): void {
    this.menuToggle.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }

  isAdmin(): boolean {
    // Verificar si user no es nulo y tiene la propiedad role
    return this.user?.role === 'ADMIN';
  }

  isEgresado(): boolean {
    // Verificar si user no es nulo y tiene la propiedad role
    return this.user?.role === 'EGRESADO';
  }
}
