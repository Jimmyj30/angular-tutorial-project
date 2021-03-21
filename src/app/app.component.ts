import { Component, OnInit} from '@angular/core';

import { AuthService } from "./auth/auth.service";
import { LoggingService } from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedFeature = "recipe";
  //
  // onNavigate(feature:string){
  //   this.loadedFeature = feature;
  // }

  constructor(
    private authService: AuthService,
    private loggingService: LoggingService
  ){
  }

  ngOnInit(){
    this.authService.autoLogin();
    // we call autoLogin as soon as the app starts up
    // (aka in app.component.ts);
    this.loggingService.printLog("Hello from app component ngOnInit");
  }


}
