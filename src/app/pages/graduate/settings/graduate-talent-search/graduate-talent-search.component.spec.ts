import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateTalentSearchComponent } from './graduate-talent-search.component';

describe('GraduateTalentSearchComponent', () => {
  let component: GraduateTalentSearchComponent;
  let fixture: ComponentFixture<GraduateTalentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduateTalentSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateTalentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
