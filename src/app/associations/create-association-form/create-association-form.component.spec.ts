import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssociationFormComponent } from './create-association-form.component';

describe('CreateAssociationFormComponent', () => {
  let component: CreateAssociationFormComponent;
  let fixture: ComponentFixture<CreateAssociationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssociationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssociationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
