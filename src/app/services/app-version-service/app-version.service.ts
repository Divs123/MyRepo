import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment';
import { ApiService } from '../api-service/api.service';
import 'rxjs/add/operator/map';


@Injectable()
export class AppVersionService {
    authRequired;
    utcOffset;
    constructor(public http: Http, private apiService: ApiService) {

    }

    getAppVersion() {
        this.authRequired = true;
        this.utcOffset = false;
        let url = environment.APP.API_URL + environment.APP.GET_APP_VERSION;
        return this.apiService.getApi(url, this.authRequired, this.utcOffset);
    }
    updateAppVersion(data) {
        this.authRequired = true;
        this.utcOffset = false;
      
//           let fd = new FormData();
//    fd.append('latestIOSVersion',data.latestIOSVersion);
//    fd.append('latestAndroidVersion',data.latestAndroidVersion);
//    fd.append('latestWebID',data.latestWebID);
//    fd.append('criticalAndroidVersion',data.criticalAndroidVersion);
//     fd.append('criticalIOSVersion',data.criticalIOSVersion);
//    fd.append('criticalWebID',data.criticalWebID);
//     fd.append('updateMessageAtPopup',data.updateMessageAtPopup);
//    fd.append('updateTitleAtPopup',data.updateTitleAtPopup);
        let url = environment.APP.API_URL + environment.APP.UPDATE_APP_VERSION;
        return this.apiService.postApi(url,data,this.authRequired,this.utcOffset);
    }

}
