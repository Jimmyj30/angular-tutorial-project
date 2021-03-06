import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  //
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
        // if user exists, then this.isAuthenticated will be true...
      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
