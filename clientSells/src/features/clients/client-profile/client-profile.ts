import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../types/Client';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  imports: [DatePipe],
  templateUrl: './client-profile.html',
  styleUrl: './client-profile.css',
})
export class ClientProfile implements OnInit {
  private route = inject(ActivatedRoute);
  protected client = signal<Client | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.client.set(data['client']);
    });
  }
}
