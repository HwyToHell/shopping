import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  isDropdown: boolean = false;
  @Input() recipeChild: Recipe;

  constructor(private recipeSvs: RecipeService) { }

  ngOnInit(): void {
  }

  onDropdown() {
    this.isDropdown = !this.isDropdown;
    //console.log("recipe detail: show dropdown");
  }

  onAddToShoppingList() {
    this.recipeSvs.addIngredientsToShoppingList(this.recipeChild.ingredients);
    // forEach approach will emit unnecessary events
    //this.recipeChild.ingredients.forEach(ingredient => this.shoppingSvs.addIngredient(ingredient) );
  }

}