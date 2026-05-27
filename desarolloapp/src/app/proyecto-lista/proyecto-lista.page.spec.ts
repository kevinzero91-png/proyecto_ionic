import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProyectoListaPage } from './proyecto-lista.page';

describe('ProyectoListaPage', () => {
  let component: ProyectoListaPage;
  let fixture: ComponentFixture<ProyectoListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
