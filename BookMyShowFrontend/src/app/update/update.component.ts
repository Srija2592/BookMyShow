import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { UserState } from '../profile/user.reducer';
import { userDetails } from '../profile/user.action';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  updateuserform!:FormGroup;
  updatedata!:User;
  submitted:boolean=false;

  user:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,public dialogref:MatDialogRef<UpdateComponent>,private userservice:UserService,private authService:AuthService,private store:Store<{userState:UserState}>){
    this.updatedata={
      username:data.username,
      mobile:data.mobile,
      fullname:data.fullname,
      roles:data.roles,
      email:data.email,
      id:data.id,
      bookingId:data.bookingId
    };
  }

  ngOnInit(): void {

    this.updateuserform=new FormGroup({

      username:new FormControl(this.authService.getUserName(),Validators.required),
      fullname:new FormControl(this.data.fullname,Validators.required),
      mobile:new FormControl(this.data.mobile,Validators.required),
      roles:new FormControl(this.data.roles,Validators.required),
      email:new FormControl(this.data.email,Validators.required)

    });

  }

  updateuserdata(){
    if(this.submitted==false){
        this.updatedata.username=this.updateuserform.get('username')?.value;
        this.updatedata.mobile=this.updateuserform.get('mobile')?.value;
        this.updatedata.fullname=this.updateuserform.get('fullname')?.value;
        this.updatedata.roles=this.updateuserform.get('roles')?.value;
        this.updatedata.roles
        this.updatedata.email=this.updateuserform.get('email')?.value;
        console.log(this.updatedata);
        this.userservice.update(this.updatedata,this.updatedata.username).subscribe(data=>{this.user=data,
          this.submitted=true,
          this.store.dispatch(userDetails({userResponse:data}))
          this.dialogref.close();

        })

    }}

}
