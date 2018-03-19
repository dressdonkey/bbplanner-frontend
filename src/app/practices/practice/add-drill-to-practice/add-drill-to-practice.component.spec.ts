import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrillToPracticeComponent } from './add-drill-to-practice.component';

describe('AddDrillToPracticeComponent', () => {
  let component: AddDrillToPracticeComponent;
  let fixture: ComponentFixture<AddDrillToPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDrillToPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrillToPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
