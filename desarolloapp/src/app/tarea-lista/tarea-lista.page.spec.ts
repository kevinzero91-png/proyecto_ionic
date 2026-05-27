import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaListaPage } from './tarea-lista.page';

describe('TareaListaPage', () => {
  let component: TareaListaPage;
  let fixture: ComponentFixture<TareaListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
