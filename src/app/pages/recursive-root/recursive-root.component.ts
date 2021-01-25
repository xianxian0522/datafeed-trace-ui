import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-recursive-root]',
  templateUrl: './recursive-root.component.html',
  styleUrls: ['./recursive-root.component.scss']
})
export class RecursiveRootComponent implements OnInit {

  constructor() { }

  @Input() treeData;

  ngOnInit(): void {
  }

  counter(i: number): any {
    return new Array(i);
  }
}
