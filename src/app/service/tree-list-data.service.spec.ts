import { TestBed, inject } from '@angular/core/testing';

import { TreeListDataService } from './tree-list-data.service';

describe('TreeListDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeListDataService]
    });
  });

  it('should be created', inject([TreeListDataService], (service: TreeListDataService) => {
    expect(service).toBeTruthy();
  }));
});
