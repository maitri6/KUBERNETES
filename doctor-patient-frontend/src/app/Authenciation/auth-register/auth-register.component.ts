import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../Services/auth-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {NotficationServiceService} from '../../Notification/notfication-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  //providers:['AuthServiceService'] 
})
export class AuthRegisterComponent implements OnInit {
  constructor(private authService: AuthServiceService,
    private notifyService: NotficationServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.RegisterForm.controls.name.valueChanges.subscribe((value) => {
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
    const userRegisterobj = {
      name : this.RegisterForm.value.name, 
      email : this.RegisterForm.value.email,
      phoneNumber : this.RegisterForm.value.email, 
      password : this.RegisterForm.value.password
    }
     this.authService.userRegister(userRegisterobj).subscribe((res : any) => {
       console.log("result",res);
     
      if(res.statusCode==200){
     this.router.navigate(['/otp-verification']);
        this.notifyService.showToastSuccess("OTP sent successfully.")
      }
      

     },(err: any) =>{
      console.log("error",err.error)
       
      if(err.error.statusCode==400){
        this.router.navigate(['/register']);
           this.notifyService.showToastError("User already exists.")
         }
     })

  
  }

}
