import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  metasActivas: Meta[] = [];
  metasCompletadas: Meta[] = [];
  nuevaMetaTexto: string = '';
  metaEnEdicion: string | null = null;
  textoEdicion: string = '';
  private sub!: Subscription;

  constructor(private metaService: MetaServiceService) { }

  ngOnInit(): void {
    this.sub = this.metaService.getMetas().subscribe(data => {
      this.metasActivas = data.filter(m => !m.completada);
      this.metasCompletadas = data.filter(m => m.completada);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  agregarMeta(): void {
    if (this.nuevaMetaTexto.trim() !== '') {
      this.metaService.addMeta({ meta: this.nuevaMetaTexto.trim(), fecha: Date.now(), completada: false });
      this.nuevaMetaTexto = '';
    }
  }

  completarMeta(meta: Meta): void {
    if (meta.id) this.metaService.updateMeta(meta.id, { completada: true });
  }

  restaurarMeta(meta: Meta): void {
    if (meta.id) this.metaService.updateMeta(meta.id, { completada: false });
  }

  iniciarEdicion(meta: Meta): void {
    this.metaEnEdicion = meta.id || null;
    this.textoEdicion = meta.meta;
  }

  guardarEdicion(meta: Meta): void {
    if (meta.id && this.textoEdicion.trim() !== '') {
      this.metaService.updateMeta(meta.id, { meta: this.textoEdicion.trim() });
    }
    this.metaEnEdicion = null;
  }

  cancelarEdicion(): void {
    this.metaEnEdicion = null;
  }

  eliminarDefinitivo(id: string | undefined): void {
    if (id) this.metaService.deleteMeta(id);
  }
}
