import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAssociationComponent } from './delete-association.component';

describe('DeleteAssociationComponent', () => {
  let component: DeleteAssociationComponent;
  let fixture: ComponentFixture<DeleteAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
