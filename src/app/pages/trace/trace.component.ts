import {Component, OnInit} from '@angular/core';
import {JaegerRepository} from '../../share/services/jaeger.repository';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.scss']
})
export class TraceComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private jaegerRepository: JaegerRepository,
  ) {
    Object.assign(this, { multi: this.multi });
  }

  jaegerData = [];
  maxLength = 0;

  multi: any[] = [
    {
      name: 'Germany',
      series: [
        {
          name: '1990',
          value: 62000000
        },
        {
          name: '2010',
          value: 73000000
        },
        {
          name: '2011',
          value: 89400000
        },
        {
          name: '1996',
          value: 62000000
        },
        {
          name: '2016',
          value: 73000000
        },
        {
          name: '2021',
          value: 89400000
        }
      ]
    },

    {
      name: 'USA',
      series: [
        {
          name: '1990',
          value: 250000000
        },
        {
          name: '2010',
          value: 309000000
        },
        {
          name: '2011',
          value: 311000000
        }
      ]
    },
  ];

  // options
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.jaegerRepository.queryOneById(id).subscribe(res => {
        const traceData = res.data;
        const service = traceData.service;
        if (Object.keys(traceData.allTimeCost).length !== 0) {
          this.maxLength = Math.max.apply(Math, Object.keys(traceData.allTimeCost).map(key => traceData.allTimeCost[key]));
        }
        const one = Object.keys(service).map(key => {
          let i = 0;
          if (!key.includes('_')) {
            i++;
            return Object.keys(service).filter(k => k !== key);
          }
        }).filter(kk => kk);

        Object.keys(service).map(key => {
          let i = 0;
          if (!key.includes('_')) {
            i++;
            this.jaegerData = [{...service[key], index: i}];
            const twos = Object.keys(service).filter(k => k !== key);
            twos.map(two => {
              if (two.includes(key)) {
                i++;
                this.jaegerData[0].children = [{...service[two], index: i}];
                const three = twos.filter(t => t !== two );
                // d = this.getJsonTree(three, two, service);
                // console.log(d, 'de');
                three.map(th => {
                  if (th.includes(two.split('_')[1])) {
                    i++;
                    this.jaegerData[0].children[0].children = [{...service[th], index: i}];
                    const four = three.filter(f => f !== th);
                    four.map(fo => {
                      if (fo.split('_').includes(th.split('_')[1])) {
                        i++;
                        this.jaegerData[0].children[0].children[0].children = [{...service[fo], index: i}];
                      }
                    });
                  }
                });
              }
            });
          }
        });

        this.jaegerData = this.getJsonTree(Object.keys(service), '', service);
        this.setIndex(this.jaegerData, 1);
        console.log('>>>', this.jaegerData, this.maxLength);
      });
    });
  }

  setIndex(nodes: Array<any>, index: number): void {
    nodes.forEach(item => {
      item.index = index;
      if (this.maxLength === 0) {
        item.width = '0%';
        item.left = '0%';
      } else {
        item.width = (item.length / this.maxLength) * 100 + '%';
        item.left = (item.firstToNowGap / this.maxLength) * 100 + '%';
      }
      this.setIndex(item.children, index + 1);
    });
  }

  getJsonTree(keys, key, service): any{
    const itemArr = [];
    keys.map(item => {
      if (!item.includes('_')) {
        const twos = keys.filter(k => k !== item);
        const newNode = {...service[item], children: this.getJsonTree(twos, item, service)};
        itemArr.push(newNode);
      } else if (item.split('_')[0] === key) {
        const twos = keys.filter(k => k !== item);
        const newNode = {...service[item], children: this.getJsonTree(twos, item, service)};
        itemArr.push(newNode);
      } else if ( item.split('_')[0] === key.split('_')[1] ){
        const node = keys.filter(f => f !== item);
        const newNode = {...service[item], children: this.getJsonTree(node, item, service)};
        itemArr.push(newNode);
      }
    });
    return itemArr;
  }
}
