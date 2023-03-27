import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  profiles: any = [];

  constructor() {
    let array = structuredClone(sessionStorage.getItem('profiles'));
    if (array) {
      this.profiles = JSON.parse(array);
    } else {
      this.profiles = [];
    }
    
    console.log("Profiles: ", this.profiles);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      location.reload();
      event.target.complete();
    }, 2000);
  };
}
