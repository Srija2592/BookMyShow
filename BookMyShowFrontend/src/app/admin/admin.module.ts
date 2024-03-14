import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {WebcamModule } from 'ngx-webcam';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddtheatreComponent } from './addtheatre/addtheatre.component';
import { AddseatComponent } from './addseat/addseat.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [

    AddlocationComponent,
    AdminhomeComponent,
    AddmovieComponent,
    AddtheatreComponent,
    AddseatComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    WebcamModule
  ]
})
export class AdminModule { }
