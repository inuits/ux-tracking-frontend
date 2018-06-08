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
    this.httpclient.get('https://localhost:5000/action',
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }).toPromise().then(res => {
      this.actions = res != null ? res['hits'] as Array<Object> : [];
    });
  }
}
