import {Component, OnInit} from '@angular/core';
import {EChartOption} from 'echarts';
import {UploadFile} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clazz-detail',
  templateUrl: './clazz-detail.component.html',
  styleUrls: ['./clazz-detail.component.scss']
})
export class ClazzDetailComponent implements OnInit {
  /**
   * 分数段展示
   */
  chartOption: EChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['>90', '80~90', '70~80', '60~70', '<60']
    },
    series: [
      {
        name: '成绩分布',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {value: 0.1, name: '>90'},
          {value: 0.3, name: '80~90'},
          {value: 0.4, name: '70~80'},
          {value: 0.1, name: '60~70'},
          {value: 0.1, name: '<60'}
        ]
      }
    ]
  };
  /**
   * 达成度
   */
  chartOption2: EChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['达标', '未达标']
    },
    series: [
      {
        name: '本期达标度分布',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {value: 0.7, name: '达标'},
          {value: 0.3, name: '未达标'},
        ]
      }
    ]
  };

  /**
   * 班级成员列表
   */
  listOfData = [
    {
      key: '1',
      name: '张晋霞',
      age: 32,
      address: '85'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: '87'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: '78'
    }
  ];

  // 考勤表Url
  attendenceUrl = '';
  finalWorkUrl = '';
  courseId = '';

  constructor(private routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.courseId = this.routerInfo.snapshot.params['id'];
    this.attendenceUrl = '/studentGlobalWay/insert/?courseId=' + this.courseId +
      '&typeTest=1';
    this.finalWorkUrl = '/studentGlobalWay/insert/?courseId=' + this.courseId +
      '&typeTest=2';
  }

  beforeUpload = (file: UploadFile): boolean => {
    console.log('File msg in Clazzdetail', file);
    return true;
  };

}
