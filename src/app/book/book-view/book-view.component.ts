import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericViewComponent } from 'src/app/framework/generic-view.component';
import { GenericService } from 'src/app/framework/generic.service';

import { Book } from '../book';
import { BOOK_URL } from 'src/app/app.urls';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent extends GenericViewComponent<Book> {

  constructor(
    router: Router,
    route: ActivatedRoute,
    service: GenericService<Book>) { 
      super(router, route, service);
      super.baseUrl = BOOK_URL;
  }
}
