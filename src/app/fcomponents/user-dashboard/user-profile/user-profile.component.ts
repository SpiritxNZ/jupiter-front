import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { Profile } from '../../../service/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	updateProfileForm: FormGroup;
	profile: any;
	userId: number;
	subscribe: boolean;
	firstname: string;
	lastname: string;
	email: string;
	phoneno: string;
	com: string;
	subs: boolean;

  constructor(
	  private fb: FormBuilder,
	  private productservice: ProductService
  ) { }

  ngOnInit() {
	  this.userId = JSON.parse(localStorage.getItem('userId'));
	//   console.log(this.userId);

	  this.productservice.getProfile(this.userId).subscribe(
		  profile => {
			console.log('Current logged in user：', profile);
			  this.profile= profile;
			//   console.log(this.profile['data'][0].email);
			this.firstname = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].firstName: null;
			this.lastname = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].lastName: null;
			this.email = profile['data'][0].email;
			this.phoneno = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].phoneNumber: null;
			this.com = profile['data'][0]['userInfo'][0] ? profile['data'][0]['userInfo'][0].company: null;
			
			if (profile['data'][0].isSubscribe == 1) {
				this.subs = true;
			}else{
				this.subs = false;
			}
			this.form();
	  	  },
	  	  err => {
			console.log(err);
		  }
	  );
  }

   form() {
	this.updateProfileForm = this.fb.group({
	  fname: [this.firstname, [Validators.minLength(2),
				   			   Validators.maxLength(20)]],
	  lname: [this.lastname, [Validators.minLength(2),
				   			  Validators.maxLength(20)]],
	  phone: [this.phoneno, [Validators.pattern('[0-9]*'),
					 		 Validators.minLength(7),
					 		 Validators.maxLength(20)]],
	  company: [this.com, [Validators.minLength(2),
					 	   Validators.maxLength(20)]],
	  subscribe: [this.subs]
	});
  }

  get fname() {
	  return this.updateProfileForm.get('fname');
  }
  
  get lname() {
	return this.updateProfileForm.get('lname');
  }

  get phone() {
	return this.updateProfileForm.get('phone');
  }

  get company() {
	return this.updateProfileForm.get('company');
  }

  getErrorMessage1() {
	return this.fname.hasError('required') ? 'Please enter your first name' :
	this.fname.hasError('minlength' || 'maxlength') ? '8 - 20 characters required' :
	  '';
  }

  getErrorMessage2() {
	return this.lname.hasError('required') ? 'Please enter your last name' :
	this.fname.hasError('minlength' || 'maxlength') ? '8 - 20 characters required' :
	  '';
  }

  getErrorMessage3() {
	return this.phone.hasError('minlength' || 'maxlength') ? '7 - 20 digits required' :
	  '';
  }

  getErrorMessage4() {
	return this.company.hasError('minlength' || 'maxlength') ? '2 - 20 characters required' :
	  '';
  }
  
  onSubmit() {
	let user = {
		fname: this.updateProfileForm.value.fname,
      	lname: this.updateProfileForm.value.lname,
      	phone: this.updateProfileForm.value.phone,
      	company: this.updateProfileForm.value.company,
    	isSubscribe: this.subs
	}
	console.log('Updated user profile: ', user);
	this.productservice.updateProfile(this.userId).subscribe(
		response => {
			console.log(response);
		},
		error => {
			console.log('Update Failed Error', error);
		}
	)
  }
  
  onSlideChange(subscribe){
    if(subscribe.checked){
      this.subscribe = true;
    }else{
      this.subscribe = false;
    }
  }
}