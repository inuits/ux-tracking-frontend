import {Component, Inject, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    errors = [];
    actions = [];
    httpHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    error = {
        show: false,
        error: [],
        actions: []
    };

    showError(error) {
        this.error = {
            show: true,
            error: error,
            actions: []
        };

        this.httpclient.get('http://localhost:5000/action/for/' + error._id,
            {headers: this.httpHeaders}).toPromise().then(res => {
            this.error.actions = res as Array<Object>;
        });
    }

    constructor(@Inject(HttpClient) private httpclient: HttpClient) {
    }

    ngOnInit(): void {
        this.httpclient.post('http://localhost:5000/auth', {
            'name': 'sportoffice',
            'key': 'fea2d9945b592ee9e14c3e3ffdc4cf74'
        }).toPromise().then(res => {
            this.httpHeaders = new HttpHeaders({Authorization: 'Bearer ' + res['access_token']});
            localStorage.setItem('token', res['access_token']);
            this.fetchErrors();
            this.fetchActions();
        });
    }

    fetchErrors() {
        this.httpclient.get('http://localhost:5000/error', {
            'headers': this.httpHeaders
        }).toPromise().then(res => {
            this.errors = res as Array<Object>;

            if (this.errors.length > 0) {
                this.showError(res[0]);
            }
        });
    }

    fetchActions() {
        this.httpclient.get('http://localhost:5000/action', {
            'headers': this.httpHeaders
        }).toPromise().then(res => {
            this.actions = res as Array<Object>;
        });
    }


}
