import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service'
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: any = []
  allCategories:any = []
  typeName: any
  selectedCate: string = "All Products"
  errorMessage:string
  categoryId:number


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title,
  ) {
    // Following section in constructor for SEO Purposes 
    this.meta.addTags([
      { name: 'keywords', content: 'Luxedream Hire, Party hire, wedding hire, birthday party hire, event hire, auckland event hire'},
      { name: 'description', content: 'One stop event and party hire and services in Auckland.'},
    ])
    this.titleService.setTitle('Luxe Dream Auckland Event and Party Hire | Hire');
  }



  // with initiation, if type 1 or (Hire) run function with category selection, If other types, simply get data from database
  initiation(){
    //See if is type 1
    this.hireFunction()
    // Else if not type 1
    this.servicePackageFunction()
  }


  hireFunction(){
    // Get category list from database
    // Get from database by categories
    this.indexDataService()
  }

  servicePackageFunction(){
    // Get from database by types
    this.indexDataService()
  }

  indexDataService(){
    // Pass to service
    // Service to determine if error or response
    
    // If response to processing data function
    this.dataToDisplay()
  }

  dataToDisplay(){
    // Process what data to display
  }









  // Below error change to this format

  ngOnInit() {
    // Watch the changes of categoryId and reload component
    this.route.params.subscribe(
      params => {
        this.categoryId = this.route.snapshot.params['id'];
        this.typeName = this.route.snapshot.data['some_data'];

        this.getCategories()
        this.changeCate(this.categoryId)
      }
    );

    console.log(this.typeName)
    if (this.typeName == 'hire') {
      this.sortByType(1)
    }
    if (this.typeName == 'service') {
      this.sortByType(2)
    }
    if (this.typeName == "package") {
      this.sortByType(3)
    }
      //this.selectedCate = "All Products"
  }

  //sort product by type => Hire | Service | Package
  sortByType(id:number){
    this.productService.indexType(id).subscribe(
      (res) => {
        this.allProducts = res['product']
        console.log(this.allProducts)
        if (id ==1){
          this.getCategories()
        }
      },
      (err) => {console.log(err),this.errorMessage = 'Server fault'}
      )
  }
  //sort product by category
  changeCate(id,e?) {
    if(e){
      this.selectedCate = e.srcElement.innerHTML
    }
    this.productService.indexCategoryId(id).subscribe((res)=>{
      this.allProducts = res['product']
      this.selectedCate = res['categoryName']
      console.log(this.allProducts)
    },(error)=>{
      console.log(error)
    })
  }
  //Get all the categories => dropdown menu
  getCategories(){
    this.productService.indexCategory().subscribe((res)=>{
      this.allCategories = res
      console.log(this.allCategories);
    },(error)=>{console.log(error),this.errorMessage = 'Server fault'})
  }
}