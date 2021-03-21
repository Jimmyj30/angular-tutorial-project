import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //const id = this.route.snapshot.params["id"];
    // dosen't work since you can "reload" the page
    // from within the page by reselecting the same recipe
    // that is displayed
    this.route.params.subscribe(
      (params: Params ) => {
        this.id = +params["id"];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(
      this.recipe.ingredients
    );
  }

  onEditRecipe(){
    this.router.navigate(["edit"], {relativeTo: this.route});
    // this.router.navigate(["../", this.id, "edit"], {relativeTo: this.route});
    // note: alternative form of navigation... a bit more complex...
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
