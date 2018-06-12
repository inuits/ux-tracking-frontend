import {Component, Input, OnInit} from '@angular/core';
import {ESFilter} from '../filter/ESFilter';
import {saveAs} from 'file-saver';
import {FilterComponent} from '../filter/filter.component';
import {ApiService} from '../../../core/services/api.service';
import {Action} from '../../../domain/Action';

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
  actions: Action[];
  // TODO remove
  cyUrl: string = 'https://sportoase-multi-uat.inuits.eu';
  private reverse = false;

  constructor(private apiService: ApiService) {
  }

  @Input() set error(value) {
    if (this.activeFilters == null) {
      this.activeFilters = [];
    }

    this.activeFilters.push(new ESFilter('client', 'include', value.client, false));
    this.activeFilters.push(new ESFilter('session', 'include', value.session, false));
    this.activeFilters.push(new ESFilter('timestamp', 'include', '<' + value.timestamp, false));

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
    const params = [];

    params.push('limit=' + this.pageLimit);
    params.push('from=' + page * this.pageLimit);
    params.push('reverse=' + this.reverse);

    if (this.activeFilters) {
      params.push(ESFilter.createQueryParams(this.activeFilters));
    }

    this.apiService.getActions(params).subscribe(response => {
      this.totalActions = response.total;
      this.actions = response.objects;
    });
  }

  getActionsForTest(filtersComponent: FilterComponent) {
    this.checkFilters(filtersComponent);

    const params = ESFilter.createQueryParams(this.activeFilters);
    params.push('reverse=true');

    this.apiService.getActions(params).subscribe(
      res => {
        this.createCypressTest(res.objects);
      }
    );
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
      '    it("' + testActions[0].timestamp + '", function () {');

    const url = this.cyUrl + testActions[0].path;

    cypressActions.push('cy.visit("' + url + '");');
    cypressActions.push('cy.pause();');

    if (url.toLowerCase().indexOf('login') < 0) {
      cypressActions.push('cy.visit("' + url + '");');
    }

    for (const action of testActions) {

      if (action.path.toLowerCase().indexOf('login')) {

        if (action.tree === '') {
          cypressActions.push('cy.get(\'' + action.type + '\').contains(\'' + action.value + '\').click();');
        } else {
          if (action.method === 'focusout') {
            if (action.value !== '') {
              cypressActions.push('cy.get(\'' + action.tree + '\').type(\'' +
                action.value + '\').should(\'have.value\', \'' + action.value + '\');');
            } else {
              cypressActions.push('cy.get(\'' + action.tree + '\');');
            }
          } else {
            cypressActions.push('cy.get(\'' + action.tree + '\').click();');
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
