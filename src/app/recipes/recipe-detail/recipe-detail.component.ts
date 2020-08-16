import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService} from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  isDropdown: boolean = false;
  id: number;
  // fetch from route instead of input
  recipeChild: Recipe;

  constructor(private recipeSvs: RecipeService,
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log("recipe id:", this.id);
        this.recipeChild = this.recipeSvs.getRecipe(this.id);
      }
    );
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

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // more complex routes can also be constructed this way
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}