import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();
  // these 2 things are not needed since we use routing now
  // to load different "pages"

  // NOTE: a subject is sort of like an event emitter...
  recipesChanged = new Subject<Recipe[]>();


  // array of recipes (recipe objects from recipe.model.ts)...
  // private recipes: Recipe[] = [
  //   new Recipe('test recipe',
  //   'this is a test recipe',
  //   'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
  //   [
  //     new Ingredient("Meat",1),
  //     new Ingredient( "French Fries", 20)
  //   ]),
  //   new Recipe('another test recipe',
  //   'this is a test recipe too',
  //   'https://www.glutenfreeandmore.com/wp-content/uploads/2018/07/15latkes.jpg',
  //   [
  //     new Ingredient("Buns",2),
  //     new Ingredient("Meat",1)
  //   ])
  // ];

  private recipes: Recipe[] = []; 

  constructor(private slService: ShoppingListService){

  }

  setRecipes(recipes: Recipe[] ){
    // function to set our recipes array with a newly gotten
    // recipes array
    this.recipes = recipes;
    this.recipesChanged.next( this.recipes.slice() );
  }

  getRecipes(){
    return this.recipes.slice();
    // returns a copy of the recipes array
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe( index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
