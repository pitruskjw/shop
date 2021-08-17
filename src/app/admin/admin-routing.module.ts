import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ProductResolver } from './edit-product.resolver';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: AddComponent,
  },
  {
    path: ':id',
    component: EditComponent,
    resolve: {
      product: ProductResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
