import { Component,  OnInit} from '@angular/core';
import {User} from './Models/user.model'; 
import {GITService} from './Services/git.service';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls:  ['app/app.component.css']
})
export class AppComponent implements OnInit{ 
    public userDetailArr:User[] = [];
    public serviceError:any;
    constructor(private gitService:GITService){
    }
    ngOnInit() {
            this.gitService.getUserDetail().then((userDetailArr)=>{
            this.userDetailArr = userDetailArr;
            console.log('*******************************');
            console.log(this.userDetailArr);
            console.log('*******************************');
            /*this.serviceError = this.gitService.errorMsg;
            if(this.serviceError){
                console.log('******service Error occured is *****');
                console.log(this.serviceError);
            }*/
        });
    }
     sortByFollowers(){
             this.userDetailArr.sort((n1,n2) => n2.followers - n1.followers);
    }
    sortByLocation(){
            this.userDetailArr.sort((n1,n2) => {
            if (n1.location > n2.location) {
                return 1;
            }

            if (n1.location < n2.location) {
                return -1;
            }
            return 0;
        });
    }
    sortByName(){
            this.userDetailArr.sort((n1,n2) => {
            if (n1.name > n2.name) {
                return 1;
            }

            if (n1.name < n2.name) {
                return -1;
            }
            return 0;
        });
    }
    removeThisElement(removeUser:User){
        let idx = this.userDetailArr.indexOf(removeUser);
        if (idx != -1) {
                return this.userDetailArr.splice(idx, 1); 
            }
    }
}
