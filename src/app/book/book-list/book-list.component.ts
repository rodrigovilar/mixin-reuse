import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from 'src/app/framework/generic-list.component';
import { GenericService } from 'src/app/framework/generic.service';

import { Book } from '../book';
import { BOOK_URL } from 'src/app/app.urls';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent extends GenericListComponent<Book> {

  constructor(
    router: Router,
    service: GenericService<Book>) {
      super(router, service);
      super.baseUrl = BOOK_URL;
  }

}
