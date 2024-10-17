import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './pages/cliente/cadastro-cliente/cadastro-cliente.component';
import { HomeComponent } from './pages/home/home/home.component';
import { PesquisarClienteComponent } from './pages/cliente/pesquisar-cliente/pesquisar-cliente.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/home',
    pathMatch: 'full'
  },
  {
    path: 'home/home',
    component: HomeComponent
  },
  {
    path:'cliente/cadastro-cliente',
    component: CadastroClienteComponent
  },
  {
    path:'cliente/pesquisar-cliente',
    component: PesquisarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
