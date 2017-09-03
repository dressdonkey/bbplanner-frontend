import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerFotoComponent } from './edit-player-foto.component';

describe('EditPlayerFotoComponent', () => {
  let component: EditPlayerFotoComponent;
  let fixture: ComponentFixture<EditPlayerFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlayerFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlayerFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
