import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSiteComponent } from './help-site.component';

describe('HelpSiteComponent', () => {
  let component: HelpSiteComponent;
  let fixture: ComponentFixture<HelpSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpSiteComponent]
    });
    fixture = TestBed.createComponent(HelpSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
