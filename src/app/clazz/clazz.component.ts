import {Component, OnInit} from '@angular/core';
import {EChartOption} from 'echarts';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.scss']
})
export class ClazzComponent implements OnInit {

  loading = false;
  // 班级详情数据
  data = [
    {
      title: '18130101'
    },
    {
      title: '18130102'
    },
    {
      title: '18130103'
    },
    {
      title: '18130104'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
