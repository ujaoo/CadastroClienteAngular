import { Component } from '@angular/core';
import { CardComponent } from "../../../components/card/card.component";
import { CardTextoComponent } from "../../../components/card-texto/card-texto.component";
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CardTextoComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
