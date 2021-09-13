import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementaryTempalteComponent } from './elementary-tempalte.component';

describe('ElementaryTempalteComponent', () => {
  let component: ElementaryTempalteComponent;
  let fixture: ComponentFixture<ElementaryTempalteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementaryTempalteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementaryTempalteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
