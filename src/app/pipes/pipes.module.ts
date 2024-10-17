import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf/cpf.pipe';
import { TelefonePipe } from './telefone/telefone.pipe';

@NgModule({
  declarations: [CpfPipe, TelefonePipe],
  exports: [CpfPipe, TelefonePipe]
})
export class PipesModule { }
