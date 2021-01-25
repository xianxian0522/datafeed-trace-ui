import { Component, OnInit } from '@angular/core';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd/tree';
import {ActivatedRoute} from '@angular/router';
import {JaegerRepository} from '../../share/services/jaeger.repository';
import {JaegerResponse} from '../../share/models/jaeger';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'app-jaeger-edit',
  templateUrl: './jaeger-edit.component.html',
  styleUrls: ['./jaeger-edit.component.scss']
})
export class JaegerEditComponent implements OnInit {

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private activatedRoute: ActivatedRoute,
    private jaegerRepository: JaegerRepository,
  ) { }

  activatedNode?: NzTreeNode;
  nodes = [
    {
      title: 'jaegerClient-demo1',
      subTitle: 'span_root',
      isShow: true,
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
          title: 'jaegerClient-demo',
          subTitle: 'span_root3', isLeaf: true, left: '0%', width: '50%',
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
        {
          title: 'jaegerClient-demo',
          subTitle: 'span_root4', isLeaf: false, left: '50%', width: '20%',
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
      title: 'jaegerClient-demo2',
      subTitle: 'span_root',
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
          title: 'jaegerClient-demo2',
          subTitle: 'span_root3', isLeaf: true, left: '50%', width: '50%',
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
          title: 'jaegerClient-demo2',
          subTitle: 'span_root4', isLeaf: true, left: '0%', width: '50%',
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
  traceData: any;
  test = [
    {
      title: 'jaegerClient-root',
      subTitle: 'span_root',
      index: 1,
      children: [
        {
          title: 'jaegerClient-r1-1',
          subTitle: 'span_root3', isLeaf: true, left: '0%', width: '50%',
          index: 2,
          children: [
            {
              title: 'jaegerClient-r1-1-1', index: 3,
              subTitle: 'span_root3-1', isLeaf: true, left: '0%', width: '50%',
              children: [
                {
                  title: 'jaegerClient4', index: 4,
                  subTitle: 'span444', isLeaf: true, left: '0%', width: '50%',
                }
              ],
            },
            {
              title: 'jaegerClient-r1-1-2', index: 3,
              subTitle: 'span_root3-2', isLeaf: true, left: '0%', width: '50%',
            }
          ],
        },
        {
          title: 'jaegerClient-r1-2',
          index: 2,
          subTitle: 'span_root3', isLeaf: true, left: '0%', width: '50%',
          children: [
            {
              title: 'jaegerClient-r1-2-1', index: 3,
              subTitle: 'span_root4-1', isLeaf: true, left: '0%', width: '50%',
            },
            {
              title: 'jaegerClient-r1-2-2', index: 3,
              subTitle: 'span_root4-2', isLeaf: true, left: '0%', width: '50%',
            }
          ],
        }
      ],
    },
    {
      title: 'jaegerClient-root2',
      subTitle: 'span_root',
      index: 1,
      children: [
        {
          title: 'jaegerClient-t1-1', index: 2,
          subTitle: 'span_root3', isLeaf: true, left: '0%', width: '50%',
          children: [
            {
              title: 'jaegerClient-t1-1-1', index: 3,
              subTitle: 'span_root4-1', isLeaf: true, left: '0%', width: '50%',
            },
            {
              title: 'jaegerClient-t1-1-2', index: 3,
              subTitle: 'span_root4-2', isLeaf: true, left: '0%', width: '50%',
            }
          ],
        },
      ],
    }
  ];
  jaegerData = [];

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
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.jaegerRepository.queryOneById(id).subscribe(res => {
        this.traceData = res.data;
        const service = this.traceData.service;
        const one = Object.keys(service).map(key => {
          let i = 0;
          if (!key.includes('_')) {
            i++;
            return Object.keys(service).filter(k => k !== key);
          }
        }).filter(kk => kk);
        console.log(one);

        Object.keys(service).map(key => {
          let i = 0;
          if (!key.includes('_')) {
            i++;
            this.jaegerData = [{...service[key], index: i}];
            const twos = Object.keys(service).filter(k => k !== key);
            twos.map(two => {
              if (two.includes(key)) {
                i++;
                console.log(two, i, key, '2');
                this.jaegerData[0].children = [{...service[two], index: i}];
                const three = twos.filter(t => t !== two );
                three.map(th => {
                  if (th.includes(two.split('_')[1])) {
                    i++;
                    this.jaegerData[0].children[0].children = [{...service[th], index: i}];
                    console.log(th, i, '3');
                    const four = three.filter(f => f !== th);
                    four.map(fo => {
                      if (fo.split('_').includes(th.split('_')[1])) {
                        i++;
                        this.jaegerData[0].children[0].children[0].children = [{...service[fo], index: i}];
                        console.log(fo, i, '4', th);
                        console.log(this.jaegerData, 'data');
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    });
  }

  getJsonTree(data, preKey, nextKey): any{
    const itemArr = [];
    data.map((item, i) => {
      const node = data[i];
      if ( node.parentId === preKey ){
        const newNode = {children: this.getJsonTree(data, node.id, nextKey)};
        itemArr.push(newNode);
      }
    });
    return itemArr;
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
