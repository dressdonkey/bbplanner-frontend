import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrillFormComponent } from './create-drill-form.component';

describe('CreateDrillFormComponent', () => {
  let component: CreateDrillFormComponent;
  let fixture: ComponentFixture<CreateDrillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDrillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
