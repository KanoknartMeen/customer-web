import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessage = new BehaviorSubject<{type: 'success' | 'info' ,  message: string} | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  showToast(type: 'success' | 'info' = 'success', message: string) {
    this.toastMessage.next({ type, message });
    setTimeout(() => this.toastMessage.next(null), 2000);
  }
}
