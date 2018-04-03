import { TestBed, inject } from '@angular/core/testing';

import { FindcompanyService } from './findcompany.service';

describe('FindcompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindcompanyService]
    });
  });

  it('should be created', inject([FindcompanyService], (service: FindcompanyService) => {
    expect(service).toBeTruthy();
  }));
});
