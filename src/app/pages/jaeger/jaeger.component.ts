import {Component, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {merge} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {JaegerRepository} from '../../share/services/jaeger.repository';
import {NzMessageService} from 'ng-zorro-antd/message';
import {formatDate} from '@angular/common';

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
    Object.assign(this, {bubbleData: this.bubbleData});
  }

  searchForm = this.fb.group({
    startTime: [null],
    endTime: [null],
    size: [],
  });
  @Output() refresh = new EventEmitter();
  jaegerList = [];

  bubbleData: any[] = [];
  // options
  yAxisLabel = 'Duration';
  colorScheme = {
    domain: ['#96c9cd', '#12939a', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  yScaleMin: number;
  yScaleMax: number;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    merge(this.refresh, this.searchForm.valueChanges).pipe(
      debounceTime(200),
      switchMap(_ => {
        const value = {...this.searchForm.value};
        value.startTime = value.startTime ? new Date(value.startTime).getTime() : null;
        value.endTime = value.endTime ? new Date(value.endTime).getTime() : null;
        return this.jaegerRepository.queryAll(value);
      }),
      map(d => {
        return d.data;
      })
    ).subscribe(res => {
      res.map(s => {
        s._source.allTimeCostArr = Object.keys(s._source.allTimeCost).map(key => {
          return {name: key, value: s._source.allTimeCost[key]};
        });
        s._source.timeAgo = this.timeFormat(s._source.createTime);
        s._source.timeIsAm = this.timeIsAmOrPm(s._source.createTime);
      });
      this.jaegerList = res;
      const chart = this.jaegerList.filter(err => !err._source.isError);
      const chartNum = chart.map(arr => Object.keys(arr._source.allTimeCost).map(key => key));
      const chartNames = Array.from(new Set([].concat.apply([], chartNum)));
      const chartValue = chart.map(v => Object.keys(v._source.allTimeCost).map(key => v._source.allTimeCost[key]));
      const chartValues: number[] = Array.from(new Set([].concat.apply([], chartValue)));
      this.yScaleMax = Math.max(...chartValues);
      this.yScaleMin = Math.min(...chartValues);
      this.bubbleData = chartNames.map((c: string, i) => ({
        name: c,
        series: chart.map(n => ({
          name: n._source.requestId,
          x: (formatDate(n._source.createTime, 'HH:mm:ss', 'zh-Hans')),
          y: parseFloat(n._source.allTimeCost[c]),
          r: 20
        }))
      }));
      console.log(this.jaegerList, this.bubbleData);
    }, err => this.messageService.error(err.message));
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
