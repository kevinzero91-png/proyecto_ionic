import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaCrearPage } from './categoria-crear.page';

describe('CategoriaCrearPage', () => {
  let component: CategoriaCrearPage;
  let fixture: ComponentFixture<CategoriaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
