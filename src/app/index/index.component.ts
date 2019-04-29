import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  getStudent() {
    let userName = localStorage.getItem('userName');
    if (userName === null || userName === '') {
      userName = sessionStorage.getItem('userName');
    }
    const url = '/teacher/detail?jobNumber=' + userName;
    // @ts-ignore
    this.http.get<Result>(url).subscribe(
      next => {
        console.log('User Info is ', next.data);
        sessionStorage.setItem('uid', next.data.userId);
        sessionStorage.setItem('Name', next.data.name);
        sessionStorage.setItem('identity', next.data.id);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getStudent();
  }
}
