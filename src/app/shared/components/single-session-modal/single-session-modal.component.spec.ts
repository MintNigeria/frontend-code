import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSessionModalComponent } from './single-session-modal.component';

describe('SingleSessionModalComponent', () => {
  let component: SingleSessionModalComponent;
  let fixture: ComponentFixture<SingleSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSessionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
