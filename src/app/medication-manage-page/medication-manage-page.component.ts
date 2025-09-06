import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medication-manage-page',
  imports: [FormsModule,RouterLink],
  templateUrl: './medication-manage-page.component.html',
  styleUrl: './medication-manage-page.component.css'
})
export class MedicationManagePageComponent {
  query = '';

  onSearch() {
    console.log('Searching for:', this.query.trim());
    // TODO: wire to real search
  }
}
