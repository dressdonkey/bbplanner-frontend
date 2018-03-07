import { TestBed, inject } from '@angular/core/testing';

import { DrillDiagramService } from './drill-diagram.service';

describe('DrillDiagramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrillDiagramService]
    });
  });

  it('should be created', inject([DrillDiagramService], (service: DrillDiagramService) => {
    expect(service).toBeTruthy();
  }));
});
