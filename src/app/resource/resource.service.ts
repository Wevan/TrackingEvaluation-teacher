import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../entity/Result';
import {VideoRecord} from '../entity/VideoRecord';
import {Resource} from '../entity/Resource';
import {UserComment} from '../entity/UserComment';
import {ResourceClass} from '../entity/ResourceClass';

@Injectable()
export class ResourceService {

  constructor(private http: HttpClient) {
  }


  /**
   * 视频记录上传
   */
  record(videoRecord: VideoRecord): Observable<Result> {
    const heroesUrl = '/record/insert';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI' +
          'xNTE0MDEwMzExIiwidXNlcklkIjoxNTU2LCJpYXQiOjE1NDg5OTA0MzMsImV4cCI6MTU0OTU5NTIzM30.E1icoKYMs39g-TRRzTJvkm0JaW0kVbMywBWzUA9Eg0s'
      })
    };

    return this.http.post<Result>(heroesUrl, videoRecord, httpOptions);
  }

  /**
   * 上传资源文件
   * @param resource 资源类
   */

  resource(resource: Resource): Observable<Result> {
    const heroesUrl = '/resource/file?chapterId=' + resource.resourceDirctoryFile.chapterId + '&courseId='
      + resource.resourceDirctoryFile.courseId;
    const fileList = resource.file;
    return this.http.post<Result>(heroesUrl, fileList);
  }

  /**
   * 拉取列表时需要先拉取班级列表
   * @param courseId 班级id
   * @param teacherId 教师id
   */

  getClasses(courseId: number, teacherId: number): Observable<Result> {
    const url = '/courseclass/list?courseId=' + courseId + '&teacherId=' + teacherId;
    return this.http.get<Result>(url);
  }

  getList(courseId: number, classId: number): Observable<Result> {
    const url = '/resource/list?courseId=' + courseId + '&classId=' + classId;
    return this.http.get<Result>(url);
  }

  deleteOne(id: number): Observable<Result> {
    const url = '/resource/deleteOne?id=' + id;
    return this.http.delete<Result>(url);
  }

  download(id: number): Observable<any> {
    const url = '/resource/downloadFile?id=' + id;
    // @ts-ignore
    return this.http.get<any>(url, {responseType: 'blob'});

    // .pipe(
    //   tap( // Log the result or error
    //     data => console.log(id, data),
    //     error => console.log(id, error)
    //   )
    // );
    // return this.http.post<Result>(url, id);
  }

  /**
   * 获取本课程知识点列表
   */
  getKnowledgeByCourse(courseId: number): Observable<Result> {
    const url = '/knowledge/findByCourse/?courseId=' + courseId;
    return this.http.get<Result>(url);
  }

  /**
   * 添加评论
   */
  addComment(comment: UserComment) {
    const Url = '/comment/insert';
    return this.http.post<Result>(Url, comment);
  }

  /**
   * 查找一个视频下的评论
   */
  findComment(videoId: number) {
    const url = '/comment/findAll?videoId=' + videoId;
    return this.http.get<Result>(url);
  }

  /**
   * 添加资源的时间
   */
  addTime(resourceClass: ResourceClass) {
    const Url = '/resourceClass/insert';
    return this.http.post<Result>(Url, resourceClass);
  }

}
