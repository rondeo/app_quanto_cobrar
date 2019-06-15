import { Injectable } from '@angular/core';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  admobid = {
    banner: 'ca-app-pub-4872966560954308/2950648859', // or DFP format "/6253334/dfp_example_ad"
    interstitial: 'ca-app-pub-4872966560954308/2106533520'
  };
  constructor(private admob: AdMobPro, public platform: Platform) { }

  showBanner() {
    if (!this.platform.is("cordova"))
      return

    this.admob.createBanner({
      adId: this.admobid.banner,
      isTesting: false,
      autoShow: true,
      position: this.admob.AD_POSITION.BOTTOM_CENTER,
    })
      .then(() => { })
  }

  showInterstitial() {
    if (!this.platform.is("cordova"))
      return


    this.admob.prepareInterstitial({
      adId: this.admobid.interstitial,
      isTesting: false
    })
      .then(() => { this.admob.showInterstitial(); });
  }
}
