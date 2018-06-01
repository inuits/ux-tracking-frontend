import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  actions = [];
  testActions = [];

  @Input()
  public error: Error;

  collapse = true;

  constructor(@Inject(HttpClient) private httpclient) {
  }

  ngOnInit() {
    this.fetchActionsForError();
  }


  getErrorHighlightContent() {
    try {
      return JSON.stringify(JSON.parse(this.error['_source']['stack']), null, ' ');
    } catch (e) {
    }

    return this.error['_source']['stack'];
  }

  fetchActionsForError() {
    this.httpclient.get('https://localhost:5000/action?error_id=' + this.error['_id'],
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }).toPromise().then(res => {
      this.actions = res['hits'] as Array<Object>;
    });
  }

  makeCypressTest() {
    this.testActions = [];
    this.actions.reverse();
    this.testActions.push('describe(\'Sportoffice login\', function () {\n' +
      '    it("Gets, types and asserts", function () {');
    const url = 'https://sportoase-multi-uat.inuits.eu' + this.actions[0]._source.path;
    this.testActions.push('cy.visit(\'' + url + '\');');
    for (const action of this.actions) {

      if (action._source.method.toLowerCase() !== 'req') {
        if (action._source.method === 'focusout') {
          this.testActions.push('cy.get(\'' + action._source.tree + '\').type(\'' + action._source.value + '\').should(\'have.value\', \''
            + action._source.value + '\');');
        } else {
          this.testActions.push('cy.get(\'' + action._source.tree + '\').click();');
        }
      }

    }

    this.testActions.push('});\n});');

    saveAs(new Blob([this.testActions.join('\n')], {type: 'text'}), 'cypressTest.js');
  }
}
