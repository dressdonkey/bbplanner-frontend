import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagramToDrillFormComponent } from './add-diagram-to-drill-form.component';

describe('AddDiagramToDrillFormComponent', () => {
  let component: AddDiagramToDrillFormComponent;
  let fixture: ComponentFixture<AddDiagramToDrillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiagramToDrillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiagramToDrillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
