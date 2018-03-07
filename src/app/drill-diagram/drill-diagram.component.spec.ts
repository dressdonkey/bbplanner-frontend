import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillDiagramComponent } from './drill-diagram.component';

describe('DrillDiagramComponent', () => {
  let component: DrillDiagramComponent;
  let fixture: ComponentFixture<DrillDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
