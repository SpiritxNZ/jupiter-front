import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { AdminPanelService } from '../../../service/admin-panel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sideBar',
  templateUrl: './admin-sideBar.component.html',
  styleUrls: ['./admin-sideBar.component.css']
})
export class AdminSideBarComponent implements OnInit {
  displayedProductTypes: any;
  navBarIconArray: Array<object> = [
    {'Id': 1, 'Icon': 'fas fa-shopping-bag'},
    {'Id': 2, 'Icon': 'fas fa-gift'},
    {'Id': 3, 'Icon': 'fas fa-briefcase'},
    {'Id': 4, 'Icon': 'fab fa-pagelines'},
    {'Id': 5, 'Icon': 'fas fa-mask'},
    {'Id': 6, 'Icon': 'fas fa-umbrella-beach'},
  ]
  constructor(
    private productService: ProductService,
    private adminPanelService: AdminPanelService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getProductTypes();
  }
  getProductTypes() {
    this.productService.getProductType().toPromise()
    .then(data => {
      this.displayedProductTypes = Object.values(data);
    })
    .catch(err => console.log(err));
  }
  
  updatePanel(status: string) {
    this.adminPanelService.changePanel(status);
  }
  reload(){
    const url=this.router.url
    console.log(url)
    if(url.localeCompare('/admin/adminDashboard')!=0){
      window.location.reload()
    }
    
  }
}
