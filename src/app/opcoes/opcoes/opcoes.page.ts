import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { AdmobService } from 'src/app/services/admob/admob.service';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.page.html',
  styleUrls: ['./opcoes.page.scss'],
})
export class OpcoesPage implements OnInit {

  form: FormGroup;
  valor: any;

  constructor(
    private router: Router,
    private platform: Platform,
    private storageService: StorageService,
    formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private admob: AdmobService,
  ) {
    this.form = formBuilder.group({
      debito: ['', Validators.compose([Validators.required])],
      creditoAvista: ['', Validators.compose([Validators.required])],
      creditoParcelado: ['', Validators.compose([Validators.required])],
      taxaParcelamento: ['', Validators.compose([])],
      obsDebito: ['', Validators.compose([])],
      obsCreditoAvista: ['', Validators.compose([])],
      obsCreditoParcelado: ['', Validators.compose([])],
      tipoJuros: []
    });

    this.platform.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
  }

  loadItems() {
    this.storageService.getItem().then(taxa => {
      console.log(taxa);
      this.form.setValue({
        debito: taxa.debito,
        creditoAvista: taxa.creditoAvista,
        creditoParcelado: taxa.creditoParcelado,
        taxaParcelamento: taxa.taxaParcelamento,
        obsDebito: taxa.obsDebito,
        obsCreditoAvista: taxa.obsCreditoAvista,
        obsCreditoParcelado: taxa.obsCreditoParcelado,
        tipoJuros: taxa.tipoJuros || "1" 
      });
    });
  }

  async doSave() {
    const data = this.form.value;

    const taxa = {
      debito: data.debito.toString().replace(",", "."),
      creditoAvista: data.creditoAvista.toString().replace(",", "."),
      creditoParcelado: data.creditoParcelado.toString().replace(",", "."),
      taxaParcelamento: data.taxaParcelamento.toString().replace(",", "."),
      obsDebito: data.obsDebito,
      obsCreditoAvista: data.obsCreditoAvista,
      obsCreditoParcelado: data.obsCreditoParcelado,
      tipoJuros : data.tipoJuros ? data.tipoJuros : 1
    }

    await this.storageService.updateItem(taxa).then(() => {
      this.toastCtrl.create({
        message: 'Taxas atualizadas!',
        color: "primary",
        animated: true,
        translucent: true,
        duration: 2000,
      }).then(data => { data.present() })
      this.router.navigate(['/'], { queryParams: { reload: true } }).then(() => {
        this.admob.showInterstitial();
      })
    })
  }

  doBack() {
    this.router.navigate(['/']).then(() => {
      this.admob.showInterstitial();
    })
  }
}
