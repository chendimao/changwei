import { TestBed, inject } from '@angular/core/testing';

import { TabCommonService } from './tab-common.service';

describe('TabCommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabCommonService]
    });
  });

  it('should be created', inject([TabCommonService], (service: TabCommonService) => {
    expect(service).toBeTruthy();
  }));
});
