import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators} from "@angular/forms";
import { RecipeService } from "../recipe.service";


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = (params["id"] != null) ;
        // checks if params is defined or not
        // if the route "id" is undefined (dosen't exist)
        // then we are in newMode
        // if the route "id" is defined, then editmode is now
        // "true" since we have an id for our recipe
        // and can now start editing our recipe
        // console.log(this.editMode);
        // NOTE: in cases where we use our own observables, we will
        // need to clean up subscriptions...
        this.initForm();
      }
    );
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"]
    // );
    if( this.editMode ){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(
          null,
          [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]
        )
      })
    )
  }

  onDeleteIngredient( index: number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  private initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if( this.editMode ){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]){
        //recipe["ingredients"] and recipe.ingredients do the same thing
        for( let ingredient of recipe.ingredients ){
          recipeIngredients.push(
            new FormGroup ({
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(
                ingredient.amount,
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)]
              )
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
      // "ingredients" is a formarray...
    });
  }

  get controls(){
    return(<FormArray>this.recipeForm.get("ingredients")).controls;
  }
}
