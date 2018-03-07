import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiagrmaFromDrillComponent } from './delete-diagrma-from-drill.component';

describe('DeleteDiagrmaFromDrillComponent', () => {
  let component: DeleteDiagrmaFromDrillComponent;
  let fixture: ComponentFixture<DeleteDiagrmaFromDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDiagrmaFromDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDiagrmaFromDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
