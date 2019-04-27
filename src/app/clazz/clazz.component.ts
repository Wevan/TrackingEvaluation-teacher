import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.scss']
})
export class ClazzComponent implements OnInit {
  size = 'large';
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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }
  initReport() {
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
        this.downFile(next, localStorage.getItem('userName'), 'application/pdf');
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
}
