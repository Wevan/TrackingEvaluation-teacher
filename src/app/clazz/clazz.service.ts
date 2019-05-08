import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  constructor(private http: HttpClient) {
  }

  /**
   * 拉取教师的班级列表
   */
  getClasses(courseId: number, teacherId: number): Observable<Result> {
    const url = '/courseclass/listByIds?courseId=' + courseId + '&teacherId=' + teacherId;
    return this.http.get<Result>(url);
  }

  /**
   * 拉取学生列表
   */
  getStudents(courseId: number, classId: number): Observable<Result> {
    const url = '/student/studentPercentList?courseId=' + courseId + '&classId=' + classId;
    return this.http.get<Result>(url);
  }

  /**
   * 获取课程的同期达标度
   */
  getTqPercent(courseId: number, classId: number) {
    const url = '/resource/getCourseTqPercent?courseId=' + courseId + '&classId=' + classId;
    return this.http.get<Result>(url);
  }

  /**
   * 拉取学生列表
   */
  getScores(courseId: number, classId: number): Observable<Result> {
    const url = 'http://106.12.195.114:8081/class/average/' + courseId + '&classId=' + classId;
    return this.http.get<Result>(url);
  }
}
