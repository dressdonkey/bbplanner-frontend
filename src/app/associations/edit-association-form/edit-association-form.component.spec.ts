import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociationFormComponent } from './edit-association-form.component';

describe('EditAssociationFormComponent', () => {
  let component: EditAssociationFormComponent;
  let fixture: ComponentFixture<EditAssociationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssociationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
