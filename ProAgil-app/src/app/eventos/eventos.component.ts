import { Component, OnInit, TemplateRef } from '@angular/core';
import { filter } from 'minimatch';
import { EventoService } from '../_Services/Evento.service';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale} from 'ngx-bootstrap';
import { templateJitUrl } from '@angular/compiler';
defineLocale('pt-br',ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  modoSalvar='post';
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento = '';

_filtroLista = '';

  constructor(
    private eventoservice: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br');
    }

get filtrolista(): string {
return this._filtroLista;
}
set filtrolista(value: string){
  this._filtroLista = value;
  this.eventosFiltrados = this.filtrolista ? this.filtrarEventos(this.filtrolista) : this.eventos;
}

editarevento(evento: Evento, template: any){
  this.modoSalvar='put';
  this.openModal(template);
  this.evento = evento;
  this.registerForm.patchValue(evento);
}

novoevento(template: any){
  this.modoSalvar = 'post';
  this.openModal(template);
}

openModal(template: any)
{
  this.registerForm.reset();
  template.show(template);
}
  ngOnInit() {

    this.getEventos();
    this.validation();
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

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoservice.deleteEvento(this.evento.id).subscribe(
      () => {
        template.hide();
        this.getEventos();
      }, error => {
        console.log(error);
      }
    );
  }

  salvarAlteracao(template: any){
    if(this.registerForm.valid){
      if(this.modoSalvar==='post'){
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoservice.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoservice.putEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
        );

      }
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imageurl: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    });
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

