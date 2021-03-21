import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap} from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
  }

  // use the recipe service to get our recipes...
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      "https://ng-course-recipe-book-c8cc9-default-rtdb.firebaseio.com/recipes.json",
      recipes
    ).subscribe((response) => { console.log(response) });
    // this "put" is built in with firebase, put requests depend on the api
  }

  fetchRecipes() {
    // for fetchRecipes(...), we should get our recipes, and then "push" those
    // recipes into our website through the RecipeService we have injected
    // into this service...

          // user.token is from the getter in user.model.ts
    return this.http.get<Recipe[]>(
      "https://ng-course-recipe-book-c8cc9-default-rtdb.firebaseio.com/recipes.json?"
    )
    .pipe(
      map( (recipes) => {
            //javascript array map function (not rxjs map function)
            return recipes.map( (recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients:[]
              };
            });
          }
        ),
      tap( (recipes) => {
          this.recipeService.setRecipes(recipes);
        }
      )
    )

    // .subscribe(
    //   (recipes) => { this.recipeService.setRecipes(recipes) }
    // );
  }
}
