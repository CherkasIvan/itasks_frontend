import {Injectable} from '@angular/core';
import {FileModel} from '@core/models/file.model';
import {environment} from '../../../../environments/environment';
import {getToken} from '@core/utils/getToken';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  isOpen = false;
  image: FileModel;
  token = getToken();
  imageUrl = '';

  open(image) {
    this.image = image;
    this.imageUrl = `${API_URL}files/${this.image.id}?projectId=${this.image.projectId}&access-token=${this.token}`;
    this.isOpen = true;
  }

  close() {
    this.image = null;
    this.imageUrl = null;
    this.isOpen = false;
  }
}
