import { Component, ViewChild } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { MenuController, ToastController, Platform } from '@ionic/angular';
import { DialogflowService } from 'src/app/services/dialogflow/dialogflow.service';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('content', { static: true }) private content: any;

  private message: string;
  private chats: Chat[] = [];

  constructor(
    private menuController: MenuController,
    private dialogflowService: DialogflowService,
    private storage: Storage,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.scrollToBottomOnInit();
    this.loadChatsFromStorage();
    this.getCurrentDateTime();

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

  initIntoChat() {
    var chat = new Chat();
    chat.message = "Hai, selamat datang di aplikasi Aa Kosim. Panggil saja aku Aa ya, Aa bisa bantu terkait permasalahan PC/Laptop anda. Silahkan ketik tanya langsung terkait permasalahan atau bisa menanyakan lokasi tempat servis terdekat disekitar anda.";
    chat.is_bot = true;
    chat.date_created = this.getCurrentDateTime();

    this.chats.push(chat);
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 500);
  }

  loadChatsFromStorage() {
    this.storage.get('chats').then((val) => {
      if(val) {
        val.forEach(el => {
          var chat = new Chat();
          chat.message = el.message;
          chat.is_bot = el.is_bot;
          chat.date_created = el.date_created;

          this.chats.push(chat);
        });
      } else {
        this.initIntoChat();
      }
    });
  }

  getCurrentDateTime() {
    var date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    return date;
  }

  sendMessage() {
    var chat = new Chat();
    chat.message = this.message;
    chat.is_bot = false;
    chat.date_created = this.getCurrentDateTime();

    this.chats.push(chat);
    this.storage.set('chats', this.chats);

    this.dialogflowService.query(this.message, '12312').subscribe(data => {  
        var message = data['result']['fulfillment']['speech'];

        var chat = new Chat();
        chat.message = message;
        chat.is_bot = true;
        chat.date_created = this.getCurrentDateTime();

        this.chats.push(chat);
        this.storage.set('chats', this.chats);
      }, error => {
        console.log(error);
      }, () => {
        this.scrollToBottomOnInit();
      }
    );

    this.message = "";
  }
}
