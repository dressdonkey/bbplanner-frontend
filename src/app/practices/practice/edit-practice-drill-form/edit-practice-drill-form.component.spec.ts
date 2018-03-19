import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPracticeDrillFormComponent } from './edit-practice-drill-form.component';

describe('EditPracticeDrillFormComponent', () => {
  let component: EditPracticeDrillFormComponent;
  let fixture: ComponentFixture<EditPracticeDrillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPracticeDrillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPracticeDrillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
