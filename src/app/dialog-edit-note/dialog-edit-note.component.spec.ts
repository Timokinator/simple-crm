import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditNoteComponent } from './dialog-edit-note.component';

describe('DialogEditNoteComponent', () => {
  let component: DialogEditNoteComponent;
  let fixture: ComponentFixture<DialogEditNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditNoteComponent]
    });
    fixture = TestBed.createComponent(DialogEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
