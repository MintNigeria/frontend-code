import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyUseVacComponent } from './why-use-vac.component';

describe('WhyUseVacComponent', () => {
  let component: WhyUseVacComponent;
  let fixture: ComponentFixture<WhyUseVacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyUseVacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyUseVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
