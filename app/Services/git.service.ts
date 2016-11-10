import {Injectable} from '@angular/core';
import {User} from '../Models/user.model';
import {AllUser} from '../Models/all.user.model';
import { Headers, Http, Response } from '@angular/http'; //For Http calls
import 'rxjs/add/operator/toPromise'; //add on module of angular

@Injectable()
export class GITService {
    public userDetailArr:User[] = new Array<User>();
    private userDetail:User;
    private endpointUrl = 'https://api.github.com/users?since=135';
    private dummy:AllUser;
    private userMap:AllUser[] = new Array<AllUser>();
    constructor(private http:Http){
    }
    getUserDetail(){ //User details fills up in userDetailArr
        this.getAllUserAPI();
        this.getAllUserDetail();
        return Promise.resolve(this.userDetailArr);
    }
    private parseAllUserResponse(arrayOfObject:any){
        for (var i=0;i<arrayOfObject.length;i++){ 
            this.dummy = new AllUser(); 
            this.dummy.id = parseInt(arrayOfObject[i].category);
            this.dummy.url = arrayOfObject[i].url;
            this.userMap.push(this.dummy);
        }
    }
    
    getAllUserAPI(){
        this.http.get(this.endpointUrl)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            this.parseAllUserResponse(res);
                        });
    }

    private parseUserResponse(Object:any){
        this.userDetail = new User();
        this.userDetail.avatarUrl = Object.avatar_url;
        this.userDetail.followers = parseInt(Object.followers);
        this.userDetail.htmlUrl = Object.html_url;
        this.userDetail.id = parseInt(Object.id);
        this.userDetail.location = Object.location;
        this.userDetail.name = Object.name;
    }

    getUserDetailAPI(url:string){
        this.http.get(url)
                        .subscribe(res => {
                            res = res.json();
                            console.log(res);
                            this.parseUserResponse(res);
                        });
    }

    getAllUserDetail(){
        for (var i=0;i<this.userMap.length;i++){ 
            this.getUserDetailAPI(this.userMap[i].url);
            this.userDetailArr.push(this.userDetail);
        }
    }
}