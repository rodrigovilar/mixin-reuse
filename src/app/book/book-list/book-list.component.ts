import { Component } from '@angular/core';

import { ListComponent } from 'src/app/framework/decorators';

import { BOOK_URL } from 'src/app/app.urls';

@ListComponent(BOOK_URL)
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {}
