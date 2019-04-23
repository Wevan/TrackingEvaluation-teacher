import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/Result';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }


}
