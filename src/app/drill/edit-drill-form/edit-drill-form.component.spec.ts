import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrillFormComponent } from './edit-drill-form.component';

describe('EditDrillFormComponent', () => {
  let component: EditDrillFormComponent;
  let fixture: ComponentFixture<EditDrillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDrillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
