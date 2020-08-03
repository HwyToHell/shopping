import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("pancake", "eggs, flour, milk",
    "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"),
    new Recipe("muffin", "flour, milk, baking soda, blueberries",
    "https://images.unsplash.com/photo-1558303420-f814d8a590f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"),
    
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}