import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociationLogoComponent } from './edit-association-logo.component';

describe('EditAssociationLogoComponent', () => {
  let component: EditAssociationLogoComponent;
  let fixture: ComponentFixture<EditAssociationLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssociationLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociationLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
