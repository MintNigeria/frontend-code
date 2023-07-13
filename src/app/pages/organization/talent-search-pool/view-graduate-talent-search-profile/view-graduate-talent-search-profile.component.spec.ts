import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGraduateTalentSearchProfileComponent } from './view-graduate-talent-search-profile.component';

describe('ViewGraduateTalentSearchProfileComponent', () => {
  let component: ViewGraduateTalentSearchProfileComponent;
  let fixture: ComponentFixture<ViewGraduateTalentSearchProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGraduateTalentSearchProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGraduateTalentSearchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
