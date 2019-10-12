import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from './generic.service';
import { GenericModel } from './generic.model';

import { showUrl, editUrl, createUrl } from 'src/app/app.urls';

export class GenericListComponent<T extends GenericModel> implements OnInit {

  public items: any[] = [];
  protected baseUrl: string;

  constructor(
    private router: Router,
    private service: GenericService<T>) {
  }

  ngOnInit() {
    this.list(true);
  }

  list(clearMessage: boolean) {
    this.service.getAll().subscribe( 
      (items: any[]) => {
        this.items = items;
        if (clearMessage) {
          this.service.clearMessage();
        }
      },
      (error) => {
        if (clearMessage) {
          this.service.clearMessage();
        }
      });
  }

  show(id: number) {
    this.service.clearMessage();
    this.router.navigate(showUrl(this.baseUrl, id));
    return false;
  }

  edit(id: number) {
    this.service.clearMessage();
    this.router.navigate(editUrl(this.baseUrl, id));
    return false;
  }

  newItem() {
    this.service.clearMessage();
    this.router.navigate(createUrl(this.baseUrl));
    return false;
  }

  destroy(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe(
        data => {
          this.service.changeMessage(`Book was successfully destroyed.`);
          this.list(false);
        }
      );
    }
    return false;
  }

}
