import {Component, OnInit} from '@angular/core';
import {ResourceService} from './resource.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {FormBuilder} from '@angular/forms';
import {Resource} from '../entity/Resource';
import {ResourceMsg} from '../entity/ResourceMsg';
import {Router} from '@angular/router';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';
import {ResourceShow} from '../entity/ResourceShow';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  constructor(private msg: NzMessageService, private resourceService: ResourceService,
              private fb: FormBuilder, private router: Router,
              private http: HttpClient) {
  }

  courseId = 9;

  // 添加的模态框
  uploading = false;
  fileList: UploadFile[] = [];
  isVisible = false;
  isOkLoading = false;
  // 班级列表
  classList: any[] = [];
  // 用于拉取列表
  tempClass = 0;

  /**
   * 资源list列表数据
   */
  data: any[] = [];
  data1: any[] = [];
  data2: any[] = [];

  list: ResourceShow[] = [];

  listLength: number;
  videoLength: number;
  pdfLength: number;
  otherLength: number;
  /**
   * 资源分类展示
   */
  videoList: any[] = [];
  pdfList: any[] = [];
  otherList: any[] = [];
  /**
   * 添加资源
   */

  selectedKnowledge: { label: any; value: any } = {label: '', value: ''};
  knowledgeData: Array<{ label: any; value: any }> = [];
  knowledgeList = [];
  knowledgeId = 0;

  /**
   * 资源类型
   */
  radioValue = '0';

  /**
   * 添加资源时间的模态框
   */
  isVisible1 = false;
  dateRange = [];

  // pop modal
  showModal(): void {
    this.resourceService.getKnowledgeByCourse(this.courseId).subscribe(
      next => {
        console.log('knowledge', next);
        this.knowledgeList = next.data;
        this.selectedKnowledge = {
          label: this.knowledgeList[0].name,
          value: this.knowledgeList[0].id
        };
        this.knowledgeList.map((item) => {
          this.knowledgeData.push({
            label: item.name,
            value: item.id
          });
        });
      },
      err => {
        console.log(err);
      }
    );
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.handleUpload();
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  log(event): void {
    this.knowledgeId = event;
    console.log('knowledgeId', this.knowledgeId);
  }

  handleCancel(): void {
    this.isVisible = false;
    console.log('Modal ', this.selectedKnowledge);
  }

  /**
   * 上传======废弃
   */

  addResource() {
    const resource = new Resource();
    const resourceMsg = new ResourceMsg();
    resourceMsg.chapterId = 1;
    resourceMsg.courseId = 9;
    resourceMsg.name = '';
    resourceMsg.type = this.radioValue;
    resource.resourceDirctoryFile = resourceMsg;
    resource.file = this.fileList;

    this.uploading = true;
    this.resourceService.resource(resource).subscribe(
      next => {
        console.log(next);
      },
      err => {
        console.log(err);
      }
    );
  }


  /**
   * 上传文件
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  logFile(event): void {
    console.log('上传时的', event);
  }

  handleUpload(): void {
    const resource = new Resource();
    const resourceMsg = new ResourceMsg();
    resourceMsg.chapterId = 1;
    resourceMsg.courseId = this.courseId;
    resourceMsg.name = '';
    resourceMsg.type = this.radioValue;
    resource.resourceDirctoryFile = resourceMsg;
    resource.file = this.fileList;
    this.uploading = true;

    const formData = new FormData();
    // tslint:disable-next-line:no-any
    resource.file.forEach((item: any) => {
      formData.append('fileList', item);
    });
    const req = new HttpRequest('POST', '/resource/file?knowledgeId=' + this.knowledgeId + '&courseId='
      + resource.resourceDirctoryFile.courseId + '&type=' + this.radioValue, formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.isVisible = false;
          this.isOkLoading = false;
          this.selectedKnowledge = {label: '', value: ''};
          this.knowledgeData = [];
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
          this.isVisible = false;
          this.isOkLoading = false;
          this.selectedKnowledge = {label: '', value: ''};
          this.knowledgeData = [];
        }
      );

  }

  /**
   * 资源列表
   */

  ngOnInit(): void {
    this.getList();
  }

  loadData(pi: number): void {
    if (10 * pi <= this.videoLength) {
      this.data = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.type,
          url: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.url,
          id: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.id,
          knowledgeId: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.knowledgeId,
          visible: this.videoList[index + 10 * (pi - 1)].resourceClass != null,
          startTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.startTime : '',
          endTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.endTime : ''
        };
      });
    } else {
      this.data = new Array(this.videoLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.type,
          url: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.url,
          id: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.id,
          knowledgeId: this.videoList[index + 10 * (pi - 1)].resourceDirctoryFile.knowledgeId,
          visible: this.videoList[index + 10 * (pi - 1)].resourceClass != null,
          startTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.startTime : '',
          endTime: this.videoList[index + 10 * (pi - 1)].resourceClass != null ?
            this.videoList[index + 10 * (pi - 1)].resourceClass.endTime : ''
        };
      });
    }
  }

  loadData2(pi: number): void {
    if (10 * pi <= this.pdfLength) {
      this.data1 = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.pdfList[index + 10 * (pi - 1)].name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.pdfList[index + 10 * (pi - 1)].type,
          url: this.pdfList[index + 10 * (pi - 1)].url,
          id: this.pdfList[index + 10 * (pi - 1)].id
        };
      });
    } else {
      this.data1 = new Array(this.pdfLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.pdfList[index + 10 * (pi - 1)].name,
          description: 'Ant Design, a design language for background applications.',
          content: ' beautifully and efficiently.',
          type: this.pdfList[index + 10 * (pi - 1)].type,
          url: this.pdfList[index + 10 * (pi - 1)].url,
          id: this.pdfList[index + 10 * (pi - 1)].id
        };
      });
    }

  }

  loadData3(pi: number): void {
    if (10 * pi <= this.otherLength) {
      this.data2 = new Array(10).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.otherList[index + 10 * (pi - 1)].name,
          description: '',
          content: ' beautifully and efficiently.',
          type: this.otherList[index + 10 * (pi - 1)].type,
          url: this.otherList[index + 10 * (pi - 1)].url,
          id: this.otherList[index + 10 * (pi - 1)].id
        };
      });
    } else {
      this.data2 = new Array(this.otherLength - 10 * (pi - 1)).fill({}).map((i, index) => {
        return {
          href: '/resource',
          title: this.otherList[index + 10 * (pi - 1)].name,
          description: 'Ant Design, a design language for background applications.',
          content: ' beautifully and efficiently.',
          type: this.otherList[index + 10 * (pi - 1)].type,
          url: this.otherList[index + 10 * (pi - 1)].url,
          id: this.otherList[index + 10 * (pi - 1)].id
        };
      });
    }

  }

  /**
   * 删除
   */
  deleteOne(id: number) {
    this.resourceService.deleteOne(id).subscribe(
      next => {
        console.log(next);
        this.list = next.data;
        this.listLength = this.list.length;
        this.loadData(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * 下载
   */
  download(id: number, name: string) {
    const arr = name.split('.');
    if (arr[1] === 'mp4') {
      this.router.navigate(['/resource/video', id]);
    } else if (arr[1] === 'pdf') {
      this.router.navigate(['/resource/viewer', id]);
    } else {
      this.resourceService.download(id).subscribe(
        next => {
          const fileType = this.typeReverse(arr[1]);
          this.downFile(next, arr[0], fileType);
        },
        err => {
          console.log('err', err);
        }
      );
    }

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


  typeReverse(type: string): string {
    let result = '';
    switch (type) {
      case 'doc':
        result = 'application/msword';
        break;
      case 'docx':
        result = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'ppt':
        result = 'application/vnd.ms-powerpoint';
        break;
      case 'pptx':
        result = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'pps':
        result = 'application/vnd.ms-powerpoint';
        break;
      case 'ppsx':
        result = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';
        break;
      case 'xls':
        result = 'application/vnd.ms-excel';
        break;
      case 'xlsx':
        result = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'pdf':
        result = 'application/pdf';
        break;
      case 'tar':
        result = 'application/x-tar';
        break;
      case 'tgz':
        result = 'application/x-compressed';
        break;
      case 'zip':
        result = 'application/x-zip-compressed';
        break;
      case 'rar':
        result = 'application/octet-stream';
        break;
      case 'txt':
        result = 'text/plain';
        break;
      default:
        result = 'application/octet-stream';
        break;
    }
    return result;
  }

  /**
   * 请求列表
   */
  getList() {
    this.resourceService.getClasses(9, <number><unknown>sessionStorage.getItem('identity')).subscribe(
      next => {
        this.classList = next.data;
        console.log(this.classList);
        this.tempClass = this.classList[0].classId;
        this.patchList();
      },
      err => {
        console.log(err);
      }
    );
  }

  patchList() {
    this.resourceService.getList(9, this.tempClass).subscribe(
      next => {
        this.list = next.data;
        this.listLength = this.list.length;
        const that = this;
        this.list.map((item: ResourceShow) => {
            // 0视频；1pdf；2其他文件
            // @ts-ignore
            if (item.resourceDirctoryFile.type === 0) {
              that.videoList.push(item);
            } else {
              // @ts-ignore
              if (item.resourceDirctoryFile.type === 1) {
                that.pdfList.push(item.resourceDirctoryFile);
              } else {
                that.otherList.push(item.resourceDirctoryFile);
              }
            }
          }
        );
        this.videoLength = this.videoList.length;
        this.pdfLength = this.pdfList.length;
        this.otherLength = this.otherList.length;
        console.log(this.videoList);
        this.loadData(1);
        this.loadData2(1);
        this.loadData3(1);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * 添加资源的时间
   */
  handleCancel1() {
    this.isVisible1 = false;
    this.dateRange = [];
  }

  handleOk1() {
    this.isVisible1 = false;
    this.dateRange = [];
  }

  showModal1(resourceId: number, knowledgeId: number) {
    this.isVisible1 = true;
    console.log('ResourceId', resourceId);
    console.log('knowledgeId', knowledgeId);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
