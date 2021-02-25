import {Component, OnInit, EventEmitter, Output, AfterViewInit, HostListener} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {merge} from 'rxjs';
import {debounceTime, filter, map, switchMap} from 'rxjs/operators';
import {JaegerRepository} from '../../share/services/jaeger.repository';
import {NzMessageService} from 'ng-zorro-antd/message';
import {formatDate} from '@angular/common';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import * as echarts from 'echarts';

@Component({
  selector: 'app-jaeger',
  templateUrl: './jaeger.component.html',
  styleUrls: ['./jaeger.component.scss']
})
export class JaegerComponent implements OnInit, AfterViewInit {

  constructor(
    private fb: FormBuilder,
    private jaegerRepository: JaegerRepository,
    private messageService: NzMessageService,
  ) {
    Object.assign(this, {bubbleData: this.bubbleData, multi: this.multi});
  }

  searchForm = this.fb.group({
    startTime: [null],
    endTime: [null],
    size: [],
  });
  @Output() refresh = new EventEmitter();
  jaegerList = [];
  interval = new FormControl([]);

  hostChart;

  bubbleData: any[] = [];
  multi: any[] = [];
  colorScheme = {
    domain: ['#96c9cd', '#12939a', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  yScaleMin: number;
  yScaleMax: number;

  ngOnInit(): void {
    const chartDom = document.getElementById('echarts');
    this.hostChart = echarts.init(chartDom);
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event): void {
    // 滑动加载太频繁
    console.log(event, 'scroll', window);
    this.refresh.emit();
  }

  disabledStartDate = (startValue: Date): boolean => {
    // 七天以前不可选 结束时间要小于开始时间不可选
    const endValue = new Date(this.searchForm.get('endTime').value).getTime();
    if (endValue) {
      return differenceInCalendarDays(startValue, new Date()) < -6 || startValue.getTime() > endValue;
    }
    return differenceInCalendarDays(startValue, new Date()) < -6;
  }
  disabledEndDate = (endValue: Date): boolean => {
    const startValue = new Date(this.searchForm.get('startTime').value).getTime();
    if (startValue) {
      return differenceInCalendarDays(endValue, new Date()) < -6 || endValue.getTime() <= startValue;
    }
    return differenceInCalendarDays(endValue, new Date()) < -6;
  }
  searchFormValueFilter(): boolean {
    // 过滤掉开始时间结束时间不是24小时内的
    const value = {...this.searchForm.value};
    if (!value.endTime && !value.startTime) {
      return true;
    }
    if (!value.endTime) {
      const time = new Date().getTime() - new Date(value.startTime).getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      if (oneDay < time) {
        this.messageService.info('开始时间结束时间的时间间隔不能超过24小时');
      }
      return oneDay > time;
    }
    if (value.endTime && value.startTime) {
      const time = new Date(value.endTime).getTime() - new Date(value.startTime).getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      if (oneDay < time) {
        this.messageService.info('开始时间结束时间的时间间隔不能超过24小时');
      }
      return oneDay > time;
    }
    return true;
  }

  ngAfterViewInit(): void {
    merge(this.refresh, this.searchForm.valueChanges).pipe(
      debounceTime(200),
      filter(_ => this.searchFormValueFilter()),
      switchMap(_ => {
        const value = {...this.searchForm.value};
        value.startTime = value.startTime ? new Date(value.startTime).getTime() : null;
        value.endTime = value.endTime ? new Date(value.endTime).getTime() : null;
        return this.jaegerRepository.queryAll(value);
      }),
      map(d => {
        return d.data.hits;
      })
    ).subscribe(res => {
      console.log(res, 'res');
      const data = res;
      data.map(s => {
        s._source.allTimeCostArr = Object.keys(s._source.allTimeCost).map(key => {
          return {name: key, value: s._source.allTimeCost[key]};
        });
        s._source.timeAgo = this.timeFormat(s._source.createTime);
        s._source.timeIsAm = this.timeIsAmOrPm(s._source.createTime);
      });
      this.jaegerList = this.jaegerList.concat(data);
      // 计算 ngx-charts 散点图的数据
      // const chart = this.jaegerList.filter(err => !err._source.isError);
      // const chartNum = chart.map(arr => Object.keys(arr._source.allTimeCost).map(key => key));
      // const chartNames = Array.from(new Set([].concat.apply([], chartNum)));
      // const chartValue = chart.map(v => Object.keys(v._source.allTimeCost).map(key => v._source.allTimeCost[key]));
      // const chartValues: number[] = Array.from(new Set([].concat.apply([], chartValue)));
      // this.yScaleMax = Math.max(...chartValues);
      // this.yScaleMin = Math.min(...chartValues);
      // this.bubbleData = chartNames.map((c: string, i) => ({
      //   name: c,
      //   series: chart.map(n => ({
      //     name: n._source.requestId,
      //     x: (formatDate(n._source.createTime, 'HH:mm:ss', 'zh-Hans')),
      //     y: parseFloat(n._source.allTimeCost[c]),
      //     r: 20
      //   }))
      // }));
      // console.log(this.jaegerList, this.bubbleData);
    }, err => {
      this.messageService.error(err.error.message || err.message);
      // console.log(err, 'cuo');
    });

    merge(this.refresh, this.searchForm.valueChanges, this.interval.valueChanges).pipe(
        debounceTime(200),
        filter(_ => this.searchFormValueFilter()),
        switchMap(_ => {
          const value = {...this.searchForm.value};
          value.startTime = value.startTime ? new Date(value.startTime).getTime() : null;
          value.endTime = value.endTime ? new Date(value.endTime).getTime() : null;
          value.interval = this.interval.value;
          return this.jaegerRepository.queryHostChart(value);
        }),
        map(data => {
          return data.data;
        })
    ).subscribe(host => {
      console.log(host, 'host');
      const chartData = host ? host : [];

      let yAxisData = chartData.map(item => {
        // console.log(item, 'item');
        return Object.keys(item.countInfo).map(key => key);
      });
      yAxisData = Array.from(new Set([].concat.apply([], yAxisData)));
      // yAxisData = Array.from(new Set([].concat.apply([], yAxisData))).sort((a: number, b: number) => (a - b));
      const xAxisData = chartData.map(item => {
        // console.log(item.time, formatDate(item.time, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans'));
        return formatDate(item.time, 'yyyy-MM-dd HH:mm', 'zh-Hans');
      });
      let seriesData = chartData.map(item => {
        return yAxisData.map(y => {
          // console.log('x维度，y维度，值', formatDate(item.time, 'MM-dd HH:mm:ss', 'zh-Hans'), y, item.countInfo[y].level);
          return [formatDate(item.time, 'yyyy-MM-dd HH:mm', 'zh-Hans'), y, item.countInfo[y].level || '-'];
        });
      });
      seriesData = [].concat.apply([], seriesData);
      // console.log(yAxisData, 'y', xAxisData, seriesData);

      // ngx-charts 热图的数据
      // this.multi = chartData.map(m => ({
      //   name: formatDate(m.time, 'yyyy-MM-dd HH:mm', 'zh-Hans'),
      //   series: yAxisData.map(y => ({name: y, value: m.countInfo[y].level}))
      // }));
      // console.log(this.multi, 'multi');

      const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
      const days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      let datas: any = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0],
        [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0],
        [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4],
        [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2],
        [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0],
        [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2],
        [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12],
        [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0],
        [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1],
        [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7],
        [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0],
        [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13],
        [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1],
        [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2],
        [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8],
        [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0]];
      datas = datas.map( (item) => {
        return [item[1], item[0], item[2] || '-'];
      });
      // console.log(datas, 'datas');

      const option = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          splitArea: { // 显示分隔区域
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: yAxisData,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: 'jaeger',
          type: 'heatmap',
          data: seriesData,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      this.hostChart.setOption(option);
    });

    this.refresh.emit();
  }

  timeIsAmOrPm(time): string {
    const hour = new Date(time).getHours();
    if (hour < 12) {
      return 'am';
    } else {
      return 'pm';
    }
  }

  timeFormat(time): string {
    if (time > 0) {
      let result;
      time = parseInt(time, 10);
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const month = day * 30;
      const now = new Date().getTime();
      const diffValue = now - time;
      if (diffValue < 0) {
        return '';
      }
      const monthC = diffValue / month;
      const weekC = diffValue / (7 * day);
      const dayC = diffValue / day;
      const hourC = diffValue / hour;
      const minC = diffValue / minute;
      if (monthC >= 1) {
        if (monthC <= 12) {
          result = '' + Math.floor(monthC) + ' months ago';
        } else {
          result = '' + Math.floor(monthC / 12) + ' years ago';
        }
      } else if (weekC >= 1) {
        result = '' + Math.floor(weekC) + ' weeks ago';
      } else if (dayC >= 1) {
        result = '' + Math.floor(dayC) + ' days ago';
      } else if (hourC >= 1) {
        result = '' + Math.floor(hourC) + ' hours ago';
      } else if (minC >= 1) {
        result = '' + Math.floor(minC) + ' minutes ago';
      } else {
        result = 'just';
      }
      return result;
    } else {
      return '';
    }
  }

}
