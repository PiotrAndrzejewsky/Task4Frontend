import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    let signUpUrl = environment.baseUrl + "signUp";
    this.http.post(signUpUrl, this.model).subscribe(
      res => {
        alert("User was created");
        let loginUrl = environment.baseFrontendUrl + "login";
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
