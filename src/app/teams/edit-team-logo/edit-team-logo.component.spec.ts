import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamLogoComponent } from './edit-team-logo.component';

describe('EditTeamLogoComponent', () => {
  let component: EditTeamLogoComponent;
  let fixture: ComponentFixture<EditTeamLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeamLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
