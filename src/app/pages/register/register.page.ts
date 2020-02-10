import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { LoadingController, MenuController, ToastController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private menuController: MenuController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform
  ) { 
    this.menuController.enable(false);
  }

  ngOnInit() {
    var backCounter = 0;
    var backButtonSubs = this.platform.backButton.subscribe(() => {
      if (backCounter == 0) {
        backCounter++;
        this.presentToast();
        setTimeout(() => { backCounter = 0 }, 1000)
      } else {
        navigator['app'].exitApp();
        backButtonSubs.unsubscribe();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tekan lagi untuk keluar.',
      duration: 2000
    });
    toast.present();
  } 

  async register (form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Sedang membuat akun anda...'
    });

    await loading.present();

    if (form.value.password !== form.value.password_confirmation) {
      this.alertService.presentToast("Kolom konfirmasi password tidak sama!");
    } else {
      this.authService.register(form.value.name, form.value.email, form.value.password).subscribe(data => {
        this.alertService.presentToast(data['message']);

        form.reset();
      }, error => {
        this.alertService.presentToast("Server sedang bermasalah");
      }, () => {
      });
    }

    loading.dismiss();
  }
}
