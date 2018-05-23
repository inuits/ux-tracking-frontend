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
    actions = [];

    constructor(@Inject(HttpClient) private httpclient) {
    }

    ngOnInit() {
        // fetch the actions
        this.httpclient.get('http://localhost:5000/action/for/' + this.error['_id'],
            {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                })
            }).toPromise().then(res => {
            this.actions = res as Array<Object>;
        });
    }


    getErrorHighlightContent() {
        try {
            return JSON.stringify(JSON.parse(this.error['_source']['stack']), null, ' ');
        } catch (e) {
        }

        return this.error['_source']['stack'];
    }
}
