import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private menuController: MenuController,
    private navController: NavController,
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

    await toast.present();
  }  

  async login (form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Sedang masuk ke akun anda...'
    });

    await loading.present();

    this.authService.login(form.value.email, form.value.password).subscribe(data => {
        this.alertService.presentToast(data['message']);

        if (data['success']) {
          this.navController.navigateRoot('/home');
		  
		  form.reset();
        }
      }, error => {
        this.alertService.presentToast("Server sedang bermasalah");
      }, () => {
      }
    );

    await loading.dismiss();
  }
}
