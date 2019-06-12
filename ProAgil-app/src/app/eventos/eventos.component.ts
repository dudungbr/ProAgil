import { Component, OnInit } from '@angular/core';
import { filter } from 'minimatch';
import { EventoService } from '../_Services/Evento.service';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
_filtroLista = '';

  constructor(
    private eventoservice: EventoService,
    private modalService: BsModalService
    ) { }

get filtrolista(): string {
return this._filtroLista;
}
set filtrolista(value: string){
  this._filtroLista = value;
  this.eventosFiltrados = this.filtrolista ? this.filtrarEventos(this.filtrolista) : this.eventos;
}
openModal(template: TemplateRef<any>)
{
  this.modalRef = this.modalService.show(template);
}
  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem()
  {
    this.mostrarImagem = !this.mostrarImagem;
  }
getEventos(){
  this.eventoservice.getAllEvento().subscribe(
    (_eventos: Evento[]) => {
    this.eventos = _eventos;
    this.eventosFiltrados = this.eventos;
    console.log(_eventos);
  }, error => {
    console.log(error);
    });
};
}

