import { TestBed } from '@angular/core/testing';

import { Prioridad } from './prioridad';

describe('Prioridad', () => {
  let service: Prioridad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prioridad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
