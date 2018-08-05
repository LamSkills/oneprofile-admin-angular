import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

let component:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & AppModule', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [ AppModule ]
        })

        // Get rid of app's Router configuration otherwise many failures.
        // Doing so removes Router declarations; add the Router stubs
        .overrideModule(AppModule, {
            remove: {
                imports: [ AppRoutingModule ]
            },
            add: {
                declarations: [ AppComponent, RouterOutletStubComponent ]
            }
        })

        .compileComponents()

        .then(() => {
            fixture = TestBed.createComponent(AppComponent);
            component    = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    tests();

});


function tests() {

    it('should create the app', async(() => {
        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Oneprofile'`, async(() => {
        fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Oneprofile');
    }));

    it('should render title in a h1 tag', async(() => {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.query(By.css('#top-title'));
        expect(compiled.nativeElement.textContent).toBe('Oneprofile');
    }));
}
