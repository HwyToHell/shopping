import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
              private router: Router,
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

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,  Validators.required),
        'amount': new FormControl( null,
          [Validators.required,
          Validators.pattern(/^[1-9+[0-9]*$/)] )
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSave() { // save button submits
    /*
    use shorter notation if form structure and data model fit together      
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients'] 
    );
    */

    if (this.isEditMode) {
      // this.recipeSvs.updateRecipe(this.id, recipe);
      this.recipeSvs.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeSvs.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
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
      recipeImageUrl = recipe.imageUrl;

      // recipe can be created without ingredients,
      // this must be checked before using ingredients array
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl( ingredient.name, Validators.required ),
              'amount': new FormControl( ingredient.amount, 
                [Validators.required,
                Validators.pattern(/^[1-9+[0-9]*$/)] )
            })
          );
        }
      }
    } // end isEditMode

    this.recipeForm = new FormGroup({
      // either empty (not in edit mode) or current recipe name (in edit mode)
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imageUrl': new FormControl(recipeImageUrl, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
