import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastrService) { }


  public showError(error) {
    this.toast.error(null, error, {
      positionClass: 'toast-bottom-left'
    });
  }


  public showSuccess(message) {
    this.toast.success(null, message, {
      positionClass: 'toast-bottom-left'
    });
  }
}
