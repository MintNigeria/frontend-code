import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchTalentComponent } from './new-search-talent.component';

describe('NewSearchTalentComponent', () => {
  let component: NewSearchTalentComponent;
  let fixture: ComponentFixture<NewSearchTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSearchTalentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSearchTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
