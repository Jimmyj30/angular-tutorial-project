import { Ingredient } from "../shared/ingredient.model";

export class Recipe{ // defining the recipe class (vanilla TypeScript)
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name:string,
    desc:string,
    imagePath:string,
    ingredients: Ingredient[]){
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}

// this file creates a model for the recipe class that
// we can use in our other "recipe-related" components
