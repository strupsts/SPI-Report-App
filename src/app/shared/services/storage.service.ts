import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async initStorage() {
    this._storage = await this.storage.create();
  }

  public get(key: string): Promise<any> | undefined {
    return this._storage?.get(key);
  }
  public set(key: string, value: any): Promise<any> | undefined {
    console.log('[SPI] ReportList updated')
    return this._storage?.set(key, value);
  }
  public remove(key: string): Promise<void> | undefined {
    return this._storage?.remove(key);
  }
  public clear(): Promise<void> | undefined {
    return this._storage?.clear();
  }
}
