import {Injectable} from '@angular/core';
import {User} from '../Models/user.model';
import {AllUser} from '../Models/all.user.model';
import { Headers, Http, Response } from '@angular/http'; //For Http calls
import 'rxjs/add/operator/toPromise'; //add on module of angular

@Injectable()
export class GITService {
    public userDetailArr:User[]; 
    public singleUserDetail:User = new User();
    private urlHtml:string ;
    public errorMsg:any;
    private endpointUrl = 'https://api.github.com/users?since=135';
    private userMap:AllUser[];
    constructor(private http:Http){
       this.userMap = [];
        this.userDetailArr = [];
    }
    getUserDetail(){ //User details fills up in userDetailArr
        this.getAllUserAPI();
        console.log(this.userDetailArr.length);
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
        console.log(this.userMap);
    }
    
    getAllUserAPI(){
        this.http.get(this.endpointUrl)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            console.log(res.status);
                            this.parseAllUserResponse(res);
                            console.log(this.userMap);
                            this.getAllUserDetail();
                            console.log(this.userDetailArr);
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
                            console.log(url);
                            console.log(res.status);
                            this.parseUserResponse(res);
                        });
    }

    getAllUserDetail(){
        for (let i=0;i<this.userMap.length;i++){ 
            this.getUserDetailAPI(this.userMap[i].url);
        }
        console.log(this.userDetailArr);
    }
     private parseSingleUserResponse(Object:any){
        this.singleUserDetail.avatarUrl = Object.avatar_url;
        this.singleUserDetail.followers = parseInt(Object.followers);
        this.singleUserDetail.htmlUrl = Object.html_url;
        this.singleUserDetail.id = parseInt(Object.id);
        this.singleUserDetail.location = Object.location;
        this.singleUserDetail.name = Object.name;
    }
    private getAPIUrl(userHtmlUrl:string){
        //Getting url logic
        let stringLength = userHtmlUrl.length;
        let lastChar = '/';
        while(lastChar === '/'){
            lastChar = userHtmlUrl.charAt(stringLength - 1);
            stringLength = stringLength-1;
        }
        stringLength = stringLength+1;
        let idx = userHtmlUrl.indexOf("com/");
        idx = idx + 4;
        let usernameLen = stringLength -idx;
        this.urlHtml = "https://api.github.com/users/";
        this.urlHtml = this.urlHtml + userHtmlUrl.substr(idx, usernameLen);
        //Getting url logic ends
    }
    getSingleUserDetailAPI(userHtmlUrl:string){
        this.getAPIUrl(userHtmlUrl);
        console.log(userHtmlUrl);
        console.log(this.urlHtml);
        this.http.get(this.urlHtml)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            console.log(this.urlHtml);
                            console.log(res.status);
                            this.parseSingleUserResponse(res);
                        });
                        return Promise.resolve(this.singleUserDetail);
    }
}
