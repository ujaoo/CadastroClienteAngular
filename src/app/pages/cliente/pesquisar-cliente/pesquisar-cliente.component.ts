import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../../model/cliente';
import { SelectionModel } from '@angular/cdk/collections';
import { ClienteService } from '../../../service/clienteService';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; 
import { Location } from '@angular/common';
import { PipesModule } from '../../../pipes/pipes.module';

@Component({
  selector: 'app-pesquisar-cliente',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    PipesModule
  ],
  templateUrl: './pesquisar-cliente.component.html',
  styleUrls: ['./pesquisar-cliente.component.scss'],
  providers: [ClienteService]
})
export class PesquisarClienteComponent implements OnInit {
  public displayedColumns: any[] = ['select', 'id', 'nome', 'cpf', 'telefone', 'cidade', 'estado', 'endereco'];
  public dataSource: MatTableDataSource<Cliente> = new MatTableDataSource();
  public form: FormGroup = new FormGroup({
    nome: new FormControl()
  });
  public selection = new SelectionModel<Cliente>(false, []);

  constructor(private router: Router, private clienteService: ClienteService, private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  public pesquisar() {
    let nome = this.form.controls['nome'].value;
    if (nome == '' || nome == null) {
      nome = ' ';
    }
    this.clienteService.pesquisar(nome).subscribe((lista) => {
      this.dataSource = new MatTableDataSource(lista);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public novo() {
    this.router.navigateByUrl('cliente/cadastro-cliente');
  }

  public alterar() {
    if (this.selection.isEmpty()) {
      return;
    }
    if (this.selection.selected.length > 1) {
      return;
    }
    let cli = this.selection.selected[0];
    this.router.navigate(['cliente/cadastro-cliente'], { queryParams: { id: cli.id } });
  }

  public excluir() {
    if (this.selection.isEmpty()) {
      return;
    }
    if (this.selection.selected.length > 1) {
      return;
    }
    if (this.selection.selected.length == 1) {
      let cli = this.selection.selected[0];
      this.clienteService.excluir(cli.id).subscribe(() => {
        this.pesquisar();
      });
    }
  }

  voltar() {
    this.location.back();
  }
}
