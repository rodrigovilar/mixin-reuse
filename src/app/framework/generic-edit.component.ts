import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { isNullOrUndefined } from 'util';
import { showUrl, listUrl } from 'src/app/app.urls';
import { getParam } from 'src/app/routes.util';
import { GenericService } from './generic.service';
import { GenericModel } from './generic.model';

export abstract class GenericEditComponent<T extends GenericModel> implements OnInit {

  protected baseUrl: string;
  protected singularLabel: string;
  protected editForm: FormGroup;
  protected isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: GenericService<T>) {

  }

  ngOnInit(): void {
    this.service.clearMessage();
    const id = +getParam(this.route, 'id');
    this.isEditMode = !isNullOrUndefined(id) && id > 0;

    this.initForm();

    if (this.isEditMode) {
      this.loadItem();
    }
  }

  /**
   * Initialize the edit form.
   */
  initForm(): void {
    this.editForm = this.formBuilder.group(this.getFormControls(this.formBuilder));
  }

  abstract getFormControls(formBuilder: FormBuilder): Object;

  protected loadItem(): void {
    const id = +getParam(this.route, 'id');
    this.service.getOne(id)
      .subscribe( 
        (item: T) => {
          const formItem = {};
          Object.keys(this.getFormControls(this.formBuilder)).forEach(key => {
            formItem[key] = item[key] ? item[key] : null;
          });
          this.editForm.patchValue(formItem);
        }
      );
  }

  /**
   * Invoked when user submits the form.
   *
   * Checks if the form is in edit mode:
   * - No:  Inserts the item.
   * - Yes: Updates the item.
   *
   */
  onSubmit(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.insert();
    }
  }

  /**
   * Inserts the item.
   */
  protected insert(): void {
    this.service.add(this.editForm.value)
      .subscribe(
        (item: T) => {
          this.service.changeMessage(`${this.singularLabel} was successfully inserted.`);
          this.router.navigate(showUrl(this.baseUrl, item.id));
        },
        error => {
          this.service.changeMessage(error.error ? error.error.message : error.message);
        }
      );
  }

  /**
   * Updates the item.
   */
  protected update(): void {
    this.service.update(this.editForm.value)
      .subscribe(
        (item: T) => {
          this.service.changeMessage(`${this.singularLabel} was successfully updated.`);
          this.router.navigate(showUrl(this.baseUrl, item.id));
        },
        error => {
          this.service.changeMessage(error.error ? error.error.message : error.message);
        }
      );
  }

  show() {
    this.service.clearMessage();
    this.router.navigate(showUrl(this.baseUrl, +getParam(this.route, 'id')));
    return false;
  }

  back() {
    this.service.clearMessage();
    this.router.navigate(listUrl(this.baseUrl));
    return false;
  }
}
