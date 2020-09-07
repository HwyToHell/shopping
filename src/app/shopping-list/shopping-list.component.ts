import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangeSub: Subscription;
  
  constructor(private shoppingSvs: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingSvs.getIngredients();
    this.ingredientChangeSub = this.shoppingSvs.ingredientsChanged.subscribe( 
      (ingredients: Ingredient[]) => { this.ingredients = ingredients; });
  }
  
  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingSvs.startedEditing.next(index);
  }
}