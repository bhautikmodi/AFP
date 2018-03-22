import { TestBed, inject } from '@angular/core/testing';

import { CourcelevelService } from './courcelevel.service';

describe('CourcelevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourcelevelService]
    });
  });

  it('should be created', inject([CourcelevelService], (service: CourcelevelService) => {
    expect(service).toBeTruthy();
  }));
});
