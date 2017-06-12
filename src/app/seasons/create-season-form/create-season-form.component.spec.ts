import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeasonFormComponent } from './create-season-form.component';

describe('CreateSeasonFormComponent', () => {
  let component: CreateSeasonFormComponent;
  let fixture: ComponentFixture<CreateSeasonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSeasonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSeasonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
