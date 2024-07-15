import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../services/switch.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-block-three',
  standalone: true,
  templateUrl: './block-three.component.html',
  styleUrls: ['./block-three.component.scss'],
  imports: [FormsModule],
})
export class BlockThreeComponent implements OnInit {
  text: { id: any; text: any }[] = [];
  newText: string = '';

  constructor(private switchService: SwitchService) {
    this.switchService.getReplaceTextObs().subscribe((textData: any) => {
      if (this.text.length > 0) {
        this.text.pop();
        this.text.push(textData.text);
        this.loadTextItems();
      }
    });

    this.switchService.getAddTextObs().subscribe((textData: any) => {
      if (textData.text !== undefined) {
        this.text.push(textData.text);
        this.loadTextItems();
      }
    });
  }

  ngOnInit(): void {
    this.loadTextItems();
  }

  sortText() {
    this.text.sort((a, b) => {
      let textA =
        typeof a.text === 'string'
          ? a.text.toUpperCase()
          : a.text.text.toUpperCase();
      let textB =
        typeof b.text === 'string'
          ? b.text.toUpperCase()
          : b.text.text.toUpperCase();
      return textA.localeCompare(textB);
    });
  }

  loadTextItems() {
    this.text = this.switchService.getTextItems();
    this.sortText();
  }

  addText(text: string) {
    if (this.newText !== '') {
      this.switchService.addItem(text);
      this.loadTextItems();
      this.newText = '';
    }
  }

  editText(item: any) {
    const newText = prompt('Wpisz nowy tekst:');
    if (newText !== null && newText.trim() !== '') {
      this.switchService.updateItemWithNewId(item.id, newText);
      this.loadTextItems();
    }
  }

  deleteText(item: any) {
    console.log(item);
    this.switchService.deleteItem(item.id);
    this.loadTextItems();
  }
}
