import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ESFilter} from '../filter/ESFilter';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  @Input() pageLimit = 10;

  @Input() filterOptions: string[] = ['client', 'id', 'method', 'path', 'session', 'value', 'timestamp'];
  @Input() quickFilters: ESFilter[] = [
    new ESFilter('method', 'exclude', 'REQ'),
    new ESFilter('client', 'include', 'sportoffice'),
    new ESFilter('session', 'include', 'uxtracker'),
  ];
  activeFilters: ESFilter[] = [];

  totalErrors = 0;
  errors = Array<Error>();

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(@Inject(HttpClient) private httpClient) {
  }

  ngOnInit() {

    this.loadPage(0);

  }

  setPageLimit(amount) {
    this.pageLimit = amount;
    this.loadPage(0);
  }

  loadPage(page) {
    this.httpClient.get('https://localhost:5000/error?limit=' + this.pageLimit + '&from=' + page * this.pageLimit, {
      'headers': this.httpHeaders
    })
      .subscribe((res) => {

        this.totalErrors = res != null ? res['total'] : 0;
        this.errors = res != null ? res['hits'] : 0;
      });
  }

}
