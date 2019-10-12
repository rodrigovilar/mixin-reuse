import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EditComponent } from 'src/app/framework/decorators';

import { BOOK_URL } from 'src/app/app.urls';
import { ActivatedRoute } from '@angular/router';

@EditComponent(BOOK_URL, 'Book')
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {

  constructor(protected route: ActivatedRoute) {}

  getFormControls(formBuilder: FormBuilder): Object {
    return {
      id: formBuilder.control(undefined, []),
      title: formBuilder.control(undefined, []),
      author: formBuilder.control(undefined, [])
    };
  }

}
