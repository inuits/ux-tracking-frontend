import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

    @Input() pageLimit = 10;
    @Input() set actions(val) {
        while (val.length > 0) {
            this.pages.push(val.splice(0, this.pageLimit));
        }
    }

    pages = [];
    selectedPage = 0;

    constructor() {
    }

    ngOnInit() {

    }

}
