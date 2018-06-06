import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ESFilter} from '../filter/ESFilter';
import {saveAs} from 'file-saver';

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

  getActionsForTest() {
    this.checkFilters();

    this.httpClient.get('https://localhost:5000/action?' + ESFilter.createQueryParams(this.activeFilters) + '',
      {
        headers: this.httpHeaders
      }).toPromise().then(res => {
      this.createCypressTest(res['hits'] as Array<Object>);
    });
  }

  checkFilters() {
    let bool = false;
    for (const filter of this.activeFilters) {
      if (filter['value'].toLowerCase() === 'req' && filter['includes'] === 'include') {
        filter['includes'] = 'exclude';
        bool = true;
      } else if (filter['value'].toLowerCase() === 'req') {
        return;
      }
    }

    if (bool === false) {
      this.activeFilters.push(new ESFilter('method', 'exclude', 'REQ'));
    }
  }

  createCypressTest(testActions) {
    testActions.reverse();
    const cypressActions = [];
    cypressActions.push('describe(\'Sportoffice login\', function () {\n' +
      '    it("Gets, types and asserts", function () {');
    const url = 'https://sportoase-multi-uat.inuits.eu' + testActions[0]._source.path;
    cypressActions.push('cy.visit(\'' + url + '\');');
    for (const action of testActions) {

      if (action._source.tree === '') {
        cypressActions.push('cy.get(\'' + action._source.type + '\').contains(\'' + action._source.value + '\').click();');
      } else {
        if (action._source.method === 'focusout') {
          if (action._source.value !== '') {
            cypressActions.push('cy.get(\'' + action._source.tree + '\').type(\'' +
              action._source.value + '\').should(\'have.value\', \'' + action._source.value + '\');');
          } else {
            cypressActions.push('cy.get(\'' + action._source.tree + '\');');
          }
        } else {
          cypressActions.push('cy.get(\'' + action._source.tree + '\').click();');
        }
      }
    }

    cypressActions.push('});\n});');

    if (cypressActions !== []) {
      saveAs(new Blob([cypressActions.join('\n')], {type: 'text'}), 'cypressTest.js');
    }
  }
}
