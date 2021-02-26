import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DropDownServices {
    constructor() {}

    // 获取滚动条当前位置
    getScrollTop(): number {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    // 获取当前可视范围高度
    getClientHeight(): number {
        let clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return  clientHeight;
    }
    // 获取文档完整的高度 = 1+2 整个屏幕的高度
    getScrollHeight(): number {
        return  Math.max(document.body.scrollHeight, document.documentElement.clientHeight);
    }

    calculation(): boolean {
        // console.log(this.getScrollTop());
        // console.log(this.getClientHeight());
        // console.log(this.getScrollHeight());
        const height = this.getScrollTop() + this.getClientHeight();
        const maxHeight = this.getScrollHeight();
        if (height >= maxHeight ) {
            // console.log('触发');
            return true;
        } else {
            // console.log('没触发');
            return false;
        }
    }

}
