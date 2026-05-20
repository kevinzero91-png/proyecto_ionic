import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaListaPage } from './categoria-lista.page';

describe('CategoriaListaPage', () => {
  let component: CategoriaListaPage;
  let fixture: ComponentFixture<CategoriaListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
