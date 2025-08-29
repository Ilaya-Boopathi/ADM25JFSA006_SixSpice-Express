import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarMenu } from "../navbar-menu/navbar-menu";


@Component({
  selector: 'app-menu-management',
  imports: [NavbarMenu, RouterOutlet, NavbarMenu],
  templateUrl: './menu-management.html',
  styleUrl: './menu-management.css'
})
export class MenuManagement {

}
