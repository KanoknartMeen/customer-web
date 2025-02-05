import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {AuthService} from './services/auth.service';
import {ToastService} from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  toastMessage: { type: 'success' | 'info', message: string } | null = null;

  constructor(private authService: AuthService,
              private toastService: ToastService) {
    this.toastService.toastMessage$.subscribe(toast => {
      if (toast) {
        this.toastMessage = toast;
      }
    });
  }

  ngOnInit() {
    this.authService.userLoggedIn$.subscribe(username => {
      this.username = username
      this.isLoggedIn = username !== null
    });
  }

  closeToast() {
    this.toastMessage = null;
  }

  logout() {
    this.authService.logout()
    this.isLoggedIn = false
  }

}
