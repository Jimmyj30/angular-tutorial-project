import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent {
  @Input() message: string;

  @Output() close = new EventEmitter<void>();

  // using ngIf to tell other components what is going on
  // is the better way to use dynamic components
  // (as opposed to programmatic creation)
  onClose(){
    this.close.next();
  }
}
