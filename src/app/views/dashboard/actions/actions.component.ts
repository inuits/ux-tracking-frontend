import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ESFilter} from '../filter/ESFilter';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() pageLimit = 10;

  // @Input() forError: string = null;

  @Input() set forError(value) {
    if (this.activeFilters == null) {
      this.activeFilters = [];
    }

    this.activeFilters.push(new ESFilter('error_id', 'include', value, false));
  }

  @Input() filterOptions: string[] = ['client', 'id', 'method', 'path', 'position', 'session', 'type', 'value'];
  @Input() quickFilters: ESFilter[] = [
    new ESFilter('method', 'exclude', 'REQ'),
    new ESFilter('client', 'include', 'sportoffice'),
    new ESFilter('method', 'include', 'focusout'),
    new ESFilter('method', 'include', 'click'),
    new ESFilter('session', 'include', 'admin'),
  ];

  totalActions = 0;
  actions = [];
  activeFilters: ESFilter[] = [];

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

    const params = [];

    params.push('limit=' + this.pageLimit);
    params.push('from=' + page * this.pageLimit);

    if (this.activeFilters) {
      params.push(ESFilter.createQueryParams(this.activeFilters));
    }

    url += '?' + params.join('&');

    this.httpClient.get(url, {
      'headers': this.httpHeaders
    }).subscribe((res) => {
      this.totalActions = res['total'];
      this.actions = res['hits'];
    });
  }
}
