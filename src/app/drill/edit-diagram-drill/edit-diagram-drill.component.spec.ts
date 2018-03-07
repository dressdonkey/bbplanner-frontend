import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagramDrillComponent } from './edit-diagram-drill.component';

describe('EditDiagramDrillComponent', () => {
  let component: EditDiagramDrillComponent;
  let fixture: ComponentFixture<EditDiagramDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiagramDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagramDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
