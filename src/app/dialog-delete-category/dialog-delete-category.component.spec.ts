import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteCategoryComponent } from './dialog-delete-category.component';

describe('DialogDeleteCategoryComponent', () => {
  let component: DialogDeleteCategoryComponent;
  let fixture: ComponentFixture<DialogDeleteCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteCategoryComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
