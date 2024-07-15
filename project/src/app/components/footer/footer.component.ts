import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Output() showPersonalDataEvent = new EventEmitter<string>();

  showPersonalData() {
    this.showPersonalDataEvent.emit('Kacper Stańczyk');
  }
}
