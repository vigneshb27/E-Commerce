import { Component, OnInit } from '@angular/core';
import { map, reduce } from 'rxjs';
import {Cart, CartItem} from 'src/app/models/cart.model'
import { CartService } from 'src/app/services/cart.service';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  cart: Cart = { items: [
    {
      product: "https://via.placeholder.com/150",
      name: "snickers",
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: "https://via.placeholder.com/150",
      name: "snickers",
      price: 150,
      quantity: 1,
      id: 1
    }
  ] }

  dataSource: CartItem[] = [];

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService,  private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
    
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
  
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51NC4UTSGfqvlWzw378eWOMcI2PF4FUUSByg9UC2k93a6vrdP2HvTKInYkQzLjiDw4qz5WLu9V75AMG6jN4G2h97700VXxJ5YwO');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }

}
