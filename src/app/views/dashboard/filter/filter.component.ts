import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ESFilter} from './ESFilter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterOptions: string[] = [];
  @Input() quickFilters: ESFilter[];

  @Output() filtersChanged: EventEmitter<ESFilter[]> = new EventEmitter();

  activeFilters: ESFilter[] = [];
  newFilter = new ESFilter();

  showAddFilter = false;

  constructor() {
  }

  ngOnInit() {
  }

  onAddActiveFilter() {
    if (!this.newFilter.isValid()) {
      return;
    }

    if (!this.activeFilters.includes(this.newFilter)) {
      this.activeFilters.push(this.newFilter);
    }

    this.filtersChanged.emit(this.activeFilters);
    this.newFilter = new ESFilter();
  }

  onRemoveActiveFilter(index) {
    this.activeFilters.splice(index, 1);
    this.filtersChanged.emit(this.activeFilters);
  }
}

