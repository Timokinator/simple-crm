import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSupplierComponent } from './dialog-edit-supplier.component';

describe('DialogEditSupplierComponent', () => {
  let component: DialogEditSupplierComponent;
  let fixture: ComponentFixture<DialogEditSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditSupplierComponent]
    });
    fixture = TestBed.createComponent(DialogEditSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
