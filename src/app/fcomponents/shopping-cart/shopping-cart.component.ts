import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalPrice = 0;
  prodsInCart: any;
  productDetail: any;
  stockUnavailable = false;
  userInputQuantityArray = [];
  baseImageLink = environment.baseLink;
  productTimetable=[]
  @ViewChild('quantityInput', { static: false }) quantityInput: ElementRef;
  constructor(
    private productService: ProductService
    ){}

  ngOnInit() {
    // get the current shopping cart
    this.productTimetable=JSON.parse(localStorage.getItem('productTimetable') || '[]');
    console.log(this.productTimetable)
    this.prodsInCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    if (this.prodsInCart == null || this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    // get the image of product
    this.prodsInCart.forEach(element => {
      this.productService.getImg(element.ProdId).subscribe((res => {
        element.url = res[0]['url'];
      }));
      this.userInputQuantityArray.push(element.Quantity);
    });
    this.getAllStock();
    this.price();
  }
  // delete items of shopping cart
  deleteCart(id) {
    this.prodsInCart.splice(id, 1);
    localStorage.setItem('cartList', JSON.stringify(this.prodsInCart));
    if (this.prodsInCart.length === 0) {
      this.productService.setShoppingCartStatus(false);
    }
    this.price();
  }
  // calculate total price of shopping cart
  price() {
    this.totalPrice = 0;
    this.prodsInCart.forEach(prod => {
      this.totalPrice += prod.Price;
    });
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
  }
  getAllStock() {
    this.prodsInCart.forEach(element => {
      this.productService.showProduct(element.ProdId).subscribe((res => {
        element.availableStock = res['availableStock'];
      }));
    });
  }
}