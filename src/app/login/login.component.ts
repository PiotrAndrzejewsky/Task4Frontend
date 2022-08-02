import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:LoginViewModel = {
    username:"",
    password:""
  };

  constructor(private http:HttpClient) {

   }

  ngOnInit(): void {
  }

  sendLoginRequest(): void{
    let loginUrl = "http://localhost:8080/login";
    let updateUrl = "http://localhost:8080/user/";
    this.http.post(loginUrl, this.model, {observe: 'response'}).subscribe(
      res =>  {
        let header = res.headers.get('authorization');
        localStorage.setItem("bearer", header!);
        localStorage.setItem("username", this.model.username);
        let managementUrl = "http://localhost:4200/user/management/";
        let headers= new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("bearer")}`
        });   
        updateUrl = updateUrl + this.model.username;
        this.http.patch(updateUrl, this.model.username, {headers: headers}).subscribe(
          res => {
            window.location.href = managementUrl;
          },
          err => {
            alert("Something went wrong");
          }
        )
      },
      err => {
        alert("Wrong credentials");
      }
    );
  }

  goToSignUp(): void {
    let signUpUrl = "http://localhost:4200/signUp";
    window.location.href = signUpUrl;
  }
}

export interface LoginViewModel {
  username:string;
  password:string;
}
