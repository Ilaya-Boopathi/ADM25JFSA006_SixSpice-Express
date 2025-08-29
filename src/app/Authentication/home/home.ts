import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterModule } from '@angular/router';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule,RouterModule, Navbar,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
