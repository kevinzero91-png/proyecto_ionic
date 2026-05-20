import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaDetallePage } from './categoria-detalle.page';

describe('CategoriaDetallePage', () => {
  let component: CategoriaDetallePage;
  let fixture: ComponentFixture<CategoriaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
