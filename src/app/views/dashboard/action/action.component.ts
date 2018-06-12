import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../domain/Action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input()
  public action: Action;

  collapse = true;

  constructor() {
  }

  ngOnInit() {
  }


  createHTML(object) {
    return JSON.stringify(object, null, ' ');
  }


  getActionColor(action) {
    switch (action.method.toLowerCase()) {
      case 'req':
        return 'warning';
      case 'click':
      default:
        return 'info';
    }
  }
}
