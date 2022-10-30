import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../Services/auth-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  LoginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  userLogin(){
    const userLoginobj = {
      email : this.LoginForm.value.email, 
      password : this.LoginForm.value.password
    }
     this.authService.userLogin(userLoginobj).subscribe((res : any) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
     })
  }
}
