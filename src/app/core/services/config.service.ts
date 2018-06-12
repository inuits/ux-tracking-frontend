import {APP_INITIALIZER, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config: Object;

  constructor(private httpClient: HttpClient) {
  }

  load() {
    this.httpClient.get('/assets/config/env_vars.json').subscribe(
      response => {

        this._config = response;

        this.httpClient.post(response['baseUrl'] + '/auth', {
          name: this._config['appName'],
          key: this._config['apiKey']
        }).subscribe(
          res => {
            localStorage.setItem('token', 'Bearer ' + res['access_token']);
          }
        );
      }
    );
  }

  get(key: string) {
    if (this._config == null) {
      return '';
    }
    return this._config[key];
  }
}

export function ConfigFactory(config: ConfigService) {
  return () => config.load();
}


export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [ConfigService],
    multi: true
  };
}

const ConfigModule = {
  init: init
};

export {ConfigModule};
