import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEdditProductComponent } from './add-eddit-product/add-eddit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [EditComponent, AddEdditProductComponent, AddComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
