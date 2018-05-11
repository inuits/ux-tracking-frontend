import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-errorlist',
    templateUrl: './errorlist.component.html',
    styleUrls: ['./errorlist.component.scss']
})
export class ErrorlistComponent implements OnInit {

    @Input()
    errors;

    constructor() {
    }


    ngOnInit() {
    }

}
