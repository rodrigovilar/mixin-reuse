import { Component } from '@angular/core';

import { ViewComponent } from 'src/app/framework/decorators';

import { BOOK_URL } from 'src/app/app.urls';
import { ActivatedRoute } from '@angular/router';

@ViewComponent(BOOK_URL)
@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent {

  constructor(protected route: ActivatedRoute) {}
}
