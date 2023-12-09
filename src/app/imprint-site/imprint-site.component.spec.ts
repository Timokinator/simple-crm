import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintSiteComponent } from './imprint-site.component';

describe('ImprintSiteComponent', () => {
  let component: ImprintSiteComponent;
  let fixture: ComponentFixture<ImprintSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImprintSiteComponent]
    });
    fixture = TestBed.createComponent(ImprintSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
