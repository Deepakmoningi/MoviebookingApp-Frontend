import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Password_VALUE_ACCESSOR } from 'primeng/password';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  userForm!:FormGroup;
  
  constructor(private formBuilder:FormBuilder,public apiService:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/movies');
    }

    this.userForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      loginId: ['',Validators.required],
      role:['',Validators.required],
      contactNumber: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    })
  }

  onSubmit(){
    this.apiService.register(this.userForm.value).
    subscribe({
    next: (res)=>{
        this.toastr.success(res.message);
        this.userForm.reset();
        this.router.navigateByUrl("/login");
    },
     error: (err)=>{

      if(err.status == 400 && err?.error.message){
          this.toastr.error(err?.error.message);
      }
      
      if(err.status == 400 && Array.isArray(err.error)){
        err.error.forEach((error:any)=>{
          if(error.description){
            this.toastr.error(error.description);
          }
          else{
            this.toastr.error("An unexpected error occured");
          }
        })
      }

      if(err.status == 400 && err.error.errors.Email)
      {
        this.toastr.error(err.error.errors.Email[0]);
      }

      if(err.status == 400 && err.error.errors.ConfirmPassword)
      {
          this.toastr.error(err.error.errors.ConfirmPassword[0])
      }
      
    }                                                 
    });
  }
}





