import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

    @Input()
    public error: Error;

    collapse = true;

    constructor(@Inject(HttpClient) private httpclient) {
    }

    ngOnInit() {
    }


    getErrorHighlightContent() {
        try {
            return JSON.stringify(JSON.parse(this.error['_source']['stack']), null, ' ');
        } catch (e) {
        }

        return this.error['_source']['stack'];
    }
}
