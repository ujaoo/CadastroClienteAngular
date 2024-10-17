import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../service/clienteService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Cliente } from '../../../model/cliente';
import { CardTextoComponent } from "../../../components/card-texto/card-texto.component";
import { CardComponent } from "../../../components/card/card.component";
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardTextoComponent, 
    CardComponent,
    MatIconModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
    
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss',
  providers:[ClienteService, provideNgxMask()]
})
export class CadastroClienteComponent implements OnInit {
  public form!: FormGroup;
  public cliente: Cliente = new Cliente();

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private clienteService: ClienteService, private location: Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl(),
      cpf: new FormControl(),
      telefone: new FormControl(),
      cidade: new FormControl(),
      estado: new FormControl(),
      endereco: new FormControl()
    });

    this.route.queryParams.subscribe((param) => {
      if (param['id'] != null) {
        this.clienteService.buscarPorId(param['id']).subscribe((clie) => {
          this.cliente = clie;
          this.form.patchValue(this.cliente);
        });
      }
    });
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }
    this.cliente = this.form.value;
    if (this.cliente.id == null) {
      this.clienteService.inserir(this.cliente).subscribe((cli) => {
        this.cliente = cli;
        this.location.back();
      });
    } else {
      this.clienteService.alterar(this.cliente).subscribe((cli) => {
        this.cliente = cli;
        this.location.back();
      });
    }
  }

  voltar() {
    this.location.back();
  }
}
