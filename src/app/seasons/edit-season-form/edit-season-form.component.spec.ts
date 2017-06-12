import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeasonFormComponent } from './edit-season-form.component';

describe('EditSeasonFormComponent', () => {
  let component: EditSeasonFormComponent;
  let fixture: ComponentFixture<EditSeasonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSeasonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeasonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
