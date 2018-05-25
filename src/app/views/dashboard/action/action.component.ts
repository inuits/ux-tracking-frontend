import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input()
  public action = {};

  collapse = true;

  constructor() {
  }

  ngOnInit() {
  }


  createHTML(object) {
    return JSON.stringify(object, null, ' ');
  }


  getActionColor(action) {
    switch (action._source.method.toLowerCase()) {
      case 'req':
        return 'warning';
      case 'click':
      default:
        return 'info';
    }
  }
}
