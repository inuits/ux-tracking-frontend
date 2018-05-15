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

    let output = '';

    if (object.parent) {
      output += this.createOpenTag(object.parent) + '\n';
    }

    output += this.createOpenTag(object);

    if (object.value) {
      output += object.value;
    }

    output += this.createCloseTag(object);

    if (object.parent) {
      output += '\n' + this.createCloseTag(object.parent);
    }

    return output;
  }

  private createOpenTag(object) {
    let output = '';

    if (object.parent) {
      output += '  ';
    }

    output += '<' + object.type.toLowerCase() + ' ';

    if (object.id) {
      output += 'id="' + object.id + '" ';
    }

    if (object.class) {
      output += 'class="' + object.class + '" ';
    }

    return output + '>';
  }

  private createCloseTag(object) {
    return '</' + object.type.toLowerCase() + '>';
  }

  // <!--&lt;{{ action._source.parent.type }}-->
  // <!--<span *ngIf="action._source.parent.id">id="{{action._source.parent.id}}"</span>-->
  // <!--<span *ngIf="action._source.parent.class">class="{{action._source.parent.class}}"</span>-->
  // <!--&gt; <br/>-->
  // <!---->
  // <!--&lt;{{ action._source.type | lowercase }}-->
  // <!--<span *ngIf="action._source.id">id="{{action._source.id}}"</span>-->
  // <!--<span *ngIf="action._source.class">class="{{action._source.class}}"</span>-->
  // <!--&gt; {{ action._source.value }} &lt;/{{ action._source.type | lowercase }}&gt;-->
  // <!---->
  // <!--<br/>-->
  // <!---->
  // <!--&lt;/{{ action._source.parent.type }}&gt;-->
}
