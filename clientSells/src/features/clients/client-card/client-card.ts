import { Component, input } from '@angular/core';
import { Client } from '../../../types/Client';
import { RouterLink } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-client-card',
  imports: [RouterLink, AgePipe],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css',
})
export class ClientCard {
  client = input.required<Client>();
}
