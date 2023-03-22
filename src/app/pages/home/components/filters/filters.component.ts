import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: `filters.component.html`,
  styles: [
  ]
})
export class FiltersComponent implements OnInit {
  
  @Output() showCategory = new EventEmitter<string>();

  categories = ['Shoes', 'Sports']
  constructor() { }

  ngOnInit(): void {
  }

  onShowCategory(category: string): void {
     this.showCategory.emit(category);
  }
}
