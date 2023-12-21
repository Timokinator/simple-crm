import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPositionToOrderComponent } from './dialog-add-position-to-order.component';

describe('DialogAddPositionToOrderComponent', () => {
  let component: DialogAddPositionToOrderComponent;
  let fixture: ComponentFixture<DialogAddPositionToOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddPositionToOrderComponent]
    });
    fixture = TestBed.createComponent(DialogAddPositionToOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
