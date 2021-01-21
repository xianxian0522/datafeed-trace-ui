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
      isShow: false,
      isShowContent: false,
      tags: [
        {
          name: 'Tags',
          tagsContent: [
            {name: 'internal.span.format', value: 'proto', isBool: false},
            {name: 'sampler.param', value: 'true', isBool: true},
            {name: 'sampler.type', value: 'const', isBool: false},
          ],
          isTags: false,
        },
        {
          name: 'Process',
          tagsContent: [
            {name: 'internal.span.format', value: 'proto', isBool: false},
            {name: 'sampler.param', value: 'true', isBool: true},
            {name: 'sampler.type', value: 'const', isBool: false},
          ],
          isTags: false,
        },
      ],
      children: [
        {
          title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true, left: '0%',
          tags: [
            {
              name: 'Tags',
              tagsContent: [
                {name: 'internal.span.format', value: 'proto', isBool: false},
                {name: 'reply', value: 'foo3Reply', isBool: false},
                {name: 'request', value: 'Hello foo3', isBool: false},
              ],
              isTags: false,
            },
            {
              name: 'Process',
              tagsContent: [
                {name: 'internal.span.format', value: 'proto', isBool: false},
                {name: 'reply', value: 'foo3Reply', isBool: false},
                {name: 'request', value: 'Hello foo3', isBool: false},
              ],
              isTags: false,
            },
          ],
        },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: false, left: '50%',
          tags: [
            {
              name: 'Tags',
              tagsContent: [
                {name: 'client-uuid', value: '6fed454859ca9374', isBool: false},
                {name: 'hostname', value: 'foo3Reply', isBool: false},
                {name: 'jaeger.version', value: 'Go-2.5.0', isBool: false},
              ],
              isTags: false,
            },
            {
              name: 'Process',
              tagsContent: [
                {name: 'client-uuid', value: '6fed454859ca9374', isBool: false},
                {name: 'hostname', value: 'foo3Reply', isBool: false},
                {name: 'jaeger.version', value: 'Go-2.5.0', isBool: false},
              ],
              isTags: false,
            },
          ],
        }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      isShow: false,
      isShowContent: false,
      tags: [
        {
          name: 'Tags',
          tagsContent: [
            {name: 'internal.span.format', value: 'proto2', isBool: false},
            {name: 'sampler.param', value: 'true', isBool: true},
            {name: 'sampler.type', value: 'const2', isBool: false},
          ],
          isTags: false,
        },
        {
          name: 'Process',
          tagsContent: [
            {name: 'internal.span.format', value: 'proto2', isBool: false},
            {name: 'sampler.param', value: 'true', isBool: true},
            {name: 'sampler.type', value: 'const2', isBool: false},
          ],
          isTags: false,
        },
      ],
      children: [
        {
          title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true, left: '50%',
          tags: [
            {
              name: 'Tags',
              tagsContent: [
                {name: 'internal.span.format', value: 'proto2', isBool: false},
                {name: 'reply', value: 'foo3Reply2', isBool: false},
                {name: 'request', value: 'Hello foo2', isBool: false},
              ],
              isTags: false,
            },
            {
              name: 'Process',
              tagsContent: [
                {name: 'internal.span.format', value: 'proto2', isBool: false},
                {name: 'reply', value: 'foo3Reply2', isBool: false},
                {name: 'request', value: 'Hello foo2', isBool: false},
              ],
              isTags: false,
            },
          ],
        },
        {
          title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true, left: '0%',
          tags: [
            {
              name: 'Tags',
              tagsContent: [
                {name: 'client-uuid2', value: '6fed454859ca9374', isBool: false},
                {name: 'hostname2', value: 'foo3Reply2', isBool: false},
                {name: 'jaeger.version2', value: 'Go-2.5.0', isBool: false},
              ],
              isTags: false,
            },
            {
              name: 'Process',
              tagsContent: [
                {name: 'client-uuid2', value: '6fed454859ca9374', isBool: false},
                {name: 'hostname2', value: 'foo3Reply2', isBool: false},
                {name: 'jaeger.version2', value: 'Go-2.5.0', isBool: false},
              ],
              isTags: false,
            },
          ],
        }
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

  showNode(event, i): void {
    event.stopPropagation();
    // this.nodes[i].isShow = !this.nodes[i].isShow;
  }
  showNodeContent(i): void {
    // this.nodes[i].isShowContent = !this.nodes[i].isShowContent;
  }

  isChildContent(event, i): void {
    event.stopPropagation();
    this.nodes[i].isShow = !this.nodes[i].isShow;
  }
  isChildExpanded(i, num?): void {
    if (num !== undefined) {
      this.nodes[i].children[num].isLeaf = !this.nodes[i].children[num].isLeaf;
    } else {
      this.nodes[i].isShowContent = !this.nodes[i].isShowContent;
    }
  }
  showTags(i, num, childId?): void {
    if (childId !== undefined) {
      this.nodes[i].children[num].tags[childId].isTags = !this.nodes[i].children[num].tags[childId].isTags;
    } else {
      this.nodes[i].tags[num].isTags = !this.nodes[i].tags[num].isTags;
    }
  }
}
