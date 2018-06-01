import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ESFilter} from '../ESFilter';

@Component({
  selector: 'app-filter-badge',
  templateUrl: './filter-badge.component.html',
  styleUrls: ['./filter-badge.component.scss']
})
export class FilterBadgeComponent implements OnInit {

  @Input() filter: ESFilter;
  @Output() filterClick: EventEmitter<ESFilter> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
