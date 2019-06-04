import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';
import {CookieService} from 'ngx-cookie-service';
import {ClazzService} from './clazz.service';

@Component({
  selector: 'app-clazz',
  templateUrl: './clazz.component.html',
  styleUrls: ['./clazz.component.scss']
})
export class ClazzComponent implements OnInit {

  loading = false;
  // 班级详情数据
  classList: any[] = [];

  teacherId = 0;
  courseId = 2;

  constructor(private http: HttpClient, private clazzService: ClazzService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.teacherId = <number><unknown>sessionStorage.getItem('identity');
    this.getClasses();
  }

  /**
   * 获取班级列表
   */
  getClasses() {
    this.clazzService.getClasses(this.courseId, this.teacherId).subscribe(
      next => {
        console.log(next);
        this.classList = next.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
