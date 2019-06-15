import { Component } from '@angular/core';
import { StorageService, Taxa } from '../services/storage.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AdmobService } from '../services/admob/admob.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  taxa: Taxa
  valor: any = 0;
  valorParcela: any = 0;

  debito = 0;
  creditoAvista = 0;
  creditoParcelado = 0;
  taxaParcelamento = 0;
  obsDebito = "";
  obsCreditoAvista = "";
  obsCreditoParcelado = "";
  tipoJuros = 1

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private admob: AdmobService,
  ) {
    
    
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.loadItems();
      const param = this.activatedRoute.snapshot.queryParams;
      if (param['reload'] == 'true') {
        this.valor = 0;
      }

      this.admob.showBanner();
    });
  }

  addItem() {
    this.taxa = {
      tipoJuros: 1,
      valorTransacao: 0,
      debito: 2.39,
      creditoAvista: 4.99,
      creditoParcelado: 5.59,
      taxaParcelamento: 2.99,
      obsDebito: "",
      obsCreditoAvista: "",
      obsCreditoParcelado: "",
    }

    this.storageService.addItem(this.taxa).then(taxa => {
      this.taxa = taxa;
      this.loadItems();
    });
  }

  loadItems() {
    this.storageService.getItem().then(taxa => {
      if (taxa) {
        this.taxa = taxa;
        this.debito = this.taxa.debito;
        this.creditoAvista = this.taxa.creditoAvista;
        this.creditoParcelado = this.taxa.creditoParcelado;
        this.taxaParcelamento = this.taxa.taxaParcelamento;
        this.obsDebito = this.taxa.obsDebito;
        this.obsCreditoAvista = this.taxa.obsCreditoAvista;
        this.obsCreditoParcelado = this.taxa.obsCreditoParcelado;
        this.tipoJuros = this.taxa.tipoJuros ? this.taxa.tipoJuros : 1
      }
      else {
        this.addItem();
      }
    });
  }

  calcParcelaComposto(valor: number, parcela: number) {

    //https://calculadorajuroscompostos.com.br/como-calcular-a-parcela-de-um-financiamento/
    var i = this.taxaParcelamento / 100 //taxa de juros
    var n = parcela // numero de prestacoes
    var e = Math.pow(1 + i, n) //(1+ i)n  - expoente
    var cf = i / (1 - (1 / e)) //coeficiente

    return valor * cf;
  }

  calcParcelaSimples(valor: number, parcela: number) {

    var taxaCredito = parseFloat(this.creditoParcelado.toString())
    var taxaParcela = parseFloat((this.taxaParcelamento * (parcela - 1)).toString())
    var taxa = 100 - taxaCredito - taxaParcela

    return valor / taxa * 100 / parcela;
  }


  calcTaxa(parcela: number) {
    var taxaCredito = parseFloat(this.creditoParcelado.toString())
    var taxaParcela = parseFloat((this.taxaParcelamento * (parcela - 1)).toString())
    return taxaCredito + taxaParcela
  }

  doShare() {

  }
}
