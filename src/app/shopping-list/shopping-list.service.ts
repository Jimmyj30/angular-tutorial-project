import { Ingredient } from "../shared/ingredient.model";
// import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService{
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  // this emits an ingredient array
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  // array of the "Ingredient" objects made in ingredient.model.ts
  // inside of the "shared" folder
  private ingredients: Ingredient[]= [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push( ingredient );
    this.ingredientsChanged.next( this.ingredients.slice() );
  }

  addIngredients( ingredients: Ingredient[] ){
    // for( let ingredient of ingredients ){
    //   this.addIngredient( ingredient );
    // } // NOTE: emits too many events...

    // spreads the "ingredients" array given to this
    // member function into a comma
    // seperated list of ingredients
    this.ingredients.push( ...ingredients );
    this.ingredientsChanged.next( this.ingredients.slice() );
  }

  updateIngredient( index: number, newIngredient: Ingredient ){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
