import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Action} from '../../domain/Action';
import {Observable} from 'rxjs/Observable';
import {ESResponse} from '../../domain/ESResponse';
import {map} from 'rxjs/internal/operators';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private config: ConfigService) {
  }

  getActions(params: string[]): Observable<ESResponse<Action>> {
    return this.httpClient
      .get(this.config.get('baseUrl') + '/action?' + params.join('&'))
      .pipe(
        map((response) => ESResponse.from<Action>(response))
      );
  }


  getErrors(params: string[]): Observable<ESResponse<Error>> {
    return this.httpClient
      .get(this.config.get('baseUrl') + '/error?' + params.join('&'))
      .pipe(
        map(response => ESResponse.from<Error>(response))
      );
  }


}
