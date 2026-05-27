import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaEditarPage } from './tarea-editar.page';

describe('TareaEditarPage', () => {
  let component: TareaEditarPage;
  let fixture: ComponentFixture<TareaEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
