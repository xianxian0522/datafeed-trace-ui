export interface Jaeger {
  data?: {
    total: {value: number};
    hits?: [
      {
        _source?: {
          allTimeCost?: {[key: string]: number};
          allTimeCostArr?: {}[];
          timeAgo?: string;
          createTime?: number;
          requestId?: string;
          timeIsAm?: string;
          isError?: boolean;
          message?: string;
        }
      }
    ];
  };
  message?: string;
}

export interface JaegerResponse {
  data?: {
    allTimeCost?: {[key: string]: number};
    allTimeCostArr?: {}[];
    createTime?: number;
    requestId?: string;
    service?: {[key: string]: any};
    serviceGap?: { [key: string]: number };
  };
  message?: string;
}
