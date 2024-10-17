import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from './abstractService';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends AbstractService {

  constructor(http:HttpClient) {
    super(http);
  }

  public getPath(){
    return 'cliente';
  }

  public inserir(cliente:Cliente):Observable<Cliente>{
    let url = this.getUrl();
    return this.http.post<Cliente>(url,cliente);
  }

  public alterar(cliente:Cliente):Observable<Cliente>{
    let url = this.getUrl();
    return this.http.put<Cliente>(url,cliente);
  }

  public pesquisar(nome: string): Observable<Array<Cliente>> {
    return this.http.post<Array<Cliente>>(this.getUrl('pesquisarDesc'), nome);
}

  public excluir(id:number):Observable<any>{
    return this.http.delete(this.getUrl(`${id}`));
  }

  public buscarPorId(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(this.getUrl(`${id}`));
  }
}
