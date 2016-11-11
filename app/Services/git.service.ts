import {Injectable} from '@angular/core';
import {User} from '../Models/user.model';
import {AllUser} from '../Models/all.user.model';
import { Headers, Http, Response } from '@angular/http'; //For Http calls
import 'rxjs/add/operator/toPromise'; //add on module of angular

@Injectable()
export class GITService {
    public userDetailArr:User[]; 
    public errorMsg:any;
    private endpointUrl = 'https://api.github.com/users?since=135';
    private userMap:AllUser[];
    constructor(private http:Http){
       this.userMap = [];
        this.userDetailArr = [];
    }
    getUserDetail(){ //User details fills up in userDetailArr
        this.getAllUserAPI();
        console.log('*******************************');
        console.log('Custom user detail array size is');
        console.log(this.userDetailArr.length);
        console.log(this.userDetailArr);
        console.log('*******************************');
        return Promise.resolve(this.userDetailArr);
    }
    private  handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log('*******************************');
        console.log('service Error message');
        console.error(errMsg);
        console.log('*******************************');
        this.errorMsg = errMsg;
    }
    private parseAllUserResponse(arrayOfObject:any){
        for (let i=0;i<arrayOfObject.length;i++){ 
            let dummy:AllUser = new AllUser(); 
            dummy.id = parseInt(arrayOfObject[i].id);
            dummy.url = arrayOfObject[i].url;
            this.userMap.push(dummy);
        }
        console.log('*************User Map After filling******************');
        console.log(this.userMap);
        console.log('**********after user Map logged*******');
    }
    
    getAllUserAPI(){
        this.http.get(this.endpointUrl)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            console.log('*************Response satus of all users service call *****************');
                            console.log(res.status);
                            //if(res.status == 200)
                           // {
                                this.parseAllUserResponse(res);
                                console.log('*************User Map innside API call******************');
                                console.log(this.userMap);
                                console.log('**********After API Call Logged*******');
                                this.getAllUserDetail();
                                console.log('*************User Detail Arr innside API call******************');
                                console.log(this.userDetailArr);
                                console.log('**********After API Call Logged*******');
                            //}
                           /* else{
                                this.handleError(res);
                            }*/
                        });
    }

    private parseUserResponse(Object:any){
        let userDetail:User = new User();
        userDetail.avatarUrl = Object.avatar_url;
        userDetail.followers = parseInt(Object.followers);
        userDetail.htmlUrl = Object.html_url;
        userDetail.id = parseInt(Object.id);
        userDetail.location = Object.location;
        userDetail.name = Object.name;
        this.userDetailArr.push(userDetail);
    }

    getUserDetailAPI(url:string){
        this.http.get(url)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            console.log('*************Response satus of specific users *****************');
                            console.log(url);
                            console.log(res.status);
                            //if(res.status == 200){
                                this.parseUserResponse(res);
                           /* }
                            else{
                                this.handleError(res);
                            }*/
                        });
    }

    getAllUserDetail(){
        console.log('Line 99 ....********* User Map length in getAllUserDetail()');
        console.log(this.userMap.length);
        for (let i=0;i<this.userMap.length;i++){ 
            this.getUserDetailAPI(this.userMap[i].url);
        }
         console.log('*************UserDetail Arr Just after Filling *****************');
        console.log(this.userDetailArr);
    }
}
