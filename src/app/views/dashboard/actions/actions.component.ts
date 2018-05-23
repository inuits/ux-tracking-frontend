import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../domain/Action';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

    @Input() pageLimit = 10;

    @Input() set actions(val: Action[]) {
        this.amountOfActions = val.length;

        while (val.length > 0) {
            this.pages.push(val.splice(0, this.pageLimit));
        }
    }

    pages = [];
    selectedPage = 0;
    amountOfActions = 0;

    constructor() {
    }

    ngOnInit() {

    }

}
