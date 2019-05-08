import { TestBed } from '@angular/core/testing';

import { ClazzService } from './clazz.service';

describe('ClazzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClazzService = TestBed.get(ClazzService);
    expect(service).toBeTruthy();
  });
});
