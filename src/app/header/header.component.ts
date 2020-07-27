import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isRecipesOn: boolean = true;
  @Output() showRecipes = new EventEmitter<boolean>();
  isShoppingListOn: boolean = true;
  @Output() showShoppingList = new EventEmitter<boolean>();

  constructor() { }

  onRecipes = () => {
    this.isRecipesOn = !this.isRecipesOn;
    this.showRecipes.emit(this.isRecipesOn);
    console.log(this.isRecipesOn);
  }

  onShoppingList = () => {
    this.isShoppingListOn = !this.isShoppingListOn;
    this.showShoppingList.emit(this.isShoppingListOn);
    console.log(this.isShoppingListOn);
  }

}
