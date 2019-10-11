import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { listUrl, BOOK_URL, editUrl } from 'src/app/app.urls';
import { getParam } from 'src/app/routes.util';
import { GenericModel } from './generic.model';
import { GenericService } from './generic.service';

export class GenericViewComponent<T extends GenericModel> implements OnInit {

  protected baseUrl: string;
  item: T;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GenericService<T>) { 

  }

  ngOnInit() {
    this.loadItem();
  }

  protected loadItem(): void {
    const id = +getParam(this.route, 'id');
    this.service.getOne(id)
      .subscribe( 
        (item: T) => {
          this.item = item;
        }
      );
  }

  back() {
    this.service.clearMessage();
    this.router.navigate(listUrl(this.baseUrl));
    return false;
  }

  edit() {
    this.service.clearMessage();
    this.router.navigate(editUrl(this.baseUrl, this.item.id));
    return false;
  }
}
