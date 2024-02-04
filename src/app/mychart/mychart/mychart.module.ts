// mychart.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MychartComponent } from '../mychart.component';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MychartComponent],
  providers: [AuthService],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class MychartModule {}
