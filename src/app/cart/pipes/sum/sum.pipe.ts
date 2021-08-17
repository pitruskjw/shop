import { Pipe, PipeTransform } from '@angular/core';
import { ProductViewModel } from '../../../models/cartViewModel';

@Pipe({
  name: 'sum',
  pure: true,
})
export class SumPipe implements PipeTransform {
  transform(value: ProductViewModel[] | undefined, ...args: unknown[]): number {
    if (value) {
      let sum = 0;
      value.forEach((v) => (sum += v.quantity * v.product?.price));
      return sum;
    }
    return 0;
  }
}
