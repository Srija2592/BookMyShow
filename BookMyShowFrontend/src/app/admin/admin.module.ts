import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebcamModule } from 'ngx-webcam';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddtheatreComponent } from './addtheatre/addtheatre.component';
import { AddseatComponent } from './addseat/addseat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { AuthService } from '../shared/auth.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AddlocationComponent,
    AdminhomeComponent,
    AddmovieComponent,
    AddtheatreComponent,
    AddseatComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    WebcamModule,
    SharedModule
  ],
})
export class AdminModule {}
