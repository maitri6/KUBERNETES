import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../Services/auth-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  RegisterForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    name : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  userRegister(){
    const userRegisterobj = {
      name : this.RegisterForm.value.name, 
      email : this.RegisterForm.value.email,
      phoneNumber : this.RegisterForm.value.email, 
      password : this.RegisterForm.value.password
    }
     this.authService.userRegister(userRegisterobj).subscribe((res : any) => {
      console.log("result",res);
     })
  }

}
