import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetitionLogoComponent } from './edit-competition-logo.component';

describe('EditCompetitionLogoComponent', () => {
  let component: EditCompetitionLogoComponent;
  let fixture: ComponentFixture<EditCompetitionLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompetitionLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompetitionLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
