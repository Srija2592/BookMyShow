import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,public dialogref:MatDialogRef<UpdateComponent>,private userservice:UserService,private authService:AuthService){
    this.updatedata={
      username:data.username,
      mobile:data.mobile,
      fullname:data.fullname

    };
  }

  ngOnInit(): void {

    this.updateuserform=new FormGroup({

      username:new FormControl(this.authService.getUserName(),Validators.required),
      fullname:new FormControl('',Validators.required),
      mobile:new FormControl('',Validators.required)

    });

  }

  updateuserdata(){
    if(this.submitted==false){
        this.updatedata.username=this.updateuserform.get('username')?.value;
        this.updatedata.mobile=this.updateuserform.get('mobile')?.value;
        this.updatedata.fullname=this.updateuserform.get('fullname')?.value;

        this.userservice.update(this.updatedata).subscribe(data=>{this.user=data,
          this.submitted=true,
          console.log(this.user)
          this.dialogref.close();

        })

    }}

}
