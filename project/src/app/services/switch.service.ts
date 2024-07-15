import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class SwitchService {
  private dataUrl = 'assets/data.json';
  private storageKey = 'textItems';

  text = new BehaviorSubject<string>('');
  textReplace = new BehaviorSubject<string>('');
  textAdded = new BehaviorSubject<string>('');
  selectedOption = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    const storedData = localStorage.getItem(this.storageKey);
    if (!storedData) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  getTextItems(): any[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  updateText(text: string) {
    this.text.next(text);
  }

  replaceText() {
    const currentText = this.text.getValue();
    const items = this.getTextItems();
    if (items.length > 0) {
      items[items.length - 1] = currentText;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.textReplace.next(currentText);
  }

  getReplaceTextObs(): Observable<string> {
    return this.textReplace.asObservable();
  }

  addAnotherText() {
    const currentText = this.text.getValue();
    const items = this.getTextItems();
    const newId = uuidv4();
    items.push({ id: newId, text: currentText });
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.textAdded.next(currentText);
  }

  getAddTextObs(): Observable<string> {
    return this.textAdded.asObservable();
  }

  addItem(text: string) {
    const items = this.getTextItems();
    const newId = uuidv4();
    items.push({ id: newId, text });
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  deleteItem(id: string) {
    let items = this.getTextItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  updateItemWithNewId(oldId: string, newText: string) {
    let items = this.getTextItems();
    items = items.map((item) => {
      if (item.id === oldId) {
        return { id: uuidv4(), text: newText };
      }
      return item;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.textReplace.next(newText);
  }
}
