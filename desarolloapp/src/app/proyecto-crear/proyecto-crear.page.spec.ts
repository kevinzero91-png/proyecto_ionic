import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProyectoCrearPage } from './proyecto-crear.page';

describe('ProyectoCrearPage', () => {
  let component: ProyectoCrearPage;
  let fixture: ComponentFixture<ProyectoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
