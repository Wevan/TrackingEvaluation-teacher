import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  username: string;
  userId: string;
  department: string;
  level: string;
  clazzs: string;
  course: string;
  office: string;
  contact: string;

  constructor() {
    this.clazzs = '18130101';
    this.course = '数据结构';
    this.department = '软件学院';
    this.level = '大一';
    this.username = '李华玲';
    this.userId = '1400000000';
    this.contact = '1555553333';
    this.office = '软件学院楼';
  }

  ngOnInit() {
  }

}
