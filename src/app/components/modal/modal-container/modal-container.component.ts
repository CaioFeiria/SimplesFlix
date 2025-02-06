import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  imports: [CommonModule],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
})
export class ModalContainerComponent {
  @Input() visivel: boolean = false;
  @Output() visivelChange = new EventEmitter<boolean>();

  fechar() {
    this.visivel = false;
    this.visivelChange.emit(this.visivel);
  }
}
