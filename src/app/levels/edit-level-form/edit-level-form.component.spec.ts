import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLevelFormComponent } from './edit-level-form.component';

describe('EditLevelFormComponent', () => {
  let component: EditLevelFormComponent;
  let fixture: ComponentFixture<EditLevelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLevelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
