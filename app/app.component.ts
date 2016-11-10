import { Component,  OnInit} from '@angular/core';
import {User} from './Models/user.model'; 
import {GITService} from './Services/git.service';


@Component({
    selector: 'my-app',
    template: '<h1>Angular App</h1>',
})
export class AppComponent implements OnInit{ 
    public userDetailArr:User[] = [];
    constructor(private gitService:GITService){
    }
    ngOnInit() {
            this.gitService.getUserDetail().then((userDetailArr)=>{
            this.userDetailArr = userDetailArr;
            console.log(this.userDetailArr);
        });
    }
}
