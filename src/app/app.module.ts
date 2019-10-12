import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { setAppInjector } from './app.injector';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericService } from './framework/generic.service';
import { CrudModule } from './framework/decorators';
import { BOOK_URL } from './app.urls';


@CrudModule(BOOK_URL)
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AppService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    setAppInjector(this.injector);
  }
}
