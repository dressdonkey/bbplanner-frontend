import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlayerFormComponent } from './create-player-form.component';

describe('CreatePlayerFormComponent', () => {
  let component: CreatePlayerFormComponent;
  let fixture: ComponentFixture<CreatePlayerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlayerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
