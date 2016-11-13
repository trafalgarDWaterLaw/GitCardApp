import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import {GITService} from './Services/git.service';
//import {AddGITUserService} from './Services/add.git.user.service';

@NgModule({
  imports: [ BrowserModule, HttpModule],
  declarations: [ AppComponent ],
    providers: [GITService/*, AddGITUserService*/],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
