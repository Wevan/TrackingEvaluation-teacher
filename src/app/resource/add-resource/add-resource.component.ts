import {Component, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Resource} from '../../entity/Resource';
import {ResourceMsg} from '../../entity/ResourceMsg';
import {ResourceService} from '../resource.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  current = 0;
  index = 'First-content';

  selectedChapter = '第一章';
  selectedTips = '基础概论';
  chapterData = ['第一章', '第二章'];
  tipsData = {
    第一章: ['基础概论', '树', '图'],
    第二章: ['哈希算法', '查找', '排序']
  };

  uploading = false;
  fileList: UploadFile[] = [];
  /**
   * 文件上传
   * @param file 文件
   * @param fileList 文件队列
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  };

  handleChange(): void {
    const resource = new Resource();
    const resourceMsg = new ResourceMsg();
    if (this.selectedChapter === '第一章') {
      resourceMsg.chapterId = 1;
    } else {
      resourceMsg.chapterId = 2;
    }
    resourceMsg.courseId = 1;
    resourceMsg.name = '';
    resourceMsg.type = '1';
    resource.resourceDirctoryFile = resourceMsg;
    // const formData = new FormData();
    this.fileList.forEach((file: any) => {
      // formData.append('file', file);
      resource.file = file;
    });

    console.log('AddResource file is ', resource.file);
    this.uploading = true;
    this.resourceService.resource(resource).subscribe(
      (event: {}) => {
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * 表单部分
   * @param value 级联选择
   */
  provinceChange(value: string): void {
    this.selectedTips = this.tipsData[value][0];
  }

  /**
   * 步骤条
   */
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    // if (this.current === 1) {
    //   this.handleChange();
    // }
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  /**
   * 表单
   */

  constructor(private resourceService: ResourceService, private msg: NzMessageService) {
  }

  ngOnInit() {
  }

}
