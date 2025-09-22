import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelhoresclientesComponent } from './melhoresclientes.component';

describe('MelhoresclientesComponent', () => {
  let component: MelhoresclientesComponent;
  let fixture: ComponentFixture<MelhoresclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MelhoresclientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MelhoresclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
