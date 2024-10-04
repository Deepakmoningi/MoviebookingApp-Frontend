import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;


  constructor(public service:UserService,private router:Router,private toastr:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/movies');
    }

    this.loginForm = this.formBuilder.group({
      loginId:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
  onSubmit(){
    this.service.login(this.loginForm.value).
    subscribe({
      next:(res)=>{
      localStorage.setItem('token',res.jwtToken);
      localStorage.setItem('username',res.loginId);
      this.toastr.success("Login success");
      this.router.navigateByUrl('/movies')
  },
   error: (err)=>{
      if(err.status == 400){
        console.log("Hello")
        console.log(err?.error.message)
        this.toastr.error(err?.error.message);
        this.loginForm.reset();
      }  
    }}
    );
  }
}

