import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  private name: string;
  private email: string;
  private message: string;

  constructor(
    private alertService: AlertService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async sendMessage() {
    const loading = await this.loadingController.create({
      message: 'Sedang mengirim pesan anda...'
    });

    await loading.present();

    setTimeout(function () {
      console.log('Tebuang sia-sia 3 detik kau, HAHAHA...');
    }, 3000);

    loading.dismiss();

    this.alertService.presentToast("Berhasil mengirim pesan anda.");
  }

}
