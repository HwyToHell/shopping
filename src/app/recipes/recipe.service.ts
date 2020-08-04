import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "pancake",
      "pastry maker's power pancake",
      "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      [
        new Ingredient("eggs", 3), new Ingredient("flour", 100), new Ingredient("milk", 50)
      ]),
    new Recipe(
      "muffin",
      "marvellous muffin with blueberries",
      "https://images.unsplash.com/photo-1558303420-f814d8a590f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
      [
        new Ingredient("flour", 300), new Ingredient("baking soda", 1), new Ingredient("butter", 50),
        new Ingredient("milk", 200), new Ingredient("blueberries", 100)
      ]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}