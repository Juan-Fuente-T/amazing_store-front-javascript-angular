import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.router.navigate(['']); // Redirige a la página principal si ya está logueado
      }
    });
  }
  onSubmit() {
    // console.log('isLoading antes:', this.isLoading);
    if (this.username && this.password) {
      this.isLoading = true;
      this.authService.login(this.username, this.password).subscribe({
        next: (response: { token: string }) => {
          // Almacena el token en localStorage
          // localStorage.setItem('token', response.token);
          // Redirige a la página principal
        // console.log('Login exitoso, isLoading:', this.isLoading);
          this.isLoading = false;
          this.router.navigate(['']);
        },
        error: (error: any) => {
          // console.log('Login fallido, isLoading:', this.isLoading);
          this.isLoading = false;
          console.error('Login failed', error);
          alert('Login failed');
          // Manejo de errores, puedes mostrar un mensaje al usuario
        }
      });
    } else {
      // console.log('Login fallido, isLoading:', this.isLoading);
      this.isLoading = false;
      console.error('Username and password are required');
      alert('Login failed');
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige a la página de login después del logout
  }
}