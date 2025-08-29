import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from "../dashboard-component/dashboard-component";
import { NavbarComponent } from '../navbar-component/navbar-component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

}
