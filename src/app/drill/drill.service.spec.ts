import { TestBed, inject } from '@angular/core/testing';

import { DrillService } from './drill.service';

describe('DrillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrillService]
    });
  });

  it('should be created', inject([DrillService], (service: DrillService) => {
    expect(service).toBeTruthy();
  }));
});
