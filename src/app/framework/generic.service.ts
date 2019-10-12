import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { AppService } from '../app.service';
import { GenericModel } from './generic.model';

@Injectable()
export class GenericService<T extends GenericModel> {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for items
  items: T[] = [];

  constructor(
    private appService: AppService
    ) { }

  /**
   * HTTP Method GET.
   *
   * @returns {Observable<T[]>}
   */
  getAll(): Observable<T[]> {
    return of(this.items);
  }

  /**
   * Gets one item by its ID.
   *
   * @param {number} id
   * @returns {Observable<T>}
   */
  getOne(id: number): Observable<T> {
    let item: any = this.getById(id);
    return of(item);
  }

  /**
   * HTTP Method POST.
   *
   * @param {T} item
   * @returns {Observable<T>}
   */
  add(item: T): Observable<T> {
    if (!item.id) {
      item.id = ++this.lastId;
    }
    this.items.push(item);
    return of(item);
  }

  /**
   * HTTP Method PUT.
   *
   * @param {T} item
   * @returns {Observable<T>}
   */
  update(newItem: T): Observable<T> {
    let oldItem: T = this.getById(newItem.id);
    Object.assign(oldItem, newItem);
    return of(oldItem);    
  }

  private getById(id: number): T {
    return this.items
      .filter(item => item.id === id)
      .pop();
  }

  /**
   * HTTP Method DELETE.
   *
   * @returns {Observable<void>}
   */
  delete(id: number): Observable<void> {
    this.items = this.items
      .filter(item => item.id !== id);
    return of(null);
  }

  changeMessage(message: string) {
    this.appService.changeMessage(message);
  }

  clearMessage() {
    this.appService.clearMessage();
  }
}
