import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOrderComponent } from './dialog-add-order.component';

describe('DialogAddOrderComponent', () => {
  let component: DialogAddOrderComponent;
  let fixture: ComponentFixture<DialogAddOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddOrderComponent]
    });
    fixture = TestBed.createComponent(DialogAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
