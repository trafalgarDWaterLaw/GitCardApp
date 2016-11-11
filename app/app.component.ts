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
            this.serviceError = this.gitService.errorMsg;
            if(this.serviceError){
                console.log('******service Error occured is *****');
                console.log(this.serviceError);
            }
        });
    }
}
