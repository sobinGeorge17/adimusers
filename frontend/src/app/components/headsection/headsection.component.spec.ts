import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsectionComponent } from './headsection.component';

describe('HeadsectionComponent', () => {
  let component: HeadsectionComponent;
  let fixture: ComponentFixture<HeadsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
