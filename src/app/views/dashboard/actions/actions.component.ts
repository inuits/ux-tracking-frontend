import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() pageLimit = 10;
  @Input() forError: string = null;

  totalActions = 0;
  actions = [];

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });


  constructor(@Inject(HttpClient) private httpClient) {
  }

  ngOnInit() {
    this.loadPage(0);
  }

  setPageLimit(amount, pager) {
    this.pageLimit = amount;
    pager.loadPage(0);
  }

  loadPage(page) {
    let url = 'https://localhost:5000/action';

    if (this.forError !== null) {
      url += '/for/' + this.forError;
    }

    url += '?limit=' + this.pageLimit + '&from=' + page * this.pageLimit;

    if (this.forError !== null) {
      url += '&reverse=true';
    }

    this.httpClient.get(url, {
      'headers': this.httpHeaders
    }).subscribe((res) => {
      this.totalActions = res['total'];
      this.actions = res['hits'];
    });
  }


}
