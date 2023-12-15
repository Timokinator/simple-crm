import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCategoryComponent } from './dialog-add-category.component';

describe('DialogAddCategoryComponent', () => {
  let component: DialogAddCategoryComponent;
  let fixture: ComponentFixture<DialogAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddCategoryComponent]
    });
    fixture = TestBed.createComponent(DialogAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
