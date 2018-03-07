import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDrillComponent } from './delete-drill.component';

describe('DeleteDrillComponent', () => {
  let component: DeleteDrillComponent;
  let fixture: ComponentFixture<DeleteDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
