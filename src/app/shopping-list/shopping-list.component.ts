import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  // subscribes to when the ShoppingListService figures out that ingredients
  // have changed...

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ){
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[] ) => {
        this.ingredients = ingredients;
      }
      // this nameless function updates the ingredients array if
      // the contents of the array changed
    )
    this.loggingService.printLog("Hello from shopping list component ngOnInit")
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
