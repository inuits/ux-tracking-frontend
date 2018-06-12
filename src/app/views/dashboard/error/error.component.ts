import {Component, Input, OnInit} from '@angular/core';
import {saveAs} from 'file-saver';
import {ApiService} from '../../../core/services/api.service';
import {Action} from '../../../domain/Action';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input()
  public error: Error;
  actions: Action[];

  collapse = true;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.fetchActionsForError();
  }


  getErrorHighlightContent() {
    try {
      return JSON.stringify(JSON.parse(this.error.stack), null, ' ');
    } catch (e) {
    }

    return this.error.stack;
  }

  fetchActionsForError() {
    this.apiService.getActions(['reverse=true']).subscribe(
      response => {
        this.actions = response.objects;
      }
    );
  }
}
