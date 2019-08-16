import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../service/product.service';
import { ProductDialogComponent } from '../../AdminDialogs/productDialog/productDialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  productTypeId: string;
  displayedProductData: any;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.productTypeId = this.route.snapshot.params['productTypeId'];
        this.getProductData(this.productTypeId);
      }
    );
  }

  getProductData(typeId: string) {
    this.isLoading = true;
    this.productService.indexType(Number(typeId)).subscribe(
      (res) => {
        this.isLoading = false;
        this.displayedProductData = res;
        console.log(res);
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  openProduct(data) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '750px';
    dialogConfig.width = '750px';
    dialogConfig.data = {
      id: 1,
      title: 'Update Product',
      data: data,
      action: 'update',
      blockCode: this.productTypeId
    };
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getProductData(this.productTypeId);
    });
  }

  createProduct() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '750px';
    dialogConfig.width = '750px';


    dialogConfig.data = {
      id: 1,
      title: 'Create Product',
      action: 'create',
      blockCode: this.productTypeId
    };
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getProductData(this.productTypeId);
    });
  }

  deleteProduct(data) {
    const id = data.prodId;
    if (confirm('Are you sure you want to delete this Product?')) {
      this.productService.deleteProduct(id).subscribe(
        (res) => {
          this.getProductData(this.productTypeId);
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        }
      );
    } else {
      // Do nothing!
    }
  }
}