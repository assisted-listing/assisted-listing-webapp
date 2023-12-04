import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactItemComponent } from './transact-item.component';

describe('TransactItemComponent', () => {
  let component: TransactItemComponent;
  let fixture: ComponentFixture<TransactItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactItemComponent]
    });
    fixture = TestBed.createComponent(TransactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
