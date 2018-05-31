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
  @Input() activeFilters: ESFilter[] = [];

  @Output() filtersChanged: EventEmitter<ESFilter[]> = new EventEmitter();

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

    let containsFilterAlready = false;
    this.activeFilters.forEach((filter) => {
      if (filter.sameAs(this.newFilter)) {
        containsFilterAlready = true;
      }
    });

    if (!containsFilterAlready) {
      this.activeFilters.push(this.newFilter);
      this.filtersChanged.emit(this.activeFilters);
      this.newFilter = new ESFilter();
    }
  }

  onRemoveActiveFilter(index) {
    this.activeFilters.splice(index, 1);
    this.filtersChanged.emit(this.activeFilters);
  }
}

