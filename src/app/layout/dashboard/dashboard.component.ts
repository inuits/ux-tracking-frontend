import {Component, Injectable, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    errors = [
        // {
        //     'error': 'This is an error',
        //     'position': '79,5',
        //     'source': 'lib/ux-ttrackinaga;dfj.js',
        //     'stack': 'STACKTRACEEEEE',
        //     'timestamp': 1526040778063
        // },
    ];

    headers: HttpHeaders;

    @Injectable()
    constructor(private client: HttpClient) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.client.get('https://silent-fish-60.localtunnel.me/error', {
            headers: new HttpHeaders({
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjYwNDM0ODMsIm5iZiI6MTUyNjA0MzQ4MywianRpIjoiMmU0OTgxZmUtNjkwZC00MWI3LWJlODUtYzVhMTg3NWMzYWVhIiwiZXhwIjoxNTI2MDQ0MzgzLCJpZGVudGl0eSI6InNwb3J0b2ZmaWNlIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.PZp44jXXEhao_hZsGsFbzHizvtW0OTqFEHXeN_9tCTY'
            })
        }).toPromise().then(res => this.errors = res);
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
