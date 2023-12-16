import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCategoryComponent } from './dialog-edit-category.component';

describe('DialogEditCategoryComponent', () => {
  let component: DialogEditCategoryComponent;
  let fixture: ComponentFixture<DialogEditCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditCategoryComponent]
    });
    fixture = TestBed.createComponent(DialogEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
