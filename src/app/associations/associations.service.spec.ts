import { TestBed, inject } from '@angular/core/testing';

import { AssociationsService } from './associations.service';

describe('AssociationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociationsService]
    });
  });

  it('should be created', inject([AssociationsService], (service: AssociationsService) => {
    expect(service).toBeTruthy();
  }));
});
