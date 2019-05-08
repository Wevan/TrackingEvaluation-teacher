import {Component, OnInit} from '@angular/core';
import {EChartOption} from 'echarts';
import {UploadFile} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {Result} from '../../entity/Result';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ClazzService} from '../clazz.service';

@Component({
  selector: 'app-clazz-detail',
  templateUrl: './clazz-detail.component.html',
  styleUrls: ['./clazz-detail.component.scss']
})
export class ClazzDetailComponent implements OnInit {
  size = 'default';
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
  okPercent = 0;
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
          {value: this.okPercent, name: '达标'},
          {value: 1 - this.okPercent, name: '未达标'},
        ]
      }
    ]
  };


  /**
   * 班级成员列表
   */
  listOfData: any[] = [];

  // 考勤表Url
  attendenceUrl = '';
  // 大作业
  finalWorkUrl = '';
  courseId = 0;
  classId = 0;

  // 课程同期达标度
  tqPercent = 0;

  constructor(private routerInfo: ActivatedRoute, private http: HttpClient,
              private classService: ClazzService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.courseId = <number><unknown>this.routerInfo.snapshot.params['courseId'];
    this.classId = <number><unknown>this.routerInfo.snapshot.params['classId'];
    this.attendenceUrl = '/studentGlobalWay/insert/?courseId=' + this.courseId +
      '&typeTest=1';
    this.finalWorkUrl = '/studentGlobalWay/insert/?courseId=' + this.courseId +
      '&typeTest=2';
    this.getStudentList();
  }

  /**
   * 上传考勤或大作业成绩
   * @param file 文件
   */

  beforeUpload = (file: UploadFile): boolean => {
    console.log('File msg in Clazzdetail', file);
    return true;
  };

  /**
   * 初始化报告和下载报告相关处理
   */

  initReport() {
    // 这里的type指的是角色，教师为1
    const url = '/report/file?id=31&type=1&courseId=9';
    // const url = '/report/file?id=' + localStorage.getItem('userName') + '&type=1&courseId=9';
    this.http.get<Result>(url).subscribe(
      next => {
      },
      err => {
        console.log(err);
      }
    );
  }

  getReport() {
    const url = '/report/down?id=' + localStorage.getItem('userName');
    // @ts-ignore
    this.http.get<any>(url, {responseType: 'blob'}).subscribe(
      next => {
        console.log(next);
        let userName = localStorage.getItem('userName');
        if (userName == null || userName === '') {
          userName = sessionStorage.getItem('userName');
        }
        this.downFile(next, userName, 'application/pdf');
      },
      err => {
        console.log(err);
      }
    );
  }

  downFile(result, fileName, fileType?) {
    const blob = new Blob([result], {type: fileType});
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', fileName);
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

  /**
   * 拉取学生列表
   */
  getStudentList() {
    this.classService.getStudents(this.courseId, this.classId).subscribe(
      next => {
        this.listOfData = next.data;
        this.getTqPercent();
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * 获取课程的同期达标度
   */
  getTqPercent() {
    this.classService.getTqPercent(this.courseId, this.classId).subscribe(
      next => {
        this.tqPercent = next.data;
        const total: number = this.listOfData.length;
        let okNumber = 0;
        this.listOfData.forEach(item => {
            if (item.selfPercent >= this.tqPercent) {
              okNumber++;
            }
          }
        );
        this.okPercent = okNumber / total;
      },
      err => {
        console.log(err);
      }
    );
  }
}
