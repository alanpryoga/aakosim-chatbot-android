import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Pesan',
      url: '/home',
      icon: 'chatboxes'
    },
    {
      title: 'Tentang',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Kontak Kami',
      url: '/contact',
      icon: 'call'
    },
    {
      title: 'Keluar',
      url: '/login',
      icon: 'log-out'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      this.statusBar.backgroundColorByHexString('#412486');
      this.statusBar.styleBlackTranslucent();
    });
  }
}
