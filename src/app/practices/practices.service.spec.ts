import { TestBed, inject } from '@angular/core/testing';

import { PracticesService } from './practices.service';

describe('PracticesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PracticesService]
    });
  });

  it('should be created', inject([PracticesService], (service: PracticesService) => {
    expect(service).toBeTruthy();
  }));
});
