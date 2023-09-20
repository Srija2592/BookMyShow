import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AuthGuard } from '../auth.guard';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddtheatreComponent } from './addtheatre/addtheatre.component';
import { AddseatComponent } from './addseat/addseat.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'adminhome'
  },
  {
    path:'adminhome',
    component:AdminhomeComponent,

    // children:[
    //   {
    //     path:'addlocation',
    //     component:AddlocationComponent,
    //   },
    //   {
    //     path:'addmovie/:addlocation',
    //     component:AddmovieComponent
    //   },
    //   {
    //     path:'addtheatre/:addmovie/:addlocation',
    //     component:AddtheatreComponent
    //   }
    //   ,{
    //     path:'addseat/:addtheatre/:addmovie/:addlocation',
    //     component:AddseatComponent
    //   }

    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
