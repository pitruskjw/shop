import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-eddit-product',
  templateUrl: './add-eddit-product.component.html',
  styleUrls: ['./add-eddit-product.component.css'],
})
export class AddEdditProductComponent implements OnInit {
  @Input()
  public product: Product | null;

  @Output()
  saveProductEvent = new EventEmitter<Product>();

  public showValidationErrors = false;

  public name: FormControl;
  public description: FormControl;
  public price: FormControl;
  public discount: FormControl;

  public formGroup: FormGroup;

  private nameValidators = {
    validators: [Validators.required],
  };
  private descriptionValidators = {
    validators: [Validators.required],
  };
  private priceValidators = {
    validators: [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
    ],
  };
  private discountValidators = {
    validators: [
      Validators.required,
      Validators.max(100),
      Validators.min(0),
      Validators.pattern('^[0-9]+$'),
    ],
  };

  constructor() {}

  ngOnInit(): void {
    if (!this.product) {
      this.name = new FormControl('', this.nameValidators);
      this.description = new FormControl('', this.descriptionValidators);
      this.price = new FormControl('', this.priceValidators);
      this.discount = new FormControl('', this.discountValidators);
    } else {
      this.name = new FormControl(this.product.name, this.nameValidators);
      this.description = new FormControl(
        this.product.description,
        this.descriptionValidators
      );
      this.price = new FormControl(this.product.price, this.priceValidators);
      this.discount = new FormControl(
        this.product.discount,
        this.discountValidators
      );
    }

    this.formGroup = new FormGroup({
      name: this.name,
      description: this.description,
      price: this.price,
      discount: this.discount,
    });
  }

  public saveProduct(): void {
    if (this.formGroup.invalid) {
      this.showValidationErrors = true;
      return;
    }

    let productCopy = { ...this.product } as Product;
    const newProduct = this.formGroup.value as Product;
    productCopy.name = newProduct.name;
    productCopy.description = newProduct.description;
    productCopy.price = newProduct.price;
    productCopy.discount = newProduct.discount;
    this.saveProductEvent.emit(productCopy);
  }
}
