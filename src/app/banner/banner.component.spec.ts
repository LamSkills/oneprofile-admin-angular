import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture:   ComponentFixture<BannerComponent>;

  describe('beforeEach', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ BannerComponent ],
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
      });
    }));

    tests();
  });

  function tests() {
    it('should create the app', async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));

    it('should render the logo', async(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div.row>div.col-lg-12>img').alt).toContain('logo');
    }));

  }
});

