import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {MessageModel} from '../models/message.model';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ApiService {
  findAll(taskId) {
    return this
      .http
      .get<MessageModel[]>(this.getApiUrl(`messages?taskId=${taskId}`))
      .map((response) => response.map(model => (new MessageModel).setAttributes(model)));
  }

  create(model: MessageModel) {
    return this
      .http
      .post<MessageModel>(this.getApiUrl(`messages`), model)
      .map((response) => (new MessageModel()).setAttributes(response));
  }

  like(model: MessageModel) {
    return this
      .http
      .put<MessageModel>(this.getApiUrl(`messages/like/${model.id}`), {})
      .map((response) => (new MessageModel()).setAttributes(response));
  }

  pin(model: MessageModel) {
    return this
      .http
      .put<MessageModel>(this.getApiUrl(`messages/pin/${model.id}`), {})
      .map((response) => (new MessageModel()).setAttributes(response));
  }

  save(model: MessageModel) {
    return this
      .http
      .put<MessageModel>(this.getApiUrl(`messages/${model.id}`), model)
      .map((response) => (new MessageModel()).setAttributes(response));
  }

  destroy(model: MessageModel) {
    return this
      .http
      .delete<MessageModel>(this.getApiUrl(`messages/${model.id}`));
  }
}
