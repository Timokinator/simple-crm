import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteSupplierComponent } from './dialog-delete-supplier.component';

describe('DialogDeleteSupplierComponent', () => {
  let component: DialogDeleteSupplierComponent;
  let fixture: ComponentFixture<DialogDeleteSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteSupplierComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
