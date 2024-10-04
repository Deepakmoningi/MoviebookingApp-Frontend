import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  // formModel={
  //   loginId:'',
  //   newPassword:'',
  //   confirmNewPassword:''
  // }

  passwordResetForm!:FormGroup;

  constructor(public service:UserService, private formBuilder:FormBuilder, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/movies');
    }

    this.passwordResetForm=this.formBuilder.group({
      loginId:['', Validators.required],
      newPassword:['',Validators.required],
      confirmNewPassword:['',Validators.required]
    })
  }
  onSubmit(){
    this.service.forgotPassword(this.passwordResetForm.value).
    subscribe({
     next: (res:any)=>{
        this.toastr.success(res.message);
        this.router.navigateByUrl('/login');
    },
     error: (err)=>{ 
      if(err.status == 400 && err?.error.message)
      {
        this.toastr.error(err?.error.message);
      }
      if(err.status == 400 && err.error.errors.ConfirmNewPassword)
      {
          this.toastr.error(err.error.errors.ConfirmNewPassword[0])
      }
      
      }
    }
    );
  }
}
