import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
  feedback_message:string;
  successMessage:string;
  PlannedTime:any;
  isSendingEmail:boolean = false;
  isSendSuccess:boolean  = false;
  userInfo={
    FirstName:'',
    LastName:'',
    Email:'',
    PhoneNum:'',
    company:'',
    streetAddress:'',
    city:'',
    Message:''
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService:ProductService,
    private router: Router,
    ) {
      if (isPlatformBrowser(this.platformId)) {
        // !if no JWT, redirect to login page
        if (localStorage.getItem('cartList') === '' || localStorage.getItem('cartList') == null) {
          this.router.navigate(['/shoppingCart']);
        }}
     }

  ngOnInit() {
  }

  onSubmit({valid}:{valid:boolean}) {
    console.log(valid);
    if(!valid){
      console.log('no')
      this.feedback_message = 'Please check all inputs.'
    }
    else{
      let { FirstName, LastName, PhoneNum, Email, Message} = this.userInfo
      let post = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNum: PhoneNum,
        Email: Email,
        Message: Message
      }
      this.submitCart(post)
      this.cleanStorage()
    }
  }

  submitCart(post){
    this.isSendingEmail = true
    //let data = JSON.parse(localStorage.getItem("cartList"))
      let data = JSON.parse(localStorage.getItem("cartList") || "[]");

    let cartdata = {
      location: `${this.userInfo.streetAddress}, ${this.userInfo.city}`,
      price:Number(localStorage.getItem('totalPrice')),
      PlannedTime:this.PlannedTime,
      CartProd: data
    };
    let cartContact = {
      CartModel: cartdata,
      ContactModel: post
    };
    this.productService.addCart(cartContact).subscribe(
      (res)=>{
        console.log(res)
        this.isSendingEmail = false
        this.isSendSuccess = true
      },
      (error)=>{
        console.log(error)
        this.feedback_message = 'Error'
      });
  }

  cleanStorage(){
    localStorage.clear()
  }

}
