import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping';
  isRecipesOn = true;
  isShoppingListOn = true;

  showRecipes = () => {
   this.isRecipesOn = !this.isRecipesOn; 
  }

  showShoppingList = () => {
    this.isShoppingListOn = !this.isShoppingListOn; 
   }
}
