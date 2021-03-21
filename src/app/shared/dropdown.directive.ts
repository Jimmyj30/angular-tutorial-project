import { Directive, HostListener, HostBinding} from "@angular/core";

@Directive({
  selector:'[appDropdown]'
})
export class DropdownDirective{
  @HostBinding("class.open") isOpen: boolean = false;
  // this binds a certain boolean to a certain property (the "open" property)

  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
