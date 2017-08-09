import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLevelFormComponent } from './create-level-form.component';

describe('CreateLevelFormComponent', () => {
  let component: CreateLevelFormComponent;
  let fixture: ComponentFixture<CreateLevelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLevelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
