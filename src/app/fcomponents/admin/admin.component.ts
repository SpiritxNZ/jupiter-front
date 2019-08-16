import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { FaqDialogComponent } from '../AdminDialogs/FaqDialog/FaqDialog.component';
import { GalleryDialogComponent } from '../AdminDialogs/galleryDialog/galleryDialog.component';
// import { ProductDialogComponent } from '../AdminDialogs/productDialog/productDialog.component';
import { CartDialogComponent } from '../AdminDialogs/CartDialog/CartDialog.component';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // blockCodeList:
  // Dashbard:1; Hires:2; Packages:3; Services:4; Gallery:5; Faq:6; Carts:7;
  blockCode = '1';
  isDataChanged = false;
  displayData: any;
  selectedImg: File = null;
  isLoading = false;
  // categoryList: any;
  // categoryForm: FormGroup;
  // categoryItems: FormArray;
  // isLoadingCategory = false;
  feedbackMessage = '';
  allEventTypes: any;
  isEventTypeImageEmpty: boolean;
  baseImageLink = environment.baseLink;

  @ViewChild('eventImageInput') eventImageInput: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) {
      if (isPlatformBrowser(this.platformId)) {
      // !if no JWT, redirect to login page
      if (sessionStorage.getItem('access_token') === '' || sessionStorage.getItem('access_token') == null) {
        this.router.navigate(['/login']);
      }}
    }

  ngOnInit() {
    this.getData();
  }
  changeBoard(e) {
    this.blockCode = e.srcElement.id;
    this.getData();
  }

  getData() {
    this.isLoading = true;
    switch (this.blockCode) {
      // show dashboard, edit category panel
      case '1': {
        this.isLoading = false;
        // this.loadCategory();
        break;
      }
      // case '2': {
      //   this.getProducts(1);
      //   break;
      // }
      // case '3': {
      //   this.getProducts(2);
      //   break;
      // }
      // case '4': {
      //   this.getProducts(3);
      //   break;
      // }
      // show galleries
      case '5' : {
        this.productService.indexGallery().subscribe(
          (res) => {
            this.displayData = res;
            this.isLoading = false; },
          (error) => {
            console.log(error);
            this.isLoading = false; }
        );
        this.productService.getEventType().subscribe(
          (res) => {
            this.allEventTypes = res;
          },
          (error) => {
            console.log(error);
          }
        )
        break;
      }
      // show faqs
      case '6' : {
        this.productService.getFaq().subscribe(
          (res) => {
            this.displayData = res;
            this.isLoading = false; }
          , (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
        break;
      }
      // show carts
      case '7' : {
        this.productService.getCarts().subscribe(
          (res) => {
            this.displayData = res;
            this.isLoading = false;
          console.log(res); },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
        break;
      }
    }
  }
  // get product details
  // getProducts(typeCode: number) {
  //   this.productService.indexType(typeCode).subscribe(
  //     (res) => {
  //       this.isLoading = false;
  //       this.displayData = res;
  //       console.log(res);
  //     },
  //     (err) => {
  //       this.isLoading = false;
  //       console.log(err);
  //      }
  //     );
  // }
  // update Faq
  openFaq(dataRecord) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '750px';
    dialogConfig.data = {
      id: 1,
      title: 'Update FAQ',
      data: dataRecord,
      action: 'update'
    };
    const dialogRef = this.dialog.open(FaqDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  // create new Faq
  createFaq() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '750px';

    dialogConfig.data = {
      id: 1,
      title: 'Create FAQ',
      action: 'create'
    };
    const dialogRef = this.dialog.open(FaqDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  // delete Faq
  deleteFaq(data) {
    const id = data.id;
    if (confirm('Are you sure you want to delete this Faq?')) {
      this.productService.deleteFaq(id).subscribe(
        (res) => {
          this.getData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    } else {
        // Do nothing!
    }
  }
  deleteCart(data) {
    const id = data.cartId;
    if (confirm('Are you sure you want to delete this Cart?')) {
      this.productService.deleteCart(id).subscribe(
        (res) => {
          this.getData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    } else {
        // Do nothing!
    }
  }
  openGallery(data) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '550px';
    dialogConfig.width = '750px';

    dialogConfig.data = {
      id: 1,
      title: 'Update Gallery',
      data: data,
      action: 'update'
    };
    const dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  createGallery() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '550px';
    dialogConfig.width = '750px';


    dialogConfig.data = {
      id: 1,
      title: 'Create Gallery',
      action: 'create'
    };
    const dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
  });
  }
  deleteGallery(data) {
    const id = data.prodjectId;
    if (confirm('Are you sure you want to delete this Gallery?')) {
      this.productService.deleteGallery(id).subscribe(
        (res) => {
          this.getData();
          alert('Success');
        }, (error) => {
          console.log(error);
          alert('Failed');
        });
    } else {
        // Do nothing!
    }
  }
  // openProduct(data) {
  //   const dialogConfig = new MatDialogConfig();

  //   // dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.height = '650px';
  //   dialogConfig.width = '750px';
  //   dialogConfig.data = {
  //     id: 1,
  //     title: 'Update Product',
  //     data: data,
  //     action: 'update',
  //     blockCode: this.blockCode
  //   };
  //   const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.getData();
  // });
  // }

  // createProduct() {
  //   const dialogConfig = new MatDialogConfig();

  //   // dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.height = '650px';
  //   dialogConfig.width = '750px';


  //   dialogConfig.data = {
  //     id: 1,
  //     title: 'Create Product',
  //     action: 'create',
  //     blockCode: this.blockCode
  //   };
  //   const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.getData();
  // });
  // }
  // deleteProduct(data) {

  //   const id = data.prodId;
  //   if (confirm('Are you sure you want to delete this Product?')) {
  //     this.productService.deleteProduct(id).subscribe(
  //       (res) => {
  //         this.getData();
  //         alert('Success');
  //       }, (error) => {
  //         console.log(error);
  //         alert('Failed');
  //       }
  //     );
  //   } else {
  //       // Do nothing!
  //   }
  // }
  openCart(data) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '650px';
    dialogConfig.width = '750px';
    dialogConfig.data = {
      id: 1,
      title: 'Cart Detail',
      data: data,
      action: 'update'
    };
    const dialogRef = this.dialog.open(CartDialogComponent, dialogConfig);
    this.isDataChanged = false;
    const sub = dialogRef.componentInstance.dataChanges.subscribe(() => {
      this.isDataChanged = true;
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.isDataChanged == true) {
        this.getData();
        console.log('data refreshed');
      } else {
        console.log('data not changed');
      }
  });
  }
  // loadCategory() {
  //   this.isLoadingCategory = true;
  //   // build category form
  //   this.categoryForm = this.formBuilder.group({
  //     categoryItems: this.formBuilder.array([])
  //   });
  //   // get categories
  //   this.productService.indexCategory().subscribe(
  //     (res) => {
  //       this.isLoadingCategory = false;
  //       this.categoryList = res;
  //       // add categories into formarray
  //       this.categoryList.forEach(prod => {
  //         const control = <FormArray>this.categoryForm.controls.categoryItems;
  //         control.push(
  //           this.formBuilder.group({
  //             categoryId: prod.categoryId,
  //             categoryName: prod.categoryName
  //           })
  //         );
  //       });
  //     }, (error) => {
  //       this.isLoadingCategory = false;
  //       console.log(error);
  //     }
  //   );
  // }
  // addCategory() {
  //   const control = <FormArray>this.categoryForm.controls.categoryItems;
  //   control.push(
  //     this.formBuilder.group({
  //       categoryId: 0,
  //       categoryName: null
  //     })
  //   );
  // }
  // updateCategory() {
  //   this.isLoadingCategory = true;
  //   const cateList = this.categoryForm.controls.categoryItems['value'];
  //   const id = 0;
  //   this.productService.updateCategory(id, cateList).subscribe((res) => {
  //     this.isLoadingCategory = false;
  //     this.feedbackMessage = 'Save Successfully';
  //   }, (error) => {
  //     this.isLoadingCategory = false;
  //     this.feedbackMessage = 'Save Failed';
  //     console.log(error);
  //   });
  // }
  // deleteCate(cate, i) {
  //   const control = <FormArray>this.categoryForm.controls.categoryItems;
  //   if (cate.value.categoryId === 0) {
  //     control.removeAt(i);
  //     this.feedbackMessage = 'Delete Successfully';
  //   } else {
  //     this.isLoadingCategory = true;
  //     this.productService.deleteCategory(cate.value.categoryId).subscribe(
  //       (res) => {
  //         this.isLoadingCategory = false;
  //         this.feedbackMessage = 'Delete Successfully';
  //         control.removeAt(i);
  //       }, (error) => {
  //         this.isLoadingCategory = false;
  //         this.feedbackMessage = 'Delete Failed';
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
  onEventTypeImageSelected(e) {
    this.selectedImg = <File>e.target.files[0];
    if (this.selectedImg == null) {
      this.isEventTypeImageEmpty = true;
    } else {
      this.isEventTypeImageEmpty = false;
    }
  }
  onUploadEventTypeImage(eventDetail) {
    if (this.selectedImg == null) {
      this.isEventTypeImageEmpty = true;
    } else {
      this.isEventTypeImageEmpty = false;
      this.isLoading = true;
      const fd = new FormData();
      fd.append('FormFile', this.selectedImg, this.selectedImg.name);
      fd.append('Id', JSON.stringify(eventDetail.typeId));
      this.productService.updateEventTypeImage(fd).subscribe((res) => {
        this.isLoading = false;
        this.feedbackMessage = res['data'];
        this.getData();
        // this.eventImageInput.nativeElement.value = null;
      }, (error) => {
        this.isLoading = false;
        this.feedbackMessage = 'upload failed';
        console.log(error);
      });
    }

  }

}
