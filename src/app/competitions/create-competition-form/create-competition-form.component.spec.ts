import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompetitionFormComponent } from './create-competition-form.component';

describe('CreateCompetitionFormComponent', () => {
  let component: CreateCompetitionFormComponent;
  let fixture: ComponentFixture<CreateCompetitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompetitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompetitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
