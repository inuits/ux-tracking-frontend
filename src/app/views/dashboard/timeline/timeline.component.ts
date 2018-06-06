import {Component, Inject, OnInit, AfterContentInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  allActions = [];


  constructor(@Inject(HttpClient) private httpClient) {
  }

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(page) {
    this.httpClient.get('https://localhost:5000/action',
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }).toPromise().then(res => {
      this.allActions = res['hits'] as Array<Object>;
    });
  }

}
