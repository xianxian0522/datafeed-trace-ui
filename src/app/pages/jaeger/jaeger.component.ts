import { Component, OnInit } from '@angular/core';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-jaeger',
  templateUrl: './jaeger.component.html',
  styleUrls: ['./jaeger.component.scss']
})
export class JaegerComponent implements OnInit {

  constructor(private nzContextMenuService: NzContextMenuService) { }

  activatedNode?: NzTreeNode;
  nodes = [
    {
      title: 'parent 0',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];
  isShow = false;
  isShowContent = false;

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    console.log(data, 'tree');
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node;
    console.log(data, data.node, 'activeNode');
    this.isShow = !this.isShow;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
    console.log('sss', $event);
  }

  selectDropdown(): void {
    // do something
    console.log('selectDropdown');
  }

  ngOnInit(): void {
  }

  showNode(): void {
    this.isShow = !this.isShow;
  }
  showNodeContent(): void {
    this.isShowContent = !this.isShowContent;
  }
}
