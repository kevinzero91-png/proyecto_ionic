import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaCrearPage } from './tarea-crear.page';

describe('TareaCrearPage', () => {
  let component: TareaCrearPage;
  let fixture: ComponentFixture<TareaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
