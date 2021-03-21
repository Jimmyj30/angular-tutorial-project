import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { LoggingService } from "../logging.service";


@NgModule({
  declarations:[
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports:[
    CommonModule
  ],
  exports:[
    //where ever we import the shared module, we can have
    // access to all of these components/directives/features...
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [
    // An entry component is any component that Angular loads imperatively,
    // (which means you’re not referencing it in the template)
    AlertComponent
  ],
  // providers: [LoggingService]
})
export class SharedModule{}
