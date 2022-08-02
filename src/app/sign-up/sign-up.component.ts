import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model:SignUpViewModel = {
    username:"",
    password:"",
    email:""
  };

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  signUp(): void {
    let signUpUrl = "http://localhost:8080/signUp";
    this.http.post(signUpUrl, this.model).subscribe(
      res => {
        alert("User was created");
        let loginUrl = "http://localhost:4200/login";
        window.location.href = loginUrl;
      },
      err => {
        alert("Something went wrong, try again");
      }
    );
  }

}

export interface SignUpViewModel {
  username:string;
  password:string;
  email:string;
}
