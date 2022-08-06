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

  private loginUrl = environment.baseFrontendUrl + "login";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  signUp(): void {
    let signUpUrl = environment.baseUrl + "signUp";
    if (this.model.username == "" || this.model.password == "" || this.model.email == "") {
      alert("all fields must be filled")
      return;
    }
    this.http.post<boolean>(signUpUrl, this.model).subscribe(
      res => {
        if (res) {
          alert("User was created");
        }
        else {
          alert("Something went wrong");
        }
        
        window.location.href = this.loginUrl;
      },
      err => {
        alert("Something went wrong, try again");
      }
    );
  }

  goToLogin() {
    window.location.href = this.loginUrl;
  }

}

export interface SignUpViewModel {
  username:string;
  password:string;
  email:string;
}
