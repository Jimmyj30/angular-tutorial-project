import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations:[
  // we route to all these components through recipes-routing.module,
  // so they must be included in this "overarching" module for the recipes ...
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  // Note: import things (components, directives, pipes)
  // that you need into all your new modules
  // (except for services, they can be used throughout as long as
  // they are provided in appModule...)
  imports: [
    //
    RouterModule,
    // CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
   ],

  // exports not needed, because we are just using these entryComponents
  // internally (within the "recipes" section...)

  // exports:[
  //   // RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  // ]
})
export class RecipesModule{
}
