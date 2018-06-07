import {Component, Inject, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  constructor(@Inject(HttpClient) private httpclient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpclient.post('https://localhost:5000/auth', {
      'name': 'sportoffice',
      'key': 'sportoase'
    }).toPromise().then(res => {
      this.httpHeaders = new HttpHeaders({Authorization: 'Bearer ' + res['access_token']});
      localStorage.setItem('token', res['access_token']);
    });
  }

}
