import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  // <app-recipe-item *ngFor="let recipeEl of recipes "
  // [recipe]="recipeEl"></app-recipe-item>
  // here, the custom "recipe" property of this component
  // was bound to the corresponding recipe element, so
  // "recipe" here refers to our recipe item itself

  ngOnInit(): void {
  }


}
