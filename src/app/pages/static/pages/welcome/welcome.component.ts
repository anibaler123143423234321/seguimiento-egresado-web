import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('scroller') scroller!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  scroll(direction: number) {
    const scrollAmount = this.scroller.nativeElement.clientWidth * direction;
    const totalCards = this.scroller.nativeElement.children.length;

    // Obtener el índice actual basado en la posición de desplazamiento
    const currentScrollPosition = this.scroller.nativeElement.scrollLeft;
    const cardWidth = this.scroller.nativeElement.clientWidth;
    const currentIndex = Math.round(currentScrollPosition / cardWidth);

    // Calcular el nuevo índice
    let newIndex = currentIndex + direction;

    // Hacer que el deslizador sea circular
    if (newIndex < 0) {
      newIndex = totalCards - 1; // Si está en el primer elemento, ir al último
    } else if (newIndex >= totalCards) {
      newIndex = 0; // Si está en el último elemento, ir al primero
    }

    // Mover el scroll al nuevo índice
    this.scroller.nativeElement.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    });
  }
}
