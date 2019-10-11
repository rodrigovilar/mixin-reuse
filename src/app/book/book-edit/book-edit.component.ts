import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericEditComponent } from 'src/app/framework/generic-edit.component';
import { GenericService } from 'src/app/framework/generic.service';

import { BOOK_URL } from 'src/app/app.urls';
import { Book } from '../book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent extends GenericEditComponent<Book> implements OnInit {

  constructor(
    route: ActivatedRoute,
    router: Router,
    formBuilder: FormBuilder,
    service: GenericService<Book>) {
      super(route, router, formBuilder, service);
      super.baseUrl = BOOK_URL;
      super.singularLabel = 'Book';
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getFormControls(formBuilder: FormBuilder): Object {
    return {
      id: formBuilder.control(undefined, []),
      title: formBuilder.control(undefined, []),
      author: formBuilder.control(undefined, [])
    };
  }

}
