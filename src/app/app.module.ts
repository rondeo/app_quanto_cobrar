import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LOCALE_ID } from '@angular/core'
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './services/storage.service';
import { AdmobService } from './services/admob/admob.service';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

registerLocaleData(ptBr)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CurrencyMaskModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot({
      name: '__qtocbdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],

  providers: [
    StatusBar,
    SplashScreen,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    StorageService,
    AdMobPro,
    AdmobService,
    FirebaseAnalytics
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
