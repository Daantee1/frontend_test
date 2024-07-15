import { Component } from '@angular/core';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'app-block-one',
  standalone: true,
  imports: [],
  templateUrl: './block-one.component.html',
  styleUrl: './block-one.component.scss',
})
export class BlockOneComponent {
  data: any;
  usedOptionIds: any[] = [];

  constructor(private switchService: SwitchService) {}

  handleButtonRadioClick(value: string) {
    this.switchService.selectedOption.next(value);
    this.switchService.getData().subscribe((response) => {
      let validOptions = response.filter(
        (item: any, index: any) =>
          index !== 0 && index !== 1 && !this.usedOptionIds.includes(item.id)
      );

      switch (value) {
        case 'Opcja pierwsza':
          this.data = response[0];
          this.switchService.updateText(this.data);
          break;
        case 'Opcja druga':
          this.data = response[1];
          this.switchService.updateText(this.data);
          break;
        case 'Opcja losowa':
          if (validOptions.length > 0) {
            let randomIndex = Math.floor(Math.random() * validOptions.length);
            this.data = validOptions[randomIndex];
            this.usedOptionIds.push(this.data.id);
          } else {
            alert('Brak dostępnych opcji losowania');
          }
          this.switchService.updateText(this.data);
          break;
      }
    });
  }
}
