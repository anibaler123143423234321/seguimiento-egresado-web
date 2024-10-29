import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserResponse } from '@app/store/user';
import { GeneralService } from '@app/services/general.service';
import { EgresadoResponse } from '@app/pages/egresado/store/save/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  @Input() user!: UserResponse | null;
  @Input() isAuthorized!: boolean | null;
  @Output() signOut = new EventEmitter<void>();
  @Input() egresado!: EgresadoResponse | null;

  constructor(public GeneralService: GeneralService) {}

  ngOnInit(): void {
    /*  this.GeneralService.usuario$ = this.user;
    setTimeout(() => {
      console.log('Usuario:', this.GeneralService.usuario$);
    }, 2000); */
  }

  onMenuToggleDispatch(): void {
    this.menuToggle.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}
