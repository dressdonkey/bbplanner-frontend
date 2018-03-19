import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDrillFromPracticeComponent } from './delete-drill-from-practice.component';

describe('DeleteDrillFromPracticeComponent', () => {
  let component: DeleteDrillFromPracticeComponent;
  let fixture: ComponentFixture<DeleteDrillFromPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDrillFromPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDrillFromPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
