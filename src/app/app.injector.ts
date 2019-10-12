import { Injector, Type, InjectFlags } from '@angular/core';

class GlobalInjector {

  private _appInjector: Injector;
  private instanceTypes = {};
  private instances = {};

  public set appInjector(appInjector: Injector) {
    this._appInjector = appInjector;
  }

  public get<T>(token: Type<T>) {
    return this._appInjector.get(token);
  }

  public addInstance<T>(key: string, instanceType: Type<T>) {
    this.instanceTypes[key] = instanceType;
    console.log(this.instanceTypes, key);
  }

  public getInstance(key: string): any {
    if (!this.instances[key]) {
      this.instances[key] = this._appInjector.get(this.instanceTypes[key]);  
    }
    console.log(this.instances, key);
    return this.instances[key];
  }
}

export let globalInjector = new GlobalInjector();

export function setAppInjector(injector: Injector) {
  if (globalInjector.appInjector) {
    console.error('Error: AppInjector was already set');
  } else {
    globalInjector.appInjector = injector;
  }
}
