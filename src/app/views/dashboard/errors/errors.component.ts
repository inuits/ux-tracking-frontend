import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    @Input() pageLimit = 10;

    @Input() set errors(val: Array<Object>) {
        this.pages = [];

        while (val.length > 0) {
            this.pages.push(val.splice(0, this.pageLimit));
        }
    }

    pages = [];
    pageSelected = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
