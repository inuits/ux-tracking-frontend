import {Component, Input, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ESFilter} from '../filter/ESFilter';
import {ApiService} from '../../../core/services/api.service';

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
  errors: Error[];

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

    this.loadPage(0);

  }

  setPageLimit(amount) {
    this.pageLimit = amount;
    this.loadPage(0);
  }

  loadPage(page) {
    this.apiService.getErrors(['limit=' + this.pageLimit, 'from=' + page * this.pageLimit]).subscribe(
      response => {
        this.totalErrors = response.total;
        this.errors = response.objects;
      }
    );
  }
}
