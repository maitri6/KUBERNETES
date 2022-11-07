import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../Services/auth-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  //providers:['AuthServiceService'] 
})
export class AuthRegisterComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.RegisterForm.controls.name.valueChanges.subscribe((value) => {
      console.log(value)
        })
    
  }
  RegisterForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    name : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

get f()
{
    return this.RegisterForm.controls;
}


  userRegister(){
    console.log(this.RegisterForm)
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
