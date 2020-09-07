import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingSvs: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingSvs.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingSvs.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.editMode = false;
    // form.reset();
    // form is known as of ngOnInit, so template parameter is not needed
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.shoppingSvs.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingSvs.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingSvs.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
}