import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupDialogComponent } from './fcomponents/basic/user-dialog/popup-dialog/popup-dialog.component';
  import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Luxe Dream Event Hire';

  schema = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    'name': 'Luxe Dream Events',
    'url': 'http://luxedreameventhire.co.nz',
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+64-021-08793899",
      "contactType": "Customer service"
    }
  };
  isBrowser: boolean = false;

  constructor(
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId,
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

  ngOnInit() {
    if(!this.isBrowser){
      return ;
    }
    if(!('isVisited' in localStorage)){
      this.popupDialog()
    }
  }
  popupDialog(){
    localStorage.setItem('isVisited','1')
    this.dialog.open(PopupDialogComponent,{
        width: '600px',
        height: '600px',
      });
  }
  // Check if isvisit exist in localstorage

  // if exist, exit this function

  // if not exist, go to add localstorage value

  // open dialog
}