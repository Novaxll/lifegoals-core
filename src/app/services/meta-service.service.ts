import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meta } from '../models/meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  constructor(private firestore: AngularFirestore) { }

  getMetas(): Observable<Meta[]> {
    return this.firestore
      .collection<Meta>('metas', ref => ref.orderBy('fecha', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  addMeta(meta: Meta): Promise<any> {
    return this.firestore.collection('metas').add({ ...meta, completada: false });
  }

  updateMeta(id: string, data: Partial<Meta>): Promise<void> {
    return this.firestore.collection('metas').doc(id).update(data);
  }

  deleteMeta(id: string): Promise<void> {
    return this.firestore.collection('metas').doc(id).delete();
  }
}
