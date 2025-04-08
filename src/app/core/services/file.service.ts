import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import StringHelper from '../string.helper';
import FileHelper from '../file.helper';
import {HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService extends ApiService {

  upload(file: File, forObject: string, taskId: string = null, objectId: string = null) {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    formData.append('forObject', forObject);

    if (objectId !== null) {
      formData.append('objectId', objectId);
    }

    if (taskId !== null) {
      formData.append('taskId', taskId);
    }

    const req = new HttpRequest('POST', this.getApiUrl('files'), formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  uploadAvatar(dataURI) {
    const name: string = StringHelper.randomString() + '.png';
    const body: FormData = new FormData();
    const file: Blob = FileHelper.dataURItoBlob(dataURI);

    body.append('file', file, name);


    return this.http.post(this.getApiUrl('files/upload-avatar'), body);
  }

  getBlobFromUrl(url) {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
}
