import { NgModule } from "@angular/core";

import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// its probably better to use @Injectable to
// provide services app-wide  -- @Injectable({ providedIn: "root" })

@NgModule({
  providers:[
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ]
})
export class CoreModule{}
