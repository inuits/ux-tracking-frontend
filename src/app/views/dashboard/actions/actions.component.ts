import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ESFilter} from '../filter/ESFilter';
import {saveAs} from 'file-saver';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() pageLimit = 10;
  @Input() filterOptions: string[] = ['client', 'id', 'method', 'path', 'position', 'session', 'type', 'value', 'timestamp'];
  @Input() quickFilters: ESFilter[] = [
    new ESFilter('method', 'exclude', 'REQ'),
    new ESFilter('client', 'include', 'sportoffice'),
    new ESFilter('method', 'include', 'focusout'),
    new ESFilter('method', 'include', 'click'),
    new ESFilter('session', 'include', 'uxtracker'),
  ];
  activeFilters: ESFilter[] = [];

  totalActions = 0;
  actions = [];
  private reverse = false;
  private httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  // TODO remove
  cyUrl: string = 'https://sportoase-multi-uat.inuits.eu';

  constructor(@Inject(HttpClient) private httpClient) {
  }

  @Input() set error(value) {
    if (this.activeFilters == null) {
      this.activeFilters = [];
    }

    this.activeFilters.push(new ESFilter('client', 'include', value._source.client, false));
    this.activeFilters.push(new ESFilter('session', 'include', value._source.session, false));
    this.activeFilters.push(new ESFilter('timestamp', 'include', '<' + value._source.timestamp, false));

    this.reverse = true;
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
    params.push('reverse=' + this.reverse);

    if (this.activeFilters) {
      params.push(ESFilter.createQueryParams(this.activeFilters));
    }

    url += '?' + params.join('&');

    this.httpClient.get(url, {
      'headers': this.httpHeaders
    }).subscribe((res) => {
      this.totalActions = res != null ? res['total'] : 0;
      this.actions = res != null ? res['hits'] : [];
    });
  }

  getActionsForTest(filtersComponent: FilterComponent) {
    this.checkFilters(filtersComponent);

    this.httpClient.get('https://localhost:5000/action?reverse=true&' + ESFilter.createQueryParams(this.activeFilters) + '',
      {
        headers: this.httpHeaders
      }).toPromise().then(res => {
      if (res != null) {
        this.createCypressTest(res['hits'] as Array<Object>);
      } else {
        alert('Oops! Seems like there is no response from the server..');
      }
    });
  }

  checkFilters(filtersComponent: FilterComponent) {
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
      filtersComponent.setNewFilter(new ESFilter('method', 'exclude', 'req'));
    }
  }

  createCypressTest(testActions) {
    const cypressActions = [];
    cypressActions.push('describe(\'Automatic Cypress Test\', function () {\n' +
      '    it("' + testActions[0]._source.timestamp + '", function () {');

    const url = this.cyUrl + testActions[0]._source.path;

    cypressActions.push('cy.visit("' + url + '");');
    cypressActions.push('cy.pause()');

    if (url.toLowerCase().indexOf('login') < 0) {
      cypressActions.push('cy.visit("' + url + '");');
    }

    for (const action of testActions) {

      if (action._source.path.toLowerCase().indexOf('login')) {

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
    }

    cypressActions.push('});\n});');

    if (cypressActions !== []) {
      saveAs(new Blob([cypressActions.join('\n')], {type: 'text'}), 'cypressTest.js');
    }
  }
}
