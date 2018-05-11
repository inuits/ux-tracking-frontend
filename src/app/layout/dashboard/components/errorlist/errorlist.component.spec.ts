import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorlistComponent} from './errorlist.component';

describe('ErrorlistComponent', () => {
    let component: ErrorlistComponent;
    let fixture: ComponentFixture<ErrorlistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorlistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
