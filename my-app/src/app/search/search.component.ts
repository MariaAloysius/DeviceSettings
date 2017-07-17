import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../service/settings.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[SettingsService]
})
export class SearchComponent implements OnInit {
  public deviceId;
  public result ;
  public errorMessage;
  public updateMessage = false;
  public showResult;
  
  constructor(private settingsService : SettingsService) { }

  ngOnInit() {}
  
  //Get device ID
  onKeyup (event){
    this.deviceId = event.target.value;
  }

   /*
    * Fetch the details 
    * Request: device ID
    * Resp: correspnding JSON
  */
  getDetails(){
    if(this.deviceId === null || this.deviceId === undefined || this.deviceId === ''){
      this.errorMessage ="Please enter a Device ID";
    }else{
      this.settingsService.getDetails(this.deviceId).subscribe(
      res =>{
        //Success Callback
        this.result = res;this.errorMessage =''; this.showResult = true;
      },
        //Error Callback
        error =>{this.errorMessage = 'No details fetched';this.showResult=false;}     
      );        
    }    
  }

  /*
    *Update the details 
    * Request: updated settings details and device id
    * Resp: updated JSON
  */
  updateDetails(){
    this.settingsService.updateDetails(this.result,this.deviceId).subscribe(
    //Success Callback
    res =>{
        this.result = res;
        this.updateMessage = true;
        this.errorMessage = '';
        this.showResult = true;
    },
    //Error Callback
    error =>{
      console.error(error);
      this.showResult=false;
      this.errorMessage = error.statusText;
      this.updateMessage = false;
      return Observable.throw(error);      
    });
  };  
}
