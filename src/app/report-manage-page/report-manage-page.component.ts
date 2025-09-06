import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-manage-page',
  imports: [FormsModule,RouterLink],
  templateUrl: './report-manage-page.component.html',
  styleUrl: './report-manage-page.component.css'
})
export class ReportManagePageComponent {
  query = '';

  onSearch() {
    console.log('Searching for:', this.query.trim());
    // TODO: wire to real search
  }
}
