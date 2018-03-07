import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagramNoteComponent } from './edit-diagram-note.component';

describe('EditDiagramNoteComponent', () => {
  let component: EditDiagramNoteComponent;
  let fixture: ComponentFixture<EditDiagramNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiagramNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagramNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
