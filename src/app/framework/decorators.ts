import { GenericListComponent } from './generic-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from './generic.service';

import { globalInjector } from '../app.injector';
import { GenericEditComponent } from './generic-edit.component';
import { FormBuilder } from '@angular/forms';
import { GenericViewComponent } from './generic-view.component';
import { BOOK_URL } from '../app.urls';

function applyMixinInternal(target: any, source: any) {
    Object.getOwnPropertyNames(source).forEach(name => {
        const basePropertyDescriptor = Object.getOwnPropertyDescriptor(source, name);
        Object.defineProperty(target, name, basePropertyDescriptor);
    });
}

function applyConstructorMixin(derivedCtor: any, baseCtor: any) {
    applyMixinInternal(derivedCtor.prototype, baseCtor.prototype);
}

function overrideConstructor(baseConstructor: any, params: any){
    return function <T extends {new(...args:any[]):{}}>(constructor:T) {

        let newConstructor =  class extends constructor {}
    
        applyConstructorMixin(newConstructor, baseConstructor);
        applyMixinInternal(newConstructor.prototype, params);

        return newConstructor;
    }
}

export function CrudModule(key: string) {
    return function <T extends {new(...args:any[]):{}}>(constructor:T) {

        globalInjector.addInstance(key, GenericService);

        return constructor;
    }
}

export function ListComponent(baseUrl: string) { 

    return overrideConstructor(GenericListComponent, {
        baseUrl: baseUrl,
        router: globalInjector.get(Router),
        service: globalInjector.getInstance(BOOK_URL)
    });
}

export function EditComponent(baseUrl: string, singularLabel: string) { 

    return overrideConstructor(GenericEditComponent, {
        baseUrl: baseUrl,
        singularLabel: singularLabel,
        router: globalInjector.get(Router),
        formBuilder: globalInjector.get(FormBuilder),
        service: globalInjector.getInstance(BOOK_URL)
    });
}

export function ViewComponent(baseUrl: string) { 

    return overrideConstructor(GenericViewComponent, {
        baseUrl: baseUrl,
        router: globalInjector.get(Router),
        service: globalInjector.getInstance(BOOK_URL)
    });
}
