import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-base',
  template: ` <p>base works!</p> `,
  styles: [],
})
export class BaseComponent implements OnDestroy {
  protected destroyer$ = new Subject();

  constructor() {}

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
