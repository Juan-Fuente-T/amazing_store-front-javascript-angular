import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

/**
 * AppComponent is the root component of the application.
 * It typically contains the main layout and navigation structure.
 * This component is loaded first when the application starts.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
/**
 * Class representing the state and behavior of the AppComponent.
 */
export class AppComponent implements OnInit {
  /**
   * Title of the application displayed in the header or title bar.
   */
  title = 'amazing_store-front';
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.username = isLoggedIn ? localStorage.getItem('auth_username') : null;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}