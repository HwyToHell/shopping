import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("pancake", "eggs, flour, milk",
    "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"),
    new Recipe("pancake", "eggs, flour, milk",
    "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"),
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
