import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
//import it when using request headers
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Headers} from  '@angular/http';
//import it when using observable
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
/*
  * Service class to fetch and update the device settings
*/
export class SettingsService {

  constructor(private http:Http) { }

  //Fetch device settings
  getDetails(searchText) : Observable<any> {
    
    let serviceUrl ='https://preprod.vbn.care/api2/v2/device/'+ searchText +'?names=RuntimeSettings';
    let myHeaders = new Headers({'Authorization':'Bearer RJ56/Rw5vEO2WfAdPih5Lw==', 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: myHeaders  });
    
    return this.http.get('https://preprod.vbn.care/api2/v2/device/40072?names=RuntimeSettings',options).map(
      res => {
        const data = res.json();
        return data;
      } 
    )
     .catch((error: any) => {
        return Observable.throw(new Error(error.status));
     });
  };

  //Update device settings
  updateDetails(data,searchText){
    let serviceUrl ='https://preprod.vbn.care/api2/v2/device/'+ searchText +'?names=RuntimeSettings';
    let updateMessage = false;
    let myHeaders = new Headers({'Authorization':'Bearer RJ56/Rw5vEO2WfAdPih5Lw==', 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: myHeaders });
   
    return this.http.put('https://preprod.vbn.care/api2/v2/device/40072?names=RuntimeSettings', JSON.stringify(data), options)
      .map(res => {
        const data = res.json();
        if(data){
          updateMessage = true;
        }          
        return data;
      })
  }
}
