import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
 } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable( {providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor (
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
   ){
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // only fetch new recipes if we don't have any recipes to start with...
    const recipes = this.recipesService.getRecipes();

    if( recipes.length === 0){
        return this.dataStorageService.fetchRecipes();
    }else{
      return recipes;
    }
  }
  // whenever this route gets loaded, we resolve the route by
  // calling this.dataStorageService.fetchRecipes();
  // we set the recipes in recipeService through the tap() operator
  // in fetchRecipes()

  // also, the resolver feature will subscribe to this returned
  // observable automatically so there's no need to worry about that...
}
