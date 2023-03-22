import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: `products-header.component.html`,
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>()
  itemsShowCount = 12;

  sort = "desc";
  constructor() { }

  ngOnInit(): void {
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onItemsUpdated(count: number): void {
    
    this.itemsShowCount = count;
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }
}