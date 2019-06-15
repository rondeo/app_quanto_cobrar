import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Taxa {
  valorTransacao?: number;
  debito?: number;
  creditoAvista?: number;
  creditoParcelado?: number;
  taxaParcelamento?: number;
  obsDebito: string;
  obsCreditoAvista: string;
  obsCreditoParcelado: string;
  tipoJuros?: number;
}

const ITEMS_KEY = '_taxas';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public storage: Storage) { 
  }

  // CREATE
  async addItem(taxa: Taxa): Promise<any> {
    return this.storage.set(ITEMS_KEY, taxa);
  }

  // READ
  async getItem(): Promise<Taxa> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  async updateItem(taxa: Taxa): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((item: Taxa) => {
      if (!item) {
        return null;
      }
      return this.storage.set(ITEMS_KEY, taxa);
    });
  }
}
