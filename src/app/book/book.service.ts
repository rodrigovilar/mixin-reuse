import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { AppService } from '../app.service';
import { Book } from './book';

@Injectable()
export class BookService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for book's
  books: Book[] = [];

  constructor(
    private appService: AppService
    ) { }

  /**
   * HTTP Method GET.
   *
   * @returns {Observable<Book[]>}
   */
  getAll(): Observable<Book[]> {
    return of(this.books);
  }

  /**
   * Gets one item by its ID.
   *
   * @param {any} id
   * @returns {Observable<Book>}
   */
  getOne(id: number): Observable<Book> {
    let book: Book = this.getById(id);
    return of(book);
  }

  /**
   * HTTP Method POST.
   *
   * @param {Book} book
   * @returns {Observable<ObjeBookct>}
   */
  add(book: Book): Observable<Book> {
    if (!book.id) {
      book.id = ++this.lastId;
    }
    this.books.push(book);
    return of(book);
  }

  /**
   * HTTP Method PUT.
   *
   * @param {Book} book
   * @returns {Observable<Book>}
   */
  update(newBook: Book): Observable<Book> {
    let oldBook: Book = this.getById(newBook.id);
    Object.assign(oldBook, newBook);
    return of(oldBook);    
  }

  private getById(id: number): Book {
    return this.books
      .filter(todo => todo.id === id)
      .pop();
  }

  /**
   * HTTP Method DELETE.
   *
   * @returns {Observable<void>}
   */
  delete(id: number): Observable<void> {
    this.books = this.books
      .filter(todo => todo.id !== id);
    return of(null);
  }

  changeMessage(message: string) {
    this.appService.changeMessage(message);
  }

  clearMessage() {
    this.appService.clearMessage();
  }
}
