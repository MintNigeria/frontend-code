import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSearchPoolComponent } from './talent-search-pool.component';

describe('TalentSearchPoolComponent', () => {
  let component: TalentSearchPoolComponent;
  let fixture: ComponentFixture<TalentSearchPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSearchPoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentSearchPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
