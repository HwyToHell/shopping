import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeSvs: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isEditMode = params['id'] != null;
        // reload form whenever route params change
        this.initForm();
      }
    )
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
 
  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImageUrl = '';
    let recipeIngredients = new FormArray([]);


    if (this.isEditMode) {
      // only get recipe data, if in edit mode
      const recipe = this.recipeSvs.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImageUrl = recipe.imagePath;

      // recipe can be created without ingredients,
      // this must be checked before using ingredients array
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    } // end isEditMode

    this.recipeForm = new FormGroup({
      // either empty (not in edit mode) or current recipe name (in edit mode)
      'name': new FormControl(recipeName),
      'description': new FormControl(recipeDescription),
      'imageUrl': new FormControl(recipeImageUrl),
      'ingredients': recipeIngredients
    });
  }

}
