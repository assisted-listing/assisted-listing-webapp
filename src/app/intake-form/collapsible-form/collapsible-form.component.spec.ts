import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleFormComponent } from './collapsible-form.component';

describe('CollapsibleFormComponent', () => {
  let component: CollapsibleFormComponent;
  let fixture: ComponentFixture<CollapsibleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleFormComponent]
    });
    fixture = TestBed.createComponent(CollapsibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
