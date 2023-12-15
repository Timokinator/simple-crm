import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSupplierComponent } from './dialog-add-supplier.component';

describe('DialogAddSupplierComponent', () => {
  let component: DialogAddSupplierComponent;
  let fixture: ComponentFixture<DialogAddSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddSupplierComponent]
    });
    fixture = TestBed.createComponent(DialogAddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
