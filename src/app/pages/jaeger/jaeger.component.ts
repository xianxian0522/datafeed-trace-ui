import {Component, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {merge} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {JaegerRepository} from '../../share/services/jaeger.repository';
import {NzMessageService} from 'ng-zorro-antd/message';

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
  ) { }

  searchForm = this.fb.group({
    startTime: [''],
    endTime: [''],
    size: [],
  });
  @Output() refresh = new EventEmitter();
  jaegerList = [];

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
      console.log(this.jaegerList);
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
