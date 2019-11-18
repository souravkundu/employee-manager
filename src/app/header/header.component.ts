import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  user: User;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = null;
    this.isAuthenticated = false;
    this.authService.authentication.subscribe(user => {
      this.user = user;
      if (user && user.token) {
        this.isAuthenticated = true;
        this.router.navigateByUrl('/employee-list');
      }
      else {
        this.isAuthenticated = false;
        this.router.navigateByUrl('/auth');
      }
    })
  }

  logout() {
    this.authService.updateUser(null);
    this.router.navigateByUrl('/auth');
  }

}
