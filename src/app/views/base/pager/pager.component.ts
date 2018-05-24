import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() pageLimit = 0;
  @Input() amount = 0;

  pageSelected = 0;
  showLimit = 5;

  @Output() pageClick: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  pageTotal() {
    return Math.ceil(this.amount / this.pageLimit);
  }

  pages() {

    const offset = Math.floor(this.showLimit / 2);
    const size = Math.min(this.pageTotal() - this.pageSelected + offset, this.showLimit, this.pageTotal());

    let delta = 0;
    if (this.pageSelected >= offset) {
      delta = this.pageSelected - offset;
    }

    return Array(size).fill(0).map((x, i) => i + delta);
  }

  loadPage(page) {
    this.pageSelected = page;
    this.pageClick.emit(page);
  }
}
