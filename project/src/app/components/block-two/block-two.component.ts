import { Component } from '@angular/core';
import { SwitchService } from '../../services/switch.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-two.component.html',
  styleUrl: './block-two.component.scss',
})
export class BlockTwoComponent {
  selectedOption$: Observable<string | null>;

  constructor(private switchService: SwitchService) {
    this.selectedOption$ = this.switchService.selectedOption.asObservable();
  }

  replaceButton() {
    this.switchService.replaceText();
  }
  pasteButton() {
    this.switchService.addAnotherText();
  }
}
