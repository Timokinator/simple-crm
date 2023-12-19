import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCustomerComponent } from './dialog-edit-customer.component';

describe('DialogEditCustomerComponent', () => {
  let component: DialogEditCustomerComponent;
  let fixture: ComponentFixture<DialogEditCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditCustomerComponent]
    });
    fixture = TestBed.createComponent(DialogEditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
