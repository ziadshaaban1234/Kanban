import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, FormsModule, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});