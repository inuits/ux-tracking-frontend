import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    @Input() pageLimit = 10;

    @Input() set errors(val: Error[]) {
        this.pages = [];

        this.amountOfErrors = val.length;
        while (val.length > 0) {
            this.pages.push(val.splice(0, this.pageLimit));
        }
    }

    amountOfErrors = 0;
    pages = [];
    pageSelected = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
