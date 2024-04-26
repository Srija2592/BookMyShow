import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  providers:[AuthService,AuthGuard],
  declarations: [UnauthorizedPageComponent],
  imports: [CommonModule],
  exports: [UnauthorizedPageComponent],
})
export class SharedModule {}
