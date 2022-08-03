import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  public headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem("bearer")}`
  });   
  private baseUrl = environment.baseUrl;
  private blockUrl = this.baseUrl + "user/block/";
  private unblockUrl = this.baseUrl + "user/unblock/";
  private deleteUrl = this.baseUrl + "user/delete/";
  private loginUrl = environment.baseFrontendUrl + "login";
  private managementUrl = this.baseUrl + "user/management/";
  private statusUrl = this.baseUrl + "user/status/";

  public users: User[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.sendManagementRequest()
  }

  sendManagementRequest(): void {
    let username = localStorage.getItem("username");
    this.http.get<boolean>(this.statusUrl + username, {headers: this.headers}).subscribe(
      res => {
        if (res == false) {
          alert("Your account has been blocked");
          window.location.href = this.loginUrl;
        }
      },
      err => {
        alert("There was something wrong");
        window.location.href = this.loginUrl;
      }
    )

       
    this.http.get<Array<User>>(this.managementUrl + username, {headers: this.headers}).subscribe(
      res => {
        this.users = res;
      },
      err => {
        alert("Login first");
        window.location.href = this.loginUrl;
      }
    )
  }

  checkUncheckAll(): void {
    let inputs = document.getElementsByTagName("input");
    let status = inputs[0].checked;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = status; 
      }
    }
  }

  blockUnblockUser(status:boolean): void {
    let inputs = document.getElementsByTagName("input");
    let username = "";
    for (let i = 1; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox" && inputs[i].checked == true) {
        username = this.users[i - 1].username;
        if (status) {
          this.http.patch(this.unblockUrl + username, username, {headers: this.headers}).subscribe(
            res => {
              window.location.reload();
            },
            err => {
              alert("Something went wrong");
            }
          )
        }
        else {
          this.http.patch(this.blockUrl + username, username, {headers: this.headers}).subscribe(
            res => {
              window.location.reload();
            },
            err => {
              alert("Something went wrong");
            }
          )
        }
      }
    }
  }

  deleteUser():void {
    let inputs = document.getElementsByTagName("input");
    let username = "";
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox" && inputs[i].checked == true) {
        username = this.users[i - 1].username;
        this.http.delete(this.deleteUrl + username, {headers: this.headers}).subscribe(
          res => {
            window.location.reload();
          },
          err => {
            alert("Something went wrong");
          }
        )
      }
    }
  }
}

export interface User{
  userId: number;
  username: string;
  email: String;
  lastLoginTime: String;
  registrationTime: String;
  active: boolean;
}
