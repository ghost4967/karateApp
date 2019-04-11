import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorRegisterComponent } from './competitor-register.component';

describe('CompetitorRegisterComponent', () => {
  let component: CompetitorRegisterComponent;
  let fixture: ComponentFixture<CompetitorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
